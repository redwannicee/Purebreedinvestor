"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import AdminSidebar, { AdminTab } from "@/components/admin/AdminSidebar";
import ContentManager from "@/components/admin/ContentManager";
import ProductManager from "@/components/admin/ProductManager";
import StatsManager from "@/components/admin/StatsManager";
import TeamManager from "@/components/admin/TeamManager";
import InquiriesList from "@/components/admin/InquiriesList";

export default function AdminDashboardPage() {
  const { user, isAdmin, loading, firebaseReady } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState<AdminTab>("overview");

  useEffect(() => {
    if (!loading && !user) router.replace("/admin/login");
  }, [loading, user, router]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center text-ink/50">Loading...</div>;
  }

  if (!user) return null; // redirecting

  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center">
        <XCircle className="h-8 w-8 text-ink/40" />
        <p className="font-display text-xl">This account isn&apos;t authorized as admin.</p>
        <p className="max-w-sm text-sm text-ink/60">
          Signed in as {user.email}. Set <code>NEXT_PUBLIC_ADMIN_EMAIL</code> in your env vars to this address, or
          sign in with the correct admin account.
        </p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-mist/30 lg:flex-row">
      <AdminSidebar active={tab} onChange={setTab} />

      <main className="flex-1 overflow-y-auto p-6 sm:p-10">
        {tab === "overview" && (
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-medium text-ink">Overview</h2>
            <p className="mt-1 text-sm text-ink/60">Welcome back. Everything you change here goes live on the public site immediately — no redeploy needed.</p>

            <div className="mt-8 flex items-center gap-2 border border-ink/10 bg-white p-4 text-sm">
              {firebaseReady ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-sprout" />
                  Firebase is connected. Content edits sync live.
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-gold" />
                  Firebase isn&apos;t connected — the public site is showing bundled seed data. Add your
                  credentials to <code className="mx-1">.env.local</code> and redeploy.
                </>
              )}
            </div>

            <ul className="mt-8 space-y-2 text-sm text-ink/70">
              <li>&middot; Use <strong>Products &amp; ROI</strong> to update the numbers behind the public calculator.</li>
              <li>&middot; Use <strong>Site Content</strong> to edit the hero, problem/solution copy, and market chart.</li>
              <li>&middot; Use <strong>Traction Stats</strong> and <strong>Team</strong> for the cards on the homepage.</li>
              <li>&middot; Check <strong>Inquiries</strong> for new investor contact form submissions.</li>
            </ul>
          </div>
        )}

        {tab === "content" && <ContentManager />}
        {tab === "products" && <ProductManager />}
        {tab === "stats" && <StatsManager />}
        {tab === "team" && <TeamManager />}
        {tab === "inquiries" && <InquiriesList />}
      </main>
    </div>
  );
}
