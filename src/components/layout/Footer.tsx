import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-pine-dark text-paper/70">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Pureebreed" width={28} height={28} className="h-7 w-7 object-contain" />
            <span className="font-display text-base font-semibold text-paper">Pureebreed</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed">
            Certified breeding genetics for livestock and specialty crops, structured as a
            transparent, fundable asset class.
          </p>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-paper/10 pt-6 text-xs sm:flex-row sm:items-center">
          <span>&copy; {new Date().getFullYear()} Pureebreed. All rights reserved.</span>
          <a href="/admin/login" className="text-paper/40 transition-colors hover:text-gold-light">
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
