"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth, ADMIN_EMAIL, isFirebaseConfigured } from "@/lib/firebase";

interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  firebaseReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured || !auth) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const isAdmin = Boolean(
    user && ADMIN_EMAIL && user.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()
  );

  async function login(email: string, password: string) {
    if (!isFirebaseConfigured || !auth) {
      throw new Error(
        "Firebase isn't configured yet. Add your credentials to .env.local first."
      );
    }
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    if (!auth) return;
    await signOut(auth);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAdmin, loading, firebaseReady: isFirebaseConfigured, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
