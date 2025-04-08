"use client";

import { useRef } from "react";
import { gsap } from "gsap";

export default function AnimatedText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const textRef = useRef<HTMLDivElement | null>(null);

  const handleCharHover = (charEl: HTMLElement) => {
    gsap.fromTo(
      charEl,
      { y: 0, color: "#fff" },
      {
        y: -15,
        color: "#fff000",
        duration: 0.3,
        ease: "power2.out",
        yoyo: true,
        repeat: 3,
      }
    );
  };

  return (
    <div ref={textRef} className={`${className} inline-block`}>
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="inline-block whitespace-pre cursor-default"
          onMouseEnter={(e) => handleCharHover(e.currentTarget)}
        >
          {char}
        </span>
      ))}
    </div>
  );
}
