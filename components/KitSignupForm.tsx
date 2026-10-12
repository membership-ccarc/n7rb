"use client";

import { useEffect, useRef } from "react";

const KIT_FORM_UID = "5fc5497c3a";
const KIT_FORM_SRC = `https://capital-city-amateur-radio-club.kit.com/${KIT_FORM_UID}/index.js`;

// Kit's inline embed renders its form next to the script tag that loads it,
// so the script is injected into this container rather than via next/script.
export default function KitSignupForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const script = document.createElement("script");
    script.async = true;
    script.dataset.uid = KIT_FORM_UID;
    script.src = KIT_FORM_SRC;
    container.appendChild(script);

    return () => {
      container.replaceChildren();
    };
  }, []);

  return <div ref={containerRef} />;
}
