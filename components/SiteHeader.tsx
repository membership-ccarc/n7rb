"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems, SITE } from "@/lib/site-data";

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-stonewarm-100 bg-stonewarm-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md font-black leading-tight text-mountain-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700"
          aria-label={`${SITE.name} home`}
          onClick={() => setIsMenuOpen(false)}
        >
          <Image
            src="/CCARC_firetower_logo_v2.png"
            alt=""
            width={58}
            height={58}
            className="h-12 w-12 rounded-md object-contain"
            priority
          />
          <span>
            <span className="block text-lg">{SITE.shortName}</span>
            <span className="block text-xs font-bold uppercase tracking-wide text-pine-700">{SITE.callsign}</span>
          </span>
        </Link>
        <nav aria-label="Primary navigation">
          <div className="relative md:hidden">
            <button
              type="button"
              className="flex min-h-11 items-center rounded-md bg-white px-4 py-2 text-sm font-bold text-mountain-900 shadow-sm ring-1 ring-stonewarm-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700"
              aria-controls="mobile-primary-navigation"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
            >
              Menu
              <span className="ml-2" aria-hidden="true">
                {isMenuOpen ? "▴" : "▾"}
              </span>
            </button>
            {isMenuOpen ? (
              <div
                id="mobile-primary-navigation"
                className="absolute right-0 mt-2 w-72 rounded-lg border border-stonewarm-100 bg-white p-2 shadow-soft"
              >
                {navItems.map((item) => (
                  <div key={item.href}>
                    <Link
                      className="block rounded-md px-3 py-3 text-sm font-bold text-mountain-900 hover:bg-stonewarm-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine-700"
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {"children" in item ? (
                      <div className="ml-3 border-l border-stonewarm-100 pl-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            className="block rounded-md px-3 py-2 text-sm font-bold text-stonewarm-700 hover:bg-stonewarm-50 hover:text-pine-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine-700"
                            href={child.href}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  className="rounded-md px-3 py-2 text-sm font-bold text-mountain-900 hover:bg-white hover:text-pine-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700"
                  href={item.href}
                >
                  {item.label}
                </Link>
                {"children" in item ? (
                  <div className="invisible absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-stonewarm-100 bg-white p-2 opacity-0 shadow-soft transition group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        className="block rounded-md px-3 py-3 text-sm font-bold text-mountain-900 hover:bg-stonewarm-50 hover:text-pine-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pine-700"
                        href={child.href}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
