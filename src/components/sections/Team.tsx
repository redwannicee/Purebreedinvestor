"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { TeamMember } from "@/types";

export default function Team({ team }: { team: TeamMember[] }) {
  return (
    <section id="team" className="border-b border-ink/10 bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Team" title="Bred for this, literally and professionally" />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
            >
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-mist font-display text-xl font-medium text-pine">
                {member.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.photoUrl} alt={member.name} className="h-full w-full rounded-full object-cover" />
                ) : (
                  initials(member.name)
                )}
              </div>
              <h3 className="font-display text-lg font-medium text-ink">{member.name}</h3>
              <p className="eyebrow mt-1 text-sprout">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
