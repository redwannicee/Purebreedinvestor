"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import Traction from "@/components/sections/Traction";
import Products from "@/components/sections/Products";
import Calculator from "@/components/sections/Calculator";
import Team from "@/components/sections/Team";
import ContactForm from "@/components/sections/ContactForm";
import { subscribeToContent, subscribeToStats, subscribeToProducts, subscribeToTeam } from "@/lib/firestore";
import { seedContent, seedProducts, seedStats, seedTeam } from "@/lib/seedData";
import { SiteContent, Stat, Product, TeamMember } from "@/types";

export default function Home() {
  const [content, setContent] = useState<SiteContent>(seedContent);
  const [stats, setStats] = useState<Stat[]>(seedStats);
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [team, setTeam] = useState<TeamMember[]>(seedTeam);
  const [selectedId, setSelectedId] = useState<string>(seedProducts[0]?.id ?? "");

  useEffect(() => {
    const unsubs = [
      subscribeToContent(setContent),
      subscribeToStats(setStats),
      subscribeToProducts((items) => {
        setProducts(items);
        setSelectedId((current) => (items.some((p) => p.id === current) ? current : items[0]?.id ?? ""));
      }),
      subscribeToTeam(setTeam),
    ];
    return () => unsubs.forEach((u) => u());
  }, []);

  function handleSelectProduct(id: string) {
    setSelectedId(id);
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Navbar pitchDeckUrl={content.pitchDeckUrl} />
      <main>
        <Hero content={content} />
        <ProblemSolution content={content} />
        <Traction stats={stats} content={content} />
        <Products products={products} onSelect={handleSelectProduct} />
        {products.length > 0 && (
          <Calculator products={products} selectedId={selectedId} onSelectId={setSelectedId} />
        )}
        <Team team={team} />
        <ContactForm products={products} />
      </main>
      <Footer />
    </>
  );
}
