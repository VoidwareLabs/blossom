"use client";

import Image from "next/image";
import { ScrambleText } from "@/components/scramble-text";

/** Figma film cards L→R (Subtract nodes in 12:104) */
const CARDS = [
  "/coming-soon/film-6.png",
  "/coming-soon/film-2.png",
  "/coming-soon/film-1.png",
  "/coming-soon/film-0.png",
  "/coming-soon/film-3.png",
  "/coming-soon/film-4.png",
  "/coming-soon/film-5.png",
] as const;

function Card({ src, delay }: { src: string; delay: string }) {
  return (
    <div className="cs-card" style={{ animationDelay: delay }}>
      <Image
        src={src}
        alt=""
        width={669}
        height={318}
        sizes="(max-width: 640px) 72vw, 16.33vw"
        priority
        className="cs-card-img"
      />
      {/* White Subtract mark — matches Figma film cards */}
      <div className="cs-card-mark" aria-hidden>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/coming-soon/logo-mark.svg"
          alt=""
          width={116}
          height={116}
        />
      </div>
    </div>
  );
}

export function ComingSoon() {
  const strip = [...CARDS, ...CARDS];

  return (
    <div className="cs">
      <div className="cs-main">
        <h1 className="cs-wordmark" aria-label="Blossom">
          <Image
            src="/coming-soon/blossom-wordmark.png"
            alt=""
            width={2019}
            height={1895}
            priority
            className="cs-wordmark-img"
            aria-hidden
          />
        </h1>

        <div className="cs-reel" aria-hidden>
          <div className="cs-track">
            {strip.map((src, i) => (
              <Card
                key={`${src}-${i}`}
                src={src}
                delay={`${0.08 + (i % CARDS.length) * 0.04}s`}
              />
            ))}
          </div>
        </div>
      </div>

      <p className="cs-soon">
        <ScrambleText text="Launching Soon" />
      </p>
    </div>
  );
}
