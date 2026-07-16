"use client";

import { useEffect, useMemo, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import SectionHeading from "@/components/ui/SectionHeading";
import StatNumber from "@/components/ui/StatNumber";
import { Product } from "@/types";

export default function Calculator({
  products,
  selectedId,
  onSelectId,
}: {
  products: Product[];
  selectedId: string;
  onSelectId: (id: string) => void;
}) {
  const product = products.find((p) => p.id === selectedId) ?? products[0];
  const [amount, setAmount] = useState(product?.minInvestment ?? 1000);

  // When a different product is selected (from this dropdown or the "Model
  // this investment" button on a product card), snap the amount to that
  // product's minimum so the projection always starts from a valid input.
  useEffect(() => {
    if (product) setAmount(product.minInvestment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  const sliderMax = useMemo(() => (product ? Math.max(product.minInvestment * 40, 50000) : 50000), [product]);

  const projection = useMemo(() => {
    if (!product) return null;
    const years = product.timelineMonths / 12;
    const annualRate = product.baselineRoiPercent / 100;
    const totalMultiplier = Math.pow(1 + annualRate, years);
    const projectedValue = amount * totalMultiplier;
    const profit = projectedValue - amount;

    const steps = Math.max(Math.round(years), 1);
    const series = Array.from({ length: steps + 1 }, (_, i) => {
      const t = (i / steps) * years;
      return {
        label: i === 0 ? "Start" : `Mo ${Math.round((t / years) * product.timelineMonths)}`,
        value: Math.round(amount * Math.pow(1 + annualRate, t)),
      };
    });

    return { years, projectedValue, profit, series };
  }, [amount, product]);

  if (!product || !projection) return null;

  return (
    <section id="calculator" className="border-b border-ink/10 bg-mist/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Interactive Calculator"
          title="Model your return before you commit"
          subtitle="Pick a product, set an amount, and see the projection instantly — built on the same baseline ROI the admin dashboard controls."
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-ink/10 bg-ink/10 lg:grid-cols-[1fr_1.2fr]">
          {/* Controls */}
          <div className="bg-white p-8 sm:p-10">
            <label className="eyebrow mb-2 block text-ink/40">Select Product</label>
            <select
              value={product.id}
              onChange={(e) => onSelectId(e.target.value)}
              className="w-full border border-ink/15 bg-paper px-4 py-3 font-medium text-ink outline-none transition-colors focus:border-pine"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <div className="mt-8">
              <div className="mb-2 flex items-baseline justify-between">
                <label className="eyebrow text-ink/40">Investment Amount</label>
                <span className="font-mono text-sm text-ink/50">
                  min ${product.minInvestment.toLocaleString()}
                </span>
              </div>
              <p className="font-mono text-3xl font-semibold text-pine">${amount.toLocaleString()}</p>
              <input
                type="range"
                min={product.minInvestment}
                max={sliderMax}
                step={Math.max(Math.round(product.minInvestment / 10), 50)}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mt-4 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-ink/10 accent-gold"
              />
              <input
                type="number"
                min={product.minInvestment}
                value={amount}
                onChange={(e) => setAmount(Math.max(Number(e.target.value) || 0, product.minInvestment))}
                className="mt-4 w-full border border-ink/15 bg-paper px-4 py-2.5 font-mono text-sm outline-none focus:border-pine"
              />
            </div>

            <dl className="mt-8 space-y-3 border-t border-dashed border-ink/10 pt-6 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink/50">Baseline Annual ROI</dt>
                <dd className="font-mono font-medium text-ink">{product.baselineRoiPercent}%</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/50">Projected Timeline</dt>
                <dd className="font-mono font-medium text-ink">{product.timelineMonths} months</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/50">Risk Profile</dt>
                <dd className="font-mono font-medium text-ink">{product.riskProfile}</dd>
              </div>
            </dl>
          </div>

          {/* Results */}
          <div className="bg-pine-dark p-8 text-paper sm:p-10">
            <p className="eyebrow mb-1 text-paper/50">Projected Profit</p>
            <StatNumber
              value={projection.profit}
              prefix="$"
              decimals={0}
              className="font-display text-4xl font-medium text-gold-light sm:text-5xl"
            />

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="border border-paper/15 p-4">
                <p className="text-xs text-paper/50">Total Value at Exit</p>
                <StatNumber
                  value={projection.projectedValue}
                  prefix="$"
                  decimals={0}
                  className="mt-1 block font-mono text-lg font-semibold text-paper"
                />
              </div>
              <div className="border border-paper/15 p-4">
                <p className="text-xs text-paper/50">Total Return</p>
                <p className="mt-1 font-mono text-lg font-semibold text-paper">
                  {((projection.projectedValue / amount - 1) * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="mt-6 h-40 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projection.series} margin={{ left: -20, right: 5, top: 10 }}>
                  <defs>
                    <linearGradient id="calc-growth" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2FA66B" stopOpacity={0.55} />
                      <stop offset="100%" stopColor="#2FA66B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="label" tick={{ fill: "rgba(247,245,239,0.45)", fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip
                    formatter={(v: number) => [`$${v.toLocaleString()}`, "Value"]}
                    contentStyle={{ background: "#0F2A20", border: "1px solid rgba(247,245,239,0.15)", fontSize: 12 }}
                    labelStyle={{ color: "#E8D48A" }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#2FA66B" strokeWidth={2} fill="url(#calc-growth)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <p className="mt-6 text-xs leading-relaxed text-paper/40">
              Illustrative only, based on the baseline ROI currently set for this product in the admin
              dashboard. Not a guarantee of future returns. Past performance of a breeding line does not
              guarantee future results.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
