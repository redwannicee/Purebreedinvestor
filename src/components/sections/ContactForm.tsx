"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { submitInquiry } from "@/lib/firestore";
import { Product } from "@/types";

interface FormValues {
  name: string;
  email: string;
  investmentInterest: string;
  message: string;
}

export default function ContactForm({ products }: { products: Product[] }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(values: FormValues) {
    setStatus("idle");
    try {
      await submitInquiry(values);
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <section id="contact" className="bg-field-gradient py-24 text-paper">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          dark
          align="center"
          eyebrow="Investor Inquiries"
          title="Interested in a line, or want the full deck walkthrough?"
          subtitle="Tell us a bit about your interest and we'll follow up directly."
        />

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-10 flex flex-col items-center gap-3 border border-paper/15 p-10 text-center"
          >
            <CheckCircle2 className="h-8 w-8 text-sprout" />
            <p className="font-display text-xl">Thanks &mdash; we&apos;ve got it.</p>
            <p className="text-sm text-paper/60">Someone from Pureebreed will be in touch shortly.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-10 space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="eyebrow mb-2 block text-paper/50">Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full border border-paper/20 bg-transparent px-4 py-3 text-paper outline-none placeholder:text-paper/30 focus:border-gold"
                  placeholder="Jordan Lee"
                />
                {errors.name && <p className="mt-1 text-xs text-gold-light">{errors.name.message}</p>}
              </div>
              <div>
                <label className="eyebrow mb-2 block text-paper/50">Email</label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                  })}
                  className="w-full border border-paper/20 bg-transparent px-4 py-3 text-paper outline-none placeholder:text-paper/30 focus:border-gold"
                  placeholder="jordan@fund.com"
                />
                {errors.email && <p className="mt-1 text-xs text-gold-light">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="eyebrow mb-2 block text-paper/50">Interested In</label>
              <select
                {...register("investmentInterest", { required: true })}
                className="w-full border border-paper/20 bg-pine-dark px-4 py-3 text-paper outline-none focus:border-gold"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a product or general inquiry
                </option>
                <option value="General inquiry">General inquiry</option>
                {products.map((p) => (
                  <option key={p.id} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="eyebrow mb-2 block text-paper/50">Message</label>
              <textarea
                rows={4}
                {...register("message", { required: "Tell us a little about your interest" })}
                className="w-full border border-paper/20 bg-transparent px-4 py-3 text-paper outline-none placeholder:text-paper/30 focus:border-gold"
                placeholder="I'd like to learn more about..."
              />
              {errors.message && <p className="mt-1 text-xs text-gold-light">{errors.message.message}</p>}
            </div>

            {status === "error" && <p className="text-sm text-gold-light">{errorMsg}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 bg-gold px-7 py-3.5 text-sm font-semibold text-ink transition-all hover:bg-gold-light hover:-translate-y-0.5 disabled:opacity-60"
            >
              {isSubmitting ? "Sending..." : "Send Inquiry"}
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
