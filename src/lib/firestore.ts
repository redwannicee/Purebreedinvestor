"use client";

import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, isFirebaseConfigured } from "./firebase";
import { Product, Stat, TeamMember, SiteContent, Inquiry } from "@/types";
import { seedContent, seedProducts, seedStats, seedTeam } from "./seedData";

type Unsubscribe = () => void;

// ---------- PRODUCTS ----------

export function subscribeToProducts(cb: (items: Product[]) => void): Unsubscribe {
  if (!isFirebaseConfigured || !db) {
    cb(seedProducts);
    return () => {};
  }
  const q = query(collection(db, "products"), orderBy("order", "asc"));
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Product);
      cb(items.length ? items : seedProducts);
    },
    () => cb(seedProducts)
  );
}

export async function saveProduct(product: Product) {
  if (!db) throw new Error("Firebase is not configured.");
  const ref = doc(db, "products", product.id || crypto.randomUUID());
  await setDoc(ref, { ...product, id: ref.id }, { merge: true });
}

export async function deleteProduct(id: string) {
  if (!db) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(db, "products", id));
}

// ---------- STATS ----------

export function subscribeToStats(cb: (items: Stat[]) => void): Unsubscribe {
  if (!isFirebaseConfigured || !db) {
    cb(seedStats);
    return () => {};
  }
  const q = query(collection(db, "stats"), orderBy("order", "asc"));
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Stat);
      cb(items.length ? items : seedStats);
    },
    () => cb(seedStats)
  );
}

export async function saveStat(stat: Stat) {
  if (!db) throw new Error("Firebase is not configured.");
  const ref = doc(db, "stats", stat.id || crypto.randomUUID());
  await setDoc(ref, { ...stat, id: ref.id }, { merge: true });
}

export async function deleteStat(id: string) {
  if (!db) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(db, "stats", id));
}

// ---------- TEAM ----------

export function subscribeToTeam(cb: (items: TeamMember[]) => void): Unsubscribe {
  if (!isFirebaseConfigured || !db) {
    cb(seedTeam);
    return () => {};
  }
  const q = query(collection(db, "team"), orderBy("order", "asc"));
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as TeamMember);
      cb(items.length ? items : seedTeam);
    },
    () => cb(seedTeam)
  );
}

export async function saveTeamMember(member: TeamMember) {
  if (!db) throw new Error("Firebase is not configured.");
  const ref = doc(db, "team", member.id || crypto.randomUUID());
  await setDoc(ref, { ...member, id: ref.id }, { merge: true });
}

export async function deleteTeamMember(id: string) {
  if (!db) throw new Error("Firebase is not configured.");
  await deleteDoc(doc(db, "team", id));
}

// ---------- SITE CONTENT (single document) ----------

export function subscribeToContent(cb: (content: SiteContent) => void): Unsubscribe {
  if (!isFirebaseConfigured || !db) {
    cb(seedContent);
    return () => {};
  }
  const ref = doc(db, "content", "site");
  return onSnapshot(
    ref,
    (snap) => {
      cb(snap.exists() ? ({ ...seedContent, ...snap.data() } as SiteContent) : seedContent);
    },
    () => cb(seedContent)
  );
}

export async function saveContent(content: Partial<SiteContent>) {
  if (!db) throw new Error("Firebase is not configured.");
  const ref = doc(db, "content", "site");
  await setDoc(ref, content, { merge: true });
}

export async function getContentOnce(): Promise<SiteContent> {
  if (!isFirebaseConfigured || !db) return seedContent;
  const ref = doc(db, "content", "site");
  const snap = await getDoc(ref);
  return snap.exists() ? ({ ...seedContent, ...snap.data() } as SiteContent) : seedContent;
}

// ---------- INVESTOR INQUIRIES ----------

export async function submitInquiry(inquiry: Omit<Inquiry, "id" | "createdAt">) {
  if (!isFirebaseConfigured || !db) {
    throw new Error(
      "This form isn't connected yet — the site owner needs to add Firebase credentials."
    );
  }
  await addDoc(collection(db, "inquiries"), {
    ...inquiry,
    createdAt: serverTimestamp(),
  });
}

export function subscribeToInquiries(cb: (items: Inquiry[]) => void): Unsubscribe {
  if (!isFirebaseConfigured || !db) {
    cb([]);
    return () => {};
  }
  const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
  return onSnapshot(
    q,
    (snap) => {
      const items = snap.docs.map((d) => {
        const data = d.data() as Record<string, unknown>;
        const createdAt =
          data.createdAt && typeof data.createdAt === "object" && "toMillis" in data.createdAt
            ? (data.createdAt as { toMillis: () => number }).toMillis()
            : Date.now();
        return { id: d.id, ...data, createdAt } as Inquiry;
      });
      cb(items);
    },
    () => cb([])
  );
}
