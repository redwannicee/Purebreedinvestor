"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Leaf, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const { login, firebaseReady } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed. Check your credentials.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-field-gradient px-6 py-16 text-paper">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <Image src="/logo.png" alt="Pureebreed" width={44} height={44} className="h-11 w-11 object-contain" />
          <div>
            <p className="font-display text-xl font-semibold">Pureebreed</p>
            <p className="eyebrow mt-1 text-paper/50">Admin Dashboard</p>
          </div>
        </div>

        <div className="p-[3px]" style={{ background: "rgba(201,162,39,0.4)" }}>
          <div className="border border-paper/15 bg-pine-dark p-8 shadow-certificate">
            {!firebaseReady && (
              <div className="mb-5 flex items-start gap-2 border border-gold/30 bg-gold/10 p-3 text-xs text-gold-light">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  Firebase isn&apos;t connected yet. Add your credentials to <code>.env.local</code> before logging in
                  — see the README.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="eyebrow mb-2 block text-paper/50">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-paper/20 bg-transparent px-4 py-3 text-paper outline-none focus:border-gold"
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="eyebrow mb-2 block text-paper/50">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-paper/20 bg-transparent px-4 py-3 text-paper outline-none focus:border-gold"
                  autoComplete="current-password"
                />
              </div>

              {error && <p className="text-sm text-gold-light">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 bg-gold px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-light disabled:opacity-60"
              >
                <Leaf className="h-4 w-4" />
                {submitting ? "Signing in..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>

        <a href="/" className="mt-6 block text-center text-xs text-paper/40 hover:text-paper/70">
          &larr; Back to the public site
        </a>
      </div>
    </main>
  );
}
