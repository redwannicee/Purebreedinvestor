import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F5EF", // warm parchment ground
        ink: "#14231C", // near-black with a green undertone, primary text
        pine: {
          DEFAULT: "#1B4332", // primary brand green
          dark: "#0F2A20", // deep dusk field, used for contrast sections
          light: "#245C41",
        },
        sprout: "#2FA66B", // vivid mid-green accent, echoes the logo gradient
        gold: {
          DEFAULT: "#C9A227", // harvest gold, CTAs + data highlights
          light: "#E8D48A",
        },
        mist: "#E4E9E1", // pale sage, card backgrounds & dividers
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      backgroundImage: {
        "field-gradient": "linear-gradient(135deg, #0F2A20 0%, #1B4332 55%, #245C41 100%)",
      },
      boxShadow: {
        certificate: "0 1px 0 0 rgba(20,35,28,0.06), 0 12px 32px -16px rgba(20,35,28,0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
