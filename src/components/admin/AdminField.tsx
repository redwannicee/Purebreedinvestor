import { ReactNode } from "react";

export default function AdminField({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink/40">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full border border-ink/15 bg-white px-3 py-2.5 text-sm text-ink outline-none focus:border-pine";
