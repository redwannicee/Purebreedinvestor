"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, Save } from "lucide-react";
import { subscribeToTeam, saveTeamMember, deleteTeamMember } from "@/lib/firestore";
import { TeamMember } from "@/types";
import AdminField, { inputClass } from "./AdminField";

function blankMember(order: number): TeamMember {
  return { id: "", name: "New Team Member", role: "", bio: "", photoUrl: "", order };
}

export default function TeamManager() {
  const [rows, setRows] = useState<TeamMember[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => subscribeToTeam(setRows), []);

  function update<K extends keyof TeamMember>(id: string, key: K, value: TeamMember[K]) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  }

  async function handleSave(row: TeamMember) {
    setSavingId(row.id || "new");
    try {
      await saveTeamMember(row);
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Remove this team member?")) return;
    await deleteTeamMember(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-medium text-ink">Team</h2>
          <p className="mt-1 text-sm text-ink/60">Photo URL can point to any hosted image (e.g. LinkedIn, Google Drive share link, or your own storage).</p>
        </div>
        <button
          onClick={() => setRows((prev) => [...prev, blankMember(prev.length + 1)])}
          className="flex items-center gap-1.5 bg-pine px-4 py-2.5 text-sm font-semibold text-paper hover:bg-pine-light"
        >
          <Plus className="h-4 w-4" />
          Add Member
        </button>
      </div>

      <div className="mt-8 space-y-5">
        {rows.map((row) => (
          <div key={row.id || row.order} className="grid gap-4 border border-ink/10 bg-white p-5 sm:grid-cols-2">
            <AdminField label="Name">
              <input className={inputClass} value={row.name} onChange={(e) => update(row.id, "name", e.target.value)} />
            </AdminField>
            <AdminField label="Role">
              <input className={inputClass} value={row.role} onChange={(e) => update(row.id, "role", e.target.value)} />
            </AdminField>
            <AdminField label="Photo URL">
              <input
                className={inputClass}
                value={row.photoUrl}
                onChange={(e) => update(row.id, "photoUrl", e.target.value)}
                placeholder="https://..."
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
            <div className="sm:col-span-2">
              <AdminField label="Bio">
                <textarea rows={3} className={inputClass} value={row.bio} onChange={(e) => update(row.id, "bio", e.target.value)} />
              </AdminField>
            </div>

            <div className="flex items-center gap-3 sm:col-span-2">
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
                  Remove
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
