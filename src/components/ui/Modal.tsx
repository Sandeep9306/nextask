import { useEffect } from "react";
import type { ModalProps } from "../../types";
import { X } from "lucide-react";

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  if (!isOpen) return null;
  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50
        p-4
      "
      onClick={onClose} // click outside closes
    >
      <div
        className="
          bg-[var(--color-surface)]
          rounded-lg
          shadow-[var(--shadow-level-3)]
          w-full max-w-md
          max-h-[90vh] overflow-y-auto
        "
        onClick={(e) => e.stopPropagation()} // don't close when clicking inside
      >
        {/* Header */}
        <div
          className="
          flex items-center justify-between
          px-5 py-4
          border-b border-[var(--color-border)]
        "
        >
          <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="
              p-1 rounded
              text-[var(--color-text-secondary)]
              hover:bg-[var(--color-background)]
              hover:text-[var(--color-text-primary)]
              transition-colors
            "
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
