"use client";

import { useEffect, useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

gsap.registerPlugin(SplitText);

export default function SplitTextEntrance({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const split = new SplitText(textRef.current, {
      type: "chars,words",
      smartWrap: true,
    });

    gsap.from(split.chars, {
      y: 100,
      autoAlpha: 0,
      stagger: {
        amount: 0.6,
        from: "random",
      },
      ease: "power4.out",
      duration: 1,
    });

    return () => {
      split.revert();
    };
  }, [text]);

  return (
    <div ref={textRef} className={`${className}`}>
      {text}
    </div>
  );
}
