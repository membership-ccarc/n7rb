"use client";

import { useState } from "react";

type YouTubeEmbedProps = {
  youtubeId: string;
  title: string;
};

// Shows a lightweight thumbnail and only loads YouTube's player (~800 KB) after a click.
export function YouTubeEmbed({ youtubeId, title }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <iframe
        className="h-full w-full"
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    );
  }

  return (
    <button
      type="button"
      className="group relative block h-full w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pine-700"
      onClick={() => setIsPlaying(true)}
      aria-label={`Play video: ${title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- remote YouTube thumbnail, already sized by YouTube */}
      <img
        src={`https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`}
        alt=""
        width={480}
        height={360}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-black/20 transition group-hover:bg-black/10">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-soft transition group-hover:scale-105">
          <svg aria-hidden="true" viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-mountain-900">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </span>
    </button>
  );
}
