"use client";

import { useEffect, useRef, useState } from "react";

export function AnimatedCounter({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const reducedMotionFrame = window.requestAnimationFrame(() => setDisplayValue(value));
      return () => window.cancelAnimationFrame(reducedMotionFrame);
    }

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        const duration = 1800;
        let startTime: number | null = null;
        const step = (time: number) => {
          startTime ??= time;
          const progress = Math.min((time - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayValue(Math.floor(eased * value));
          if (progress < 1) animationFrame = window.requestAnimationFrame(step);
        };

        animationFrame = window.requestAnimationFrame(step);
        observer.disconnect();
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return <span ref={elementRef}>{displayValue.toLocaleString()}</span>;
}
