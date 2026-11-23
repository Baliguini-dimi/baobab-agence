"use client";

import { useEffect } from "react";

export function HeaderScrollController() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>("[data-baobab-header]");
    const topbar = document.querySelector<HTMLElement>("[data-header-topbar]");
    if (!header || !topbar) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const scrollY = window.scrollY;
      header.dataset.compact = String(scrollY > 48);
      topbar.dataset.scrolled = String(scrollY > 34);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
