"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { subscribeToStats, saveStat, deleteStat } from "@/lib/firestore";
import { Stat } from "@/types";
import AdminField, { inputClass } from "./AdminField";

function blankStat(order: number): Stat {
  return { id: "", label: "New Metric", value: 0, prefix: "", suffix: "", order };
}

export default function StatsManager() {
  const [rows, setRows] = useState<Stat[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => subscribeToStats(setRows), []);

  function update<K extends keyof Stat>(id: string, key: K, value: Stat[K]) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  }

  async function handleSave(row: Stat) {
    setSavingId(row.id || "new");
    try {
      await saveStat(row);
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this stat card?")) return;
    await deleteStat(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-medium text-ink">Traction Stats</h2>
          <p className="mt-1 text-sm text-ink/60">These four (or more) cards appear in the dark Traction section.</p>
        </div>
        <button
          onClick={() => setRows((prev) => [...prev, blankStat(prev.length + 1)])}
          className="flex items-center gap-1.5 bg-pine px-4 py-2.5 text-sm font-semibold text-paper hover:bg-pine-light"
        >
          <Plus className="h-4 w-4" />
          Add Stat
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {rows.map((row) => (
          <div key={row.id || row.order} className="border border-ink/10 bg-white p-5">
            <AdminField label="Label">
              <input className={inputClass} value={row.label} onChange={(e) => update(row.id, "label", e.target.value)} />
            </AdminField>
            <div className="mt-3 grid grid-cols-3 gap-3">
              <AdminField label="Prefix">
                <input className={inputClass} value={row.prefix} onChange={(e) => update(row.id, "prefix", e.target.value)} />
              </AdminField>
              <AdminField label="Value">
                <input
                  type="number"
                  step="0.1"
                  className={inputClass}
                  value={row.value}
                  onChange={(e) => update(row.id, "value", Number(e.target.value))}
                />
              </AdminField>
              <AdminField label="Suffix">
                <input className={inputClass} value={row.suffix} onChange={(e) => update(row.id, "suffix", e.target.value)} />
              </AdminField>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={() => handleSave(row)}
                disabled={savingId === (row.id || "new")}
                className="flex items-center gap-1.5 bg-gold px-4 py-2 text-sm font-semibold text-ink hover:bg-gold-light disabled:opacity-60"
              >
                <Save className="h-3.5 w-3.5" />
                {savingId === (row.id || "new") ? "Saving..." : "Save"}
              </button>
              {row.id && (
                <button
                  onClick={() => handleDelete(row.id)}
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-ink/50 hover:text-ink"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
