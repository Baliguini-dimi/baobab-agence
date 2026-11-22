"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

export function MotionObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const root = document.documentElement;
    root.dataset.motionReady = "true";
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-motion-reveal='pending']"));
    const revealAll = () => targets.forEach((target) => { target.dataset.motionReveal = "visible"; });
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      root.dataset.motionStatic = "true";
      revealAll();
      return () => {
        delete root.dataset.motionReady;
        delete root.dataset.motionStatic;
      };
    }

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const target = entry.target as HTMLElement;
        target.dataset.motionReveal = "visible";
        observer.unobserve(target);
      }
    }, { threshold: 0.12 });
    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      delete root.dataset.motionReady;
      delete root.dataset.motionStatic;
    };
  }, [pathname]);

  return null;
}
