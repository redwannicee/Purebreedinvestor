import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";

// Self-hosted fonts (bundled at build time, no runtime dependency on Google's
// CDN — important for a static export deployed on GitHub Pages).
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";
import "@fontsource/fraunces/500-italic.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
import "@fontsource/ibm-plex-mono/600.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pureebreed | Certified Genetics, Compounding Returns",
  description:
    "Pureebreed builds and licenses DNA-verified breeding lines for livestock and specialty crops — turning agricultural genetics into a documented, investable asset class.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body bg-paper text-ink antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
