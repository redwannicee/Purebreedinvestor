"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  children: ReactNode;
}

export default function Button({ variant = "primary", href, className, children, ...props }: ButtonProps) {
  const classes = clsx(
    "inline-flex items-center justify-center gap-2 rounded-sm px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200",
    variant === "primary" && "bg-gold text-ink hover:bg-gold-light hover:-translate-y-0.5",
    variant === "secondary" && "bg-pine text-paper hover:bg-pine-light hover:-translate-y-0.5",
    variant === "ghost" && "border border-current hover:bg-black/5",
    className
  );

  if (href) {
    return (
      <a href={href} className={classes} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
