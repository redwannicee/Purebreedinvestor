"use client";

import { motion } from "framer-motion";
import { Leaf, ArrowRight, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import { SiteContent } from "@/types";

export default function Hero({ content }: { content: SiteContent }) {
  return (
    <section id="top" className="relative overflow-hidden border-b border-ink/10">
      {/* Ambient watermark leaf, purely decorative */}
      <Leaf
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] text-pine/[0.05]"
        strokeWidth={0.6}
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="eyebrow mb-5 flex items-center gap-2 text-sprout">
            <Leaf className="h-3.5 w-3.5" strokeWidth={2.5} />
            {content.heroEyebrow}
          </p>
          <h1 className="font-display text-4xl font-medium leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            {content.heroHeadline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/70">{content.heroSubheadline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Button href={content.pitchDeckUrl}>
              {content.heroCtaLabel}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="#calculator" variant="ghost">
              Explore the Calculator
            </Button>
          </div>

          <div className="mt-10 flex items-center gap-2 text-xs text-ink/50">
            <ShieldCheck className="h-4 w-4 text-pine" />
            DNA-verified pedigree on every funded line
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="relative mx-auto w-full max-w-sm p-[3px]"
          style={{ background: "rgba(201,162,39,0.5)" }}
        >
          <div className="border border-pine/25 bg-white p-7 shadow-certificate">
            <div className="eyebrow mb-5 flex items-center justify-between text-pine">
              <span className="flex items-center gap-2">
                <Leaf className="h-3.5 w-3.5" strokeWidth={2.5} />
                Pedigree Record
              </span>
              <span className="text-ink/30">No. HC-04</span>
            </div>

            <dl className="space-y-4 text-sm">
              <Row label="Line" value="Highland Cattle — 3rd Gen" />
              <Row label="Verification" value="DNA Panel #2291" />
              <Row label="Yield Index" value="94.2 / 100" />
              <Row label="Status" value="Actively Funding" accent />
            </dl>

            <div className="mt-6 border-t border-pine/10 pt-5">
              <p className="eyebrow mb-2 text-ink/40">Cumulative Portfolio Value ($M)</p>
              <Sparkline data={content.trajectoryData.map((d) => d.value)} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-ink/10 pb-3">
      <dt className="text-ink/50">{label}</dt>
      <dd className={`font-mono text-xs font-medium ${accent ? "text-sprout" : "text-ink"}`}>{value}</dd>
    </div>
  );
}

function Sparkline({ data }: { data: number[] }) {
  const width = 260;
  const height = 56;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((v - min) / (max - min || 1)) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-14 w-full" preserveAspectRatio="none">
      <polyline points={points} fill="none" stroke="#2FA66B" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      <circle
        cx={width}
        cy={height - ((data[data.length - 1] - min) / (max - min || 1)) * height}
        r={4}
        fill="#C9A227"
      />
    </svg>
  );
}
