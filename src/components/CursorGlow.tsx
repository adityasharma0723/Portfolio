"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on devices with fine pointer (desktop)
    const mq = window.matchMedia("(pointer: fine)");
    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mq.matches || reducedMq.matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    glow.style.display = "block";

    const onMouseMove = (e: MouseEvent) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      id="cursor-glow"
      aria-hidden="true"
      style={{ display: "none" }}
    />
  );
}
