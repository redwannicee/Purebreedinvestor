"use client";

import { Leaf } from "lucide-react";
import clsx from "clsx";
import { ReactNode } from "react";

interface CertificateCardProps {
  eyebrow?: string;
  children: ReactNode;
  className?: string;
  dark?: boolean;
}

/**
 * The "pedigree certificate" motif: a double-border frame with a small
 * leaf seal in the corner and a mono small-caps eyebrow label. Used
 * consistently for Product, Team, and highlighted Stat cards to tie the
 * whole investor site back to the brand's core idea — certified lineage.
 */
export default function CertificateCard({ eyebrow, children, className, dark }: CertificateCardProps) {
  return (
    <div className={clsx("relative p-[3px]", dark ? "bg-gold/30" : "bg-gold/50", className)}>
      <div
        className={clsx(
          "relative h-full border p-6 sm:p-8",
          dark ? "border-gold/30 bg-pine-dark text-paper" : "border-pine/25 bg-white text-ink",
          "shadow-certificate"
        )}
      >
        {eyebrow && (
          <div className={clsx("eyebrow mb-4 flex items-center gap-2", dark ? "text-gold-light" : "text-pine")}>
            <Leaf className="h-3.5 w-3.5" strokeWidth={2.5} />
            {eyebrow}
          </div>
        )}
        {children}
        <Leaf
          className={clsx("absolute -right-2 -top-2 h-5 w-5 rotate-45", dark ? "text-gold" : "text-pine")}
          strokeWidth={2}
        />
      </div>
    </div>
  );
}
