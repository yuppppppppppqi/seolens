"use client";

import { useState, useRef, useEffect } from "react";

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export default function Tooltip({ text, children }: TooltipProps) {
  const [show, setShow] = useState(false);
  const [position, setPosition] = useState<"top" | "bottom">("bottom");
  const triggerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (show && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      // If too close to top, show below
      setPosition(rect.top < 100 ? "bottom" : "top");
    }
  }, [show]);

  return (
    <span
      ref={triggerRef}
      className="relative inline-flex items-center gap-1 cursor-help"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <svg
        className="w-3.5 h-3.5 text-sl-text-muted shrink-0"
        viewBox="0 0 16 16"
        fill="currentColor"
      >
        <path d="M8 1a7 7 0 100 14A7 7 0 008 1zm0 12.5a5.5 5.5 0 110-11 5.5 5.5 0 010 11zM8 4.5a1 1 0 00-1 1h1.5a.5.5 0 01-.5-.5v-.5zm-.75 3v4h1.5v-4h-1.5z" />
      </svg>
      {show && (
        <span
          className={`absolute left-0 z-50 w-56 px-3 py-2 text-xs font-normal normal-case tracking-normal text-sl-text-secondary bg-sl-bg-elevated border border-sl-border rounded-lg shadow-lg ${
            position === "top" ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {text}
        </span>
      )}
    </span>
  );
}
