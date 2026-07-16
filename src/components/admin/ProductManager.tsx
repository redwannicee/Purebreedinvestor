"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { subscribeToProducts, saveProduct, deleteProduct } from "@/lib/firestore";
import { Product } from "@/types";
import AdminField, { inputClass } from "./AdminField";

function blankProduct(order: number): Product {
  return {
    id: "",
    name: "New Product Line",
    tagline: "",
    category: "Livestock Genetics",
    minInvestment: 1000,
    riskProfile: "Moderate",
    timelineMonths: 12,
    baselineRoiPercent: 15,
    description: "",
    order,
  };
}

export default function ProductManager() {
  const [rows, setRows] = useState<Product[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => subscribeToProducts(setRows), []);

  function update<K extends keyof Product>(id: string, key: K, value: Product[K]) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  }

  async function handleSave(row: Product) {
    setSavingId(row.id || "new");
    try {
      await saveProduct(row);
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product? This also removes it from the live calculator.")) return;
    await deleteProduct(id);
  }

  function handleAdd() {
    setRows((prev) => [...prev, blankProduct(prev.length + 1)]);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-medium text-ink">Products & ROI</h2>
          <p className="mt-1 text-sm text-ink/60">
            These baseline ROI and timeline values feed the public profit/loss calculator directly.
          </p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 bg-pine px-4 py-2.5 text-sm font-semibold text-paper hover:bg-pine-light"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="mt-8 space-y-6">
        {rows.map((row) => (
          <div key={row.id || row.order} className="border border-ink/10 bg-white p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <AdminField label="Product Name">
                <input className={inputClass} value={row.name} onChange={(e) => update(row.id, "name", e.target.value)} />
              </AdminField>
              <AdminField label="Category">
                <input
                  className={inputClass}
                  value={row.category}
                  onChange={(e) => update(row.id, "category", e.target.value)}
                />
              </AdminField>
              <AdminField label="Tagline">
                <input
                  className={inputClass}
                  value={row.tagline}
                  onChange={(e) => update(row.id, "tagline", e.target.value)}
                />
              </AdminField>

              <AdminField label="Minimum Investment ($)">
                <input
                  type="number"
                  className={inputClass}
                  value={row.minInvestment}
                  onChange={(e) => update(row.id, "minInvestment", Number(e.target.value))}
                />
              </AdminField>
              <AdminField label="Risk Profile">
                <select
                  className={inputClass}
                  value={row.riskProfile}
                  onChange={(e) => update(row.id, "riskProfile", e.target.value as Product["riskProfile"])}
                >
                  <option value="Low">Low</option>
                  <option value="Moderate">Moderate</option>
                  <option value="High">High</option>
                </select>
              </AdminField>
              <AdminField label="Timeline (months)">
                <input
                  type="number"
                  className={inputClass}
                  value={row.timelineMonths}
                  onChange={(e) => update(row.id, "timelineMonths", Number(e.target.value))}
                />
              </AdminField>

              <AdminField label="Baseline Annual ROI (%)" hint="This is the exact number the calculator's math uses.">
                <input
                  type="number"
                  step="0.1"
                  className={inputClass}
                  value={row.baselineRoiPercent}
                  onChange={(e) => update(row.id, "baselineRoiPercent", Number(e.target.value))}
                />
              </AdminField>
              <AdminField label="Sort Order">
                <input
                  type="number"
                  className={inputClass}
                  value={row.order}
                  onChange={(e) => update(row.id, "order", Number(e.target.value))}
                />
              </AdminField>
            </div>

            <div className="mt-4">
              <AdminField label="Description">
                <textarea
                  rows={3}
                  className={inputClass}
                  value={row.description}
                  onChange={(e) => update(row.id, "description", e.target.value)}
                />
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
