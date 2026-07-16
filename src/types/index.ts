// Central type definitions. Firestore documents are typed against these
// shapes, and the admin dashboard forms are built to edit exactly these fields.

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string; // e.g. "Livestock Genetics", "Crop Line", "Processing"
  minInvestment: number; // in USD
  riskProfile: "Low" | "Moderate" | "High";
  timelineMonths: number; // projected horizon used by the calculator
  baselineRoiPercent: number; // annualized % used as the calculator's default
  description: string;
  order: number;
}

export interface Stat {
  id: string;
  label: string;
  value: number;
  suffix: string; // e.g. "%", "x", "+", "M"
  prefix: string; // e.g. "$"
  order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  order: number;
}

export interface SiteContent {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroCtaLabel: string;
  pitchDeckUrl: string;
  problemTitle: string;
  problemBody: string;
  solutionTitle: string;
  solutionBody: string;
  marketSizeLabel: string;
  marketSizeValue: string;
  trajectoryData: { year: string; value: number }[];
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  investmentInterest: string;
  message: string;
  createdAt: number;
}
