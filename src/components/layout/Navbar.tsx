"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import Button from "@/components/ui/Button";

const LINKS = [
  { href: "#solution", label: "Solution" },
  { href: "#traction", label: "Traction" },
  { href: "#products", label: "Products" },
  { href: "#calculator", label: "Calculator" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar({ pitchDeckUrl }: { pitchDeckUrl: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-2.5">
          <Image src="/logo.png" alt="Pureebreed" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="font-display text-lg font-semibold tracking-tight">Pureebreed</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-ink/70 transition-colors hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button href={pitchDeckUrl} className="!px-5 !py-2.5 text-xs">
            Download Pitch Deck
          </Button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-ink/10 bg-paper px-6 pb-6 pt-2 md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-medium text-ink/80"
            >
              {l.label}
            </a>
          ))}
          <Button href={pitchDeckUrl} className="mt-3 w-full">
            Download Pitch Deck
          </Button>
        </nav>
      )}
    </header>
  );
}
