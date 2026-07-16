import { Product, Stat, TeamMember, SiteContent } from "@/types";

// This is the content that ships with the repo. Everything here is editable
// live from /admin/dashboard once Firebase is connected — this file only
// defines what a brand-new, unconfigured site shows on first load.

export const seedContent: SiteContent = {
  heroEyebrow: "Series Seed · Now Raising",
  heroHeadline: "Certified genetics. Compounding returns.",
  heroSubheadline:
    "Pureebreed builds and licenses verified breeding lines for livestock and specialty crops, turning agricultural genetics into a documented, investable asset class.",
  heroCtaLabel: "Download Pitch Deck",
  pitchDeckUrl: "#",
  problemTitle: "Breeding value is real — and mostly untracked",
  problemBody:
    "Independent breeders produce genuinely superior livestock and crop lines every season, but that value is locked inside informal, undocumented pedigrees. Buyers can't verify lineage claims, breeders can't raise capital against future litters or harvests, and the entire market is priced on trust rather than data.",
  solutionTitle: "We turn pedigree into a verifiable, fundable ledger",
  solutionBody:
    "Pureebreed combines DNA-verified lineage records with a structured investment wrapper: each breeding line becomes a product with its own certified pedigree, production schedule, and return profile — fundable by outside capital and tracked to harvest or sale.",
  marketSizeLabel: "Addressable market across livestock genetics & specialty seed licensing",
  marketSizeValue: "$4.2B",
  trajectoryData: [
    { year: "2023", value: 0.4 },
    { year: "2024", value: 1.1 },
    { year: "2025", value: 2.6 },
    { year: "2026", value: 4.8 },
    { year: "2027", value: 8.5 },
  ],
};

export const seedStats: Stat[] = [
  { id: "s1", label: "Certified breeding lines", value: 37, suffix: "", prefix: "", order: 1 },
  { id: "s2", label: "Verified pedigree records", value: 12400, suffix: "+", prefix: "", order: 2 },
  { id: "s3", label: "YoY revenue growth", value: 164, suffix: "%", prefix: "", order: 3 },
  { id: "s4", label: "Capital deployed to date", value: 2.1, suffix: "M", prefix: "$", order: 4 },
];

export const seedProducts: Product[] = [
  {
    id: "p1",
    name: "Highland Cattle Line — HC-04",
    tagline: "DNA-verified breeding herd, 3rd generation",
    category: "Livestock Genetics",
    minInvestment: 5000,
    riskProfile: "Moderate",
    timelineMonths: 18,
    baselineRoiPercent: 22,
    description:
      "A closed, pedigree-certified Highland cattle line bred for cold-climate resilience and premium beef yield. Funding covers herd expansion and veterinary/DNA verification through the next two calving cycles.",
    order: 1,
  },
  {
    id: "p2",
    name: "Drought-Resistant Wheat Seed Line — W-11",
    tagline: "Licensed seed genetics for arid-zone growers",
    category: "Crop Genetics",
    minInvestment: 2500,
    riskProfile: "Low",
    timelineMonths: 12,
    baselineRoiPercent: 14,
    description:
      "A proprietary wheat line optimized for low-water yield, currently in licensing trials with three regional co-ops. Capital funds seed multiplication and licensing rollout.",
    order: 2,
  },
  {
    id: "p3",
    name: "Merino Wool Flock — M-09",
    tagline: "High-micron-count fiber genetics",
    category: "Livestock Genetics",
    minInvestment: 7500,
    riskProfile: "High",
    timelineMonths: 24,
    baselineRoiPercent: 31,
    description:
      "An expansion flock targeting premium textile buyers. Higher return profile reflects early-stage flock scaling and fiber-market price sensitivity.",
    order: 3,
  },
];

export const seedTeam: TeamMember[] = [
  {
    id: "t1",
    name: "Founder Name",
    role: "Co-Founder & CEO",
    bio: "Background in agricultural genetics and livestock operations. Replace with your real bio in the admin dashboard.",
    photoUrl: "",
    order: 1,
  },
  {
    id: "t2",
    name: "Co-Founder Name",
    role: "Co-Founder & Head of Genetics",
    bio: "Background in animal/plant breeding science. Replace with your real bio in the admin dashboard.",
    photoUrl: "",
    order: 2,
  },
  {
    id: "t3",
    name: "Team Member Name",
    role: "Head of Investor Relations",
    bio: "Background in agri-finance. Replace with your real bio in the admin dashboard.",
    photoUrl: "",
    order: 3,
  },
];
