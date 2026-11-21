"use client";

import { useEffect, useRef, type ReactNode } from "react";

export function Modal({
  open,
  onClose,
  title,
  closeLabel = "Close dialog",
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  closeLabel?: string;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      aria-labelledby="modal-title"
      className="m-auto w-[min(92vw,36rem)] rounded-2xl border border-navy/10 bg-paper p-0 text-ink shadow-modal backdrop:bg-navy/50"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      ref={dialogRef}
    >
      <div className="p-6 sm:p-8">
        <div className="mb-5 flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-navy" id="modal-title">{title}</h2>
          <button aria-label={closeLabel} className="rounded-lg px-3 py-2 text-sm font-bold text-navy hover:bg-stone" onClick={onClose} type="button">{closeLabel}</button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
