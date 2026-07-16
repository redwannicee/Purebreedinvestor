"use client";

import { LayoutDashboard, Package, BarChart3, Users, FileText, Mail, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export type AdminTab = "overview" | "content" | "products" | "stats" | "team" | "inquiries";

const TABS: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <LayoutDashboard className="h-4 w-4" /> },
  { id: "content", label: "Site Content", icon: <FileText className="h-4 w-4" /> },
  { id: "products", label: "Products & ROI", icon: <Package className="h-4 w-4" /> },
  { id: "stats", label: "Traction Stats", icon: <BarChart3 className="h-4 w-4" /> },
  { id: "team", label: "Team", icon: <Users className="h-4 w-4" /> },
  { id: "inquiries", label: "Inquiries", icon: <Mail className="h-4 w-4" /> },
];

export default function AdminSidebar({ active, onChange }: { active: AdminTab; onChange: (t: AdminTab) => void }) {
  const { logout, user } = useAuth();

  return (
    <aside className="flex w-full flex-col justify-between border-b border-ink/10 bg-pine-dark p-6 text-paper lg:h-screen lg:w-64 lg:border-b-0 lg:border-r">
      <div>
        <p className="font-display text-lg font-semibold">Pureebreed</p>
        <p className="mt-0.5 text-xs text-paper/50">Admin Dashboard</p>

        <nav className="mt-8 flex flex-row gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className={`flex shrink-0 items-center gap-2.5 px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                active === t.id ? "bg-paper/10 text-gold-light" : "text-paper/60 hover:bg-paper/5 hover:text-paper"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-8 border-t border-paper/10 pt-4">
        <p className="truncate text-xs text-paper/40">{user?.email}</p>
        <button
          onClick={() => logout()}
          className="mt-3 flex items-center gap-2 text-sm font-medium text-paper/60 hover:text-gold-light"
        >
          <LogOut className="h-4 w-4" />
          Log out
        </button>
      </div>
    </aside>
  );
}
