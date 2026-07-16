"use client";

import { useEffect, useState } from "react";
import { Mail } from "lucide-react";
import { subscribeToInquiries } from "@/lib/firestore";
import { Inquiry } from "@/types";

export default function InquiriesList() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => subscribeToInquiries(setInquiries), []);

  return (
    <div>
      <h2 className="font-display text-2xl font-medium text-ink">Investor Inquiries</h2>
      <p className="mt-1 text-sm text-ink/60">Submissions from the contact form on the public site, newest first.</p>

      {inquiries.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-2 border border-dashed border-ink/15 p-12 text-center text-ink/40">
          <Mail className="h-6 w-6" />
          <p className="text-sm">No inquiries yet.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {inquiries.map((inq) => (
            <div key={inq.id} className="border border-ink/10 bg-white p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-ink">{inq.name}</p>
                <p className="font-mono text-xs text-ink/40">{new Date(inq.createdAt).toLocaleString()}</p>
              </div>
              <a href={`mailto:${inq.email}`} className="text-sm text-pine hover:underline">
                {inq.email}
              </a>
              <p className="mt-2 eyebrow text-sprout">{inq.investmentInterest}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{inq.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
