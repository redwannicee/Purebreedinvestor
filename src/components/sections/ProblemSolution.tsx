"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Sprout } from "lucide-react";
import { SiteContent } from "@/types";

export default function ProblemSolution({ content }: { content: SiteContent }) {
  return (
    <section id="solution" className="border-b border-ink/10 bg-paper">
      <div className="mx-auto grid max-w-6xl gap-0 sm:grid-cols-2">
        <Panel
          icon={<AlertTriangle className="h-5 w-5" />}
          eyebrow="The Problem"
          title={content.problemTitle}
          body={content.problemBody}
          className="border-b border-ink/10 sm:border-b-0 sm:border-r"
        />
        <Panel
          icon={<Sprout className="h-5 w-5" />}
          eyebrow="Our Fix"
          title={content.solutionTitle}
          body={content.solutionBody}
          accent
        />
      </div>
    </section>
  );
}

function Panel({
  icon,
  eyebrow,
  title,
  body,
  accent,
  className = "",
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className={`border-ink/10 px-8 py-16 sm:px-12 ${className}`}
    >
      <div className={`mb-5 inline-flex h-10 w-10 items-center justify-center ${accent ? "bg-sprout/10 text-sprout" : "bg-ink/5 text-ink/60"}`}>
        {icon}
      </div>
      <p className={`eyebrow mb-3 ${accent ? "text-sprout" : "text-ink/40"}`}>{eyebrow}</p>
      <h3 className="font-display text-2xl font-medium leading-snug text-ink">{title}</h3>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink/65">{body}</p>
    </motion.div>
  );
}
