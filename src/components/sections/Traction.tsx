"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import SectionHeading from "@/components/ui/SectionHeading";
import StatNumber from "@/components/ui/StatNumber";
import { Stat, SiteContent } from "@/types";

export default function Traction({ stats, content }: { stats: Stat[]; content: SiteContent }) {
  return (
    <section id="traction" className="bg-field-gradient py-24 text-paper">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          dark
          eyebrow="Traction & Market"
          title="Growing on verified numbers, not projections alone"
          subtitle="Every metric below is pulled from the admin dashboard — update it once, and it's live everywhere on the site instantly."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border border-paper/15 p-5"
            >
              <StatNumber
                value={s.value}
                prefix={s.prefix}
                suffix={s.suffix}
                className="font-mono text-2xl font-semibold text-gold-light sm:text-3xl"
              />
              <p className="mt-2 text-xs leading-snug text-paper/60">{s.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.6fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4 }}
            className="flex flex-col justify-center border border-paper/15 p-8"
          >
            <p className="eyebrow mb-3 text-paper/50">{content.marketSizeLabel}</p>
            <p className="font-display text-4xl font-medium text-paper sm:text-5xl">
              {content.marketSizeValue}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="border border-paper/15 p-6"
          >
            <p className="eyebrow mb-4 text-paper/50">Cumulative Portfolio Value ($M) by Year</p>
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={content.trajectoryData} margin={{ left: -20, right: 10, top: 10 }}>
                  <defs>
                    <linearGradient id="growth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#C9A227" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="#C9A227" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="rgba(247,245,239,0.08)" vertical={false} />
                  <XAxis dataKey="year" tick={{ fill: "rgba(247,245,239,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: "rgba(247,245,239,0.5)", fontSize: 12 }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#0F2A20", border: "1px solid rgba(247,245,239,0.15)", fontSize: 12 }}
                    labelStyle={{ color: "#E8D48A" }}
                    itemStyle={{ color: "#F7F5EF" }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#C9A227" strokeWidth={2} fill="url(#growth)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
