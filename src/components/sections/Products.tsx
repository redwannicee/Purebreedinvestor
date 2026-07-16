"use client";

import { motion } from "framer-motion";
import { AlertTriangle, ArrowRight } from "lucide-react";
import CertificateCard from "@/components/ui/CertificateCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { Product } from "@/types";

const RISK_STYLE: Record<Product["riskProfile"], string> = {
  Low: "text-sprout",
  Moderate: "text-gold",
  High: "text-ink",
};

export default function Products({
  products,
  onSelect,
}: {
  products: Product[];
  onSelect: (id: string) => void;
}) {
  return (
    <section id="products" className="border-b border-ink/10 bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Product-Wise Investment Options"
          title="Fund a specific line. Track it to harvest or sale."
          subtitle="Each product below is its own certified line with its own risk profile and timeline — not a pooled, generic fund."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <CertificateCard eyebrow={p.category} className="h-full">
                <div className="flex h-full flex-col">
                  <h3 className="font-display text-xl font-medium leading-snug text-ink">{p.name}</h3>
                  <p className="mt-1.5 text-sm text-ink/55">{p.tagline}</p>
                  <p className="mt-4 text-sm leading-relaxed text-ink/65">{p.description}</p>

                  <div className="mt-6 grid grid-cols-3 gap-3 border-t border-dashed border-ink/10 pt-5 font-mono text-[11px]">
                    <Meta label="Min. Invest" value={`$${p.minInvestment.toLocaleString()}`} />
                    <Meta
                      label="Risk"
                      value={p.riskProfile}
                      valueClassName={RISK_STYLE[p.riskProfile]}
                      icon={p.riskProfile === "High" ? <AlertTriangle className="h-3 w-3" /> : undefined}
                    />
                    <Meta label="Timeline" value={`${p.timelineMonths} mo`} />
                  </div>

                  <button
                    onClick={() => onSelect(p.id)}
                    className="mt-6 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-pine transition-colors hover:text-sprout"
                  >
                    Model this investment
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </CertificateCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Meta({
  label,
  value,
  valueClassName = "text-ink",
  icon,
}: {
  label: string;
  value: string;
  valueClassName?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-ink/35">{label}</p>
      <p className={`mt-1 flex items-center gap-1 font-semibold ${valueClassName}`}>
        {icon}
        {value}
      </p>
    </div>
  );
}
