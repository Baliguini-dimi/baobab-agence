"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";

export type TabItem = { id: string; label: string; content: ReactNode };

export function Tabs({ items, label = "Exemples de composants" }: { items: TabItem[]; label?: string }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function moveFocus(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!direction) return;
    event.preventDefault();
    const nextIndex = (index + direction + items.length) % items.length;
    setActive(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  const selected = items[active];
  if (!selected) return null;

  return (
    <div>
      <div className="tabs-list flex flex-wrap gap-2" role="tablist" aria-label={label} style={{ "--tab-count": items.length, "--tab-index": active } as CSSProperties}>
        {items.map((item, index) => (
          <button
            aria-controls={`panel-${item.id}`}
            aria-selected={active === index}
            className={`min-h-11 flex-1 rounded-t-lg px-4 text-sm font-bold ${active === index ? "text-navy" : "text-muted hover:text-navy"}`}
            id={`tab-${item.id}`}
            key={item.id}
            onClick={() => setActive(index)}
            onKeyDown={(event) => moveFocus(event, index)}
            ref={(element) => { tabRefs.current[index] = element; }}
            role="tab"
            tabIndex={active === index ? 0 : -1}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div aria-labelledby={`tab-${selected.id}`} className="tab-panel pt-5" id={`panel-${selected.id}`} key={selected.id} role="tabpanel" tabIndex={0}>
        {selected.content}
      </div>
    </div>
  );
}
