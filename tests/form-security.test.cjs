/* eslint-disable @typescript-eslint/no-require-imports -- CommonJS harness loads isolated compiled server modules. */
const { test, beforeEach, afterEach, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');

// Transpile just these server modules; production build performs full type checks.
// Keep temporary modules under node_modules so Next resolves normally.
const root = path.resolve(__dirname, '..');
const output = fs.mkdtempSync(path.join(root, 'node_modules/.form-security-tests-'));
for (const file of ['lib/form-security.ts', 'app/api/contact/route.ts', 'app/api/class-signup/route.ts']) {
  const dest = path.join(output, file.replace(/\.ts$/, '.js'));
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
  }).outputText);
}
const helperFile = path.join(output, 'lib/form-security.js');
const security = require(helperFile);
const contact = require(path.join(output, 'app/api/contact/route.js'));
const signup = require(path.join(output, 'app/api/class-signup/route.js'));
const originalFetch = global.fetch;
const originalEnv = { ...process.env };
const originalError = console.error;
const originalWarn = console.warn;
let logs;
let counter = 0;
let calls;
const contactBody = () => ({ name: 'Test Member', email: 'member@example.org', message: 'Please tell me about your next meeting.', renderedAt: String(Date.now() - 10000), website: '' });
const signupBody = () => ({ firstName: 'Test', lastName: 'Member', email: 'member@example.org', licenseInterest: 'Technician', experienceLevel: 'Completely new', preferredContactMethod: 'Email', mainInterests: ['SOTA/POTA'], renderedAt: String(Date.now() - 10000), website: '' });
function request(body, headers = {}) {
  return new Request('https://www.n7rb.org/api/contact', {
    method: 'POST', headers: { 'content-type': 'application/json', 'x-vercel-forwarded-for': `2001:db8::${(++counter).toString(16)}`, ...headers },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });
}
beforeEach(() => {
  process.env.VERCEL = '1';
  process.env.VERCEL_ENV = 'preview';
  delete process.env.UPSTASH_REDIS_REST_URL;
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  for (const prefix of ['MAKE_CONTACT', 'MAKE_CLASS_SIGNUP']) {
    process.env[`${prefix}_WEBHOOK_URL`] = 'https://hook.us1.make.com/test-secret-path';
    process.env[`${prefix}_API_KEY`] = 'test-secret-key';
  }
  calls = [];
  logs = [];
  console.error = (...args) => logs.push(args);
  console.warn = (...args) => logs.push(args);
  global.fetch = async (url, options) => { calls.push({ url: String(url), options }); return new Response('Accepted'); };
});
afterEach(() => {
  global.fetch = originalFetch;
  console.error = originalError;
  console.warn = originalWarn;
  for (const key of Object.keys(process.env)) if (!(key in originalEnv)) delete process.env[key];
  Object.assign(process.env, originalEnv);
});
after(() => fs.rmSync(output, { recursive: true, force: true }));

test('both legitimate forms retain payload shape and require authenticated HTTPS webhooks', async () => {
  for (const [handler, body] of [[contact, contactBody()], [signup, signupBody()]]) {
    assert.equal((await handler.POST(request(body))).status, 200);
  }
  assert.equal(calls.length, 2);
  for (const { options } of calls) {
    assert.equal(options.headers['x-make-apikey'], 'test-secret-key');
    assert.equal(options.redirect, 'error');
    assert.ok(options.signal instanceof AbortSignal);
    assert.equal(JSON.parse(options.body).email, 'member@example.org');
    assert.equal(JSON.parse(options.body).website, undefined);
  }
});

test('reject malformed JSON, arrays, non-string fields and invalid emails without forwarding', async () => {
  for (const [handler, body] of [
    [contact, '{'], [contact, []], [signup, []],
    [contact, { ...contactBody(), name: ['Test Member'] }],
    [signup, { ...signupBody(), notes: {} }],
    [signup, { ...signupBody(), mainInterests: [null] }],
    [signup, { ...signupBody(), email: 'a@' }],
    [contact, { ...contactBody(), email: 'a\nb@example.org' }],
  ]) assert.equal((await handler.POST(request(body))).status, 400);
  assert.equal(calls.length, 0);
});

test('enforce all new field boundaries', async () => {
  for (const [handler, body, fields] of [
    [contact, contactBody(), { name: 60, email: 254, phone: 30, callsign: 20, message: 2000 }],
    [signup, signupBody(), { firstName: 60, lastName: 60, email: 254, phone: 30, notes: 2000 }],
  ]) {
    for (const [field, max] of Object.entries(fields)) {
      assert.equal((await handler.POST(request({ ...body, [field]: 'a'.repeat(max + 1) }))).status, 400, field);
    }
  }
  assert.equal(calls.length, 0);
});

test('deduplicate valid interests but reject oversized interest arrays', async () => {
  assert.equal((await signup.POST(request({ ...signupBody(), mainInterests: ['SOTA/POTA', 'SOTA/POTA'] }))).status, 200);
  assert.deepEqual(JSON.parse(calls[0].options.body).mainInterests, ['SOTA/POTA']);
  assert.equal((await signup.POST(request({ ...signupBody(), mainInterests: Array(8).fill('SOTA/POTA') }))).status, 400);
  assert.equal(calls.length, 1);
});

test('honeypot and too-fast submissions remain silently rejected', async () => {
  for (const handler of [contact, signup]) {
    const body = handler === contact ? contactBody() : signupBody();
    assert.deepEqual(await (await handler.POST(request({ ...body, website: 'bot' }))).json(), { ok: true });
    assert.deepEqual(await (await handler.POST(request({ ...body, renderedAt: String(Date.now()) }))).json(), { ok: true });
  }
  assert.equal(calls.length, 0);
});

test('require JSON and reject compressed requests', async () => {
  assert.equal((await contact.POST(request(contactBody(), { 'content-type': 'text/plain' }))).status, 415);
  assert.equal((await signup.POST(request(signupBody(), { 'content-encoding': 'gzip' }))).status, 415);
  assert.equal(calls.length, 0);
});

test('body byte limit works with missing or dishonest Content-Length and multibyte chunks', async () => {
  for (const headers of [{}, { 'content-length': '1' }, { 'content-length': '16385' }]) {
    assert.equal((await contact.POST(request('x'.repeat(16385), headers))).status, 413);
  }
  const chunk = new TextEncoder().encode('é'.repeat(5000));
  const stream = new ReadableStream({ start(c) { c.enqueue(chunk); c.enqueue(chunk); c.close(); } });
  const req = new Request('https://example.org', { method: 'POST', headers: { 'content-type': 'application/json' }, body: stream, duplex: 'half' });
  await assert.rejects(security.readFormJson(req), (e) => e.status === 413);
  assert.equal(calls.length, 0);
});

test('Vercel identity ignores spoofable Cloudflare headers and rejects missing trusted IP', async () => {
  const headers = { 'x-vercel-forwarded-for': '198.51.100.1', 'cf-connecting-ip': '203.0.113.1' };
  assert.equal(security.getClientIp(request({}, headers)), '198.51.100.1');
  for (let i = 0; i < 3; i++) assert.equal((await contact.POST(request(contactBody(), { ...headers, 'cf-connecting-ip': `203.0.113.${i}` }))).status, 200);
  const denied = await contact.POST(request(contactBody(), headers));
  assert.equal(denied.status, 429);
  assert.equal(denied.headers.get('retry-after'), '3600');
  assert.equal((await contact.POST(request(contactBody(), { 'x-vercel-forwarded-for': '' }))).status, 503);
});

test('rate limit runs before reading the request body', async () => {
  const headers = { 'x-vercel-forwarded-for': '198.51.100.2' };
  for (let i = 0; i < 3; i++) await contact.POST(request(contactBody(), headers));
  const req = request(contactBody(), headers);
  Object.defineProperty(req, 'body', { get() { throw new Error('Body must not be read'); } });
  assert.equal((await contact.POST(req)).status, 429);
});

test('local fallback expires and bounds memory without evicting active rate limits', async () => {
  const oldNow = Date.now;
  try {
    Date.now = () => 10000000000000;
    for (let i = 0; i < 5100; i++) {
      const req = request({}, { 'x-vercel-forwarded-for': `10.0.${Math.floor(i / 256)}.${i % 256}` });
      try { await security.enforceRateLimit(req, 'contact'); } catch (e) { assert.equal(e.status, 429); }
    }
    await assert.rejects(security.enforceRateLimit(request({}), 'contact'), (e) => e.status === 429);
    Date.now = () => 10000003600001;
    await security.enforceRateLimit(request({}), 'contact');
  } finally { Date.now = oldNow; }
});

function configureRedis() {
  process.env.UPSTASH_REDIS_REST_URL = 'https://test.upstash.io';
  process.env.UPSTASH_REDIS_REST_TOKEN = 'redis-secret';
}
test('shared atomic rate limit spans independent module instances and isolates routes/environments', async () => {
  configureRedis();
  const counts = new Map();
  global.fetch = async (url, options) => {
    const command = JSON.parse(options.body);
    assert.equal(command[0], 'EVAL');
    assert.match(command[1], /EXPIRE/);
    assert.equal(command[4], '3600');
    assert.ok(!command[3].includes('198.51.100.3'));
    const count = (counts.get(command[3]) ?? 0) + 1;
    counts.set(command[3], count);
    return Response.json({ result: count });
  };
  delete require.cache[helperFile];
  const secondInstance = require(helperFile);
  const req = request({}, { 'x-vercel-forwarded-for': '198.51.100.3' });
  await security.enforceRateLimit(req, 'contact');
  await secondInstance.enforceRateLimit(req, 'contact');
  await security.enforceRateLimit(req, 'contact');
  await assert.rejects(secondInstance.enforceRateLimit(req, 'contact'), (e) => e.status === 429);
  await secondInstance.enforceRateLimit(req, 'class-signup');
  process.env.VERCEL_ENV = 'production';
  await secondInstance.enforceRateLimit(req, 'contact');
});

test('configured shared limiter fails closed on network errors, malformed replies and partial configuration', async () => {
  configureRedis();
  for (const stub of [async () => { throw new Error('redis-secret'); }, async () => Response.json({ result: 'bad' }), async () => new Response('', { status: 500 })]) {
    global.fetch = stub;
    assert.equal((await contact.POST(request(contactBody()))).status, 503);
  }
  delete process.env.UPSTASH_REDIS_REST_TOKEN;
  assert.equal((await signup.POST(request(signupBody()))).status, 503);
  assert.ok(!JSON.stringify(logs).includes('redis-secret'));
});

test('reject missing API keys, HTTP and non-Make destinations before network calls', async () => {
  for (const form of ['contact', 'class-signup']) {
    const prefix = form === 'contact' ? 'MAKE_CONTACT' : 'MAKE_CLASS_SIGNUP';
    for (const url of ['http://hook.us1.make.com/secret', 'https://evil.example/secret', 'https://hook.us1.make.com.evil.example/secret', 'https://user:pass@hook.us1.make.com/secret']) {
      process.env[`${prefix}_WEBHOOK_URL`] = url;
      await assert.rejects(security.submitWebhook(form, {}), (e) => e.status === 503);
    }
    process.env[`${prefix}_WEBHOOK_URL`] = 'https://hook.us1.make.com/secret';
    delete process.env[`${prefix}_API_KEY`];
    await assert.rejects(security.submitWebhook(form, {}), (e) => e.status === 503);
  }
  assert.equal(calls.length, 0);
});

test('webhook failures and redirects never log secret URLs, keys or personal data', async () => {
  for (const stub of [async () => { throw new Error('https://hook.us1.make.com/test-secret-path test-secret-key member@example.org'); }, async () => new Response('', { status: 302 }), async () => new Response('', { status: 500 })]) {
    global.fetch = stub;
    await assert.rejects(security.submitWebhook('contact', contactBody()), (e) => e.status === 502);
  }
  assert.doesNotMatch(JSON.stringify(logs), /test-secret|member@example/);
});

test('webhook and limiter abort signals impose explicit timeouts', async () => {
  const originalTimeout = AbortSignal.timeout;
  const durations = [];
  AbortSignal.timeout = (ms) => { durations.push(ms); return AbortSignal.abort(); };
  global.fetch = async (_, options) => { options.signal.throwIfAborted(); };
  try {
    await assert.rejects(security.submitWebhook('contact', {}), (e) => e.status === 502);
    configureRedis();
    await assert.rejects(security.enforceRateLimit(request({}), 'contact'), (e) => e.status === 503);
    assert.deepEqual(durations, [8000, 3000]);
  } finally { AbortSignal.timeout = originalTimeout; }
});


test('accept exactly the byte limit and time out a stalled request stream', async () => {
  const valid = JSON.stringify({ ok: true });
  const body = valid + ' '.repeat(security.MAX_BODY_BYTES - Buffer.byteLength(valid));
  assert.deepEqual(await security.readFormJson(request(body)), { ok: true });
  let cancelled = false;
  const stream = new ReadableStream({ cancel() { cancelled = true; } });
  const req = new Request('https://example.org', { method: 'POST', headers: { 'content-type': 'application/json' }, body: stream, duplex: 'half' });
  await assert.rejects(security.readFormJson(req), (e) => e.status === 408);
  assert.equal(cancelled, true);
});
