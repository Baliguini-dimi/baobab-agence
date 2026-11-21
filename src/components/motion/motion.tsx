"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export function ScrollMotionRoot() {
  useEffect(() => {
    document.documentElement.dataset.motionReady = "true";
    return () => { delete document.documentElement.dataset.motionReady; };
  }, []);
  return null;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const style = { "--reveal-delay": `${delay}ms` } as CSSProperties;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      element.dataset.reveal = "visible";
      return;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        element.dataset.reveal = "visible";
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <div className={className} data-reveal="pending" ref={ref} style={style}>{children}</div>;
}

export function CountUp({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const finish = () => setCount(value);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) {
      finish();
      return;
    }
    let frame = 0;
    const start = () => {
      const startedAt = performance.now();
      const duration = 700;
      const tick = (now: number) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        setCount(Math.round(value * progress));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        start();
        observer.disconnect();
      }
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [value]);

  return <span aria-label={label} ref={ref}><span aria-hidden="true">{count.toLocaleString("fr-CI")}{suffix}</span></span>;
}

export function Parallax({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const offset = Math.max(-12, Math.min(12, (window.innerHeight / 2 - rect.top) * 0.025));
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", update);
      cancelAnimationFrame(frame);
    };
  }, []);

  return <div className={className} ref={ref}>{children}</div>;
}

export function Ticker({ items, label }: { items: string[]; label: string }) {
  const track = [...items, ...items];
  return (
    <div aria-label={label} className="ticker-band" role="group">
      <div aria-hidden="true" className="ticker-track">
        {track.map((item, index) => <span className="ticker-item" key={`${item}-${index}`}>{item}<span className="ticker-dot">✳</span></span>)}
      </div>
      <span className="sr-only">{items.join(" · ")}</span>
    </div>
  );
}
