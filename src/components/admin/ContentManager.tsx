"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { subscribeToContent, saveContent } from "@/lib/firestore";
import { seedContent } from "@/lib/seedData";
import { SiteContent } from "@/types";
import AdminField, { inputClass } from "./AdminField";

export default function ContentManager() {
  const [content, setContent] = useState<SiteContent>(seedContent);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => subscribeToContent(setContent), []);

  function set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  function updateTrajectory(index: number, field: "year" | "value", value: string) {
    const next = [...content.trajectoryData];
    next[index] = { ...next[index], [field]: field === "value" ? Number(value) : value };
    set("trajectoryData", next);
  }

  async function handleSave() {
    setSaving(true);
    try {
      await saveContent(content);
      setSaved(true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-2xl font-medium text-ink">Site Content</h2>
      <p className="mt-1 text-sm text-ink/60">Everything here maps directly to the public homepage copy.</p>

      <div className="mt-8 space-y-8">
        <section className="space-y-4 border border-ink/10 bg-white p-6">
          <h3 className="eyebrow text-pine">Hero</h3>
          <AdminField label="Eyebrow">
            <input className={inputClass} value={content.heroEyebrow} onChange={(e) => set("heroEyebrow", e.target.value)} />
          </AdminField>
          <AdminField label="Headline">
            <input className={inputClass} value={content.heroHeadline} onChange={(e) => set("heroHeadline", e.target.value)} />
          </AdminField>
          <AdminField label="Subheadline">
            <textarea
              rows={3}
              className={inputClass}
              value={content.heroSubheadline}
              onChange={(e) => set("heroSubheadline", e.target.value)}
            />
          </AdminField>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="CTA Button Label">
              <input className={inputClass} value={content.heroCtaLabel} onChange={(e) => set("heroCtaLabel", e.target.value)} />
            </AdminField>
            <AdminField label="Pitch Deck URL" hint="Link to a PDF (e.g. Google Drive share link).">
              <input className={inputClass} value={content.pitchDeckUrl} onChange={(e) => set("pitchDeckUrl", e.target.value)} />
            </AdminField>
          </div>
        </section>

        <section className="space-y-4 border border-ink/10 bg-white p-6">
          <h3 className="eyebrow text-pine">Problem & Solution</h3>
          <AdminField label="Problem Title">
            <input className={inputClass} value={content.problemTitle} onChange={(e) => set("problemTitle", e.target.value)} />
          </AdminField>
          <AdminField label="Problem Body">
            <textarea rows={3} className={inputClass} value={content.problemBody} onChange={(e) => set("problemBody", e.target.value)} />
          </AdminField>
          <AdminField label="Solution Title">
            <input className={inputClass} value={content.solutionTitle} onChange={(e) => set("solutionTitle", e.target.value)} />
          </AdminField>
          <AdminField label="Solution Body">
            <textarea rows={3} className={inputClass} value={content.solutionBody} onChange={(e) => set("solutionBody", e.target.value)} />
          </AdminField>
        </section>

        <section className="space-y-4 border border-ink/10 bg-white p-6">
          <h3 className="eyebrow text-pine">Market Size</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Label">
              <input className={inputClass} value={content.marketSizeLabel} onChange={(e) => set("marketSizeLabel", e.target.value)} />
            </AdminField>
            <AdminField label="Value (e.g. $4.2B)">
              <input className={inputClass} value={content.marketSizeValue} onChange={(e) => set("marketSizeValue", e.target.value)} />
            </AdminField>
          </div>
        </section>

        <section className="space-y-4 border border-ink/10 bg-white p-6">
          <div className="flex items-center justify-between">
            <h3 className="eyebrow text-pine">Growth Chart (Traction section)</h3>
            <button
              onClick={() => set("trajectoryData", [...content.trajectoryData, { year: "", value: 0 }])}
              className="flex items-center gap-1 text-xs font-semibold text-pine hover:text-sprout"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Point
            </button>
          </div>
          {content.trajectoryData.map((point, i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                className={inputClass}
                placeholder="Year"
                value={point.year}
                onChange={(e) => updateTrajectory(i, "year", e.target.value)}
              />
              <input
                type="number"
                className={inputClass}
                placeholder="Value"
                value={point.value}
                onChange={(e) => updateTrajectory(i, "value", e.target.value)}
              />
              <button
                onClick={() => set("trajectoryData", content.trajectoryData.filter((_, idx) => idx !== i))}
                className="shrink-0 text-ink/40 hover:text-ink"
                aria-label="Remove point"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </section>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 bg-gold px-5 py-2.5 text-sm font-semibold text-ink hover:bg-gold-light disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save All Content"}
          </button>
          {saved && <span className="text-sm text-sprout">Saved.</span>}
        </div>
      </div>
    </div>
  );
}
