"use client";

import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  const [coords, setCoords] = useState<{ top: number; left: number; direction: "top" | "bottom" } | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  const handleEnter = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const direction = rect.top < 120 ? "bottom" : "top";
    setCoords({
      left: rect.left,
      top: direction === "top" ? rect.top - 8 : rect.bottom + 8,
      direction,
    });
  }, []);

  const handleLeave = useCallback(() => {
    setCoords(null);
  }, []);

  return (
    <span
      ref={triggerRef}
      className="inline-flex items-center gap-1 cursor-help"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
      <svg
        className="w-3.5 h-3.5 text-sl-text-muted shrink-0"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 12.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11zM8 4.5a1 1 0 00-1 1h1.5a.5.5 0 01-.5-.5v-.5zm-.75 3v4h1.5v-4h-1.5z" />
      </svg>
      {coords &&
        createPortal(
          <span
            className="fixed z-9999 w-56 px-3 py-2 text-xs font-normal normal-case tracking-normal text-sl-text-secondary bg-sl-bg-elevated border border-sl-border rounded-lg shadow-lg pointer-events-none"
            style={{
              left: coords.left,
              top: coords.direction === "top" ? undefined : coords.top,
              bottom: coords.direction === "top" ? `calc(100vh - ${coords.top}px)` : undefined,
            }}
          >
            {text}
          </span>,
          document.body
        )}
    </span>
  );
}
