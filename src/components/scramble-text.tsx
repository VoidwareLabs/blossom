"use client";

import { useEffect, useRef, useState } from "react";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

/**
 * After Effects-style decode:
 * enter L→R with scramble, hold, exit R→L with scramble, pause, loop.
 */
export function ScrambleText({
  text = "Launching Soon",
  className,
  /** Delay before first decode (matches card intro) */
  startDelay = 0.45,
}: {
  text?: string;
  className?: string;
  startDelay?: number;
}) {
  // First paint shows the real label so it never looks "missing"
  const [display, setDisplay] = useState(text);
  const reducedRef = useRef(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reducedRef.current = reduced;
    if (reduced) {
      setDisplay(text);
      return;
    }

    const lines = text.split(/\r|\n/);
    const lineDelay = 0.12;
    const scrambleDuration = 0.45;
    const charDelay = 0.025;
    const fps = 24;
    const hold = 4.5; // keep "Launching Soon" readable longer
    const exitLineDelay = 0.1;
    const pauseBetween = 0.35;
    const total = lines.length;
    const maxLineLen = Math.max(...lines.map((l) => l.length), 1);

    const enterEnd =
      (total - 1) * lineDelay + scrambleDuration + maxLineLen * charDelay;
    const exitStart = enterEnd + hold;
    const exitEnd =
      exitStart +
      (total - 1) * exitLineDelay +
      scrambleDuration +
      maxLineLen * charDelay;
    const cycle = exitEnd + pauseBetween;

    const seeded = (seed: number) => {
      const x = Math.sin(seed * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };

    const glyph = (i: number, j: number, frame: number, salt: number) => {
      const r = seeded(salt + i * 1000 + j * 37 + frame);
      return ALPHABET.charAt(Math.floor(r * ALPHABET.length));
    };

    let raf = 0;
    const origin = performance.now();

    const tick = (now: number) => {
      const elapsed = (now - origin) / 1000;
      if (elapsed < startDelay) {
        setDisplay(text.replace(/[^\s]/g, "\u00A0"));
        raf = requestAnimationFrame(tick);
        return;
      }

      const t = (elapsed - startDelay) % cycle;
      let result = "";

      for (let i = 0; i < total; i++) {
        const line = lines[i];
        let output = "";
        const enterTime = t - i * lineDelay;
        const exitTime = t - (exitStart + (total - 1 - i) * exitLineDelay);

        for (let j = 0; j < line.length; j++) {
          const c = line.charAt(j);
          if (c === " ") {
            output += " ";
            continue;
          }

          const ct = enterTime - j * charDelay;
          let ch = "\u00A0";

          // ENTRANCE
          if (enterTime < 0) {
            ch = "\u00A0";
          } else if (ct < 0) {
            ch = "\u00A0";
          } else if (ct < scrambleDuration) {
            ch = glyph(i, j, Math.floor(ct * fps), 1);
          } else {
            ch = c;
          }

          // EXIT (overrides)
          if (exitTime >= 0) {
            const exitCharT = exitTime - j * charDelay;
            if (exitCharT < 0) {
              // not yet exiting this char
            } else if (exitCharT < scrambleDuration) {
              ch = glyph(i, j, Math.floor(exitCharT * fps), 90000);
            } else {
              ch = "\u00A0";
            }
          }

          output += ch;
        }

        result += output;
        if (i < total - 1) result += "\n";
      }

      setDisplay(result);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, startDelay]);

  return (
    <span className={className} aria-label={text}>
      {display}
    </span>
  );
}
