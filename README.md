# Pureebreed — Investor Site

A static, investor-facing site for Pureebreed with a live-editable CMS and an
interactive profit/loss calculator, built to deploy for free on **GitHub
Pages**.

**Stack:** Next.js 14 (App Router, static export) · TypeScript · Tailwind CSS
· Firebase (Auth + Firestore, client-side only) · Framer Motion · Recharts

---

## How it works

- The public site (`/`) reads content from Firestore in real time. If
  Firebase isn't configured yet, it falls back to realistic example content
  bundled in `src/lib/seedData.ts`, so the site never looks broken on a fresh
  clone.
- `/admin/login` and `/admin/dashboard` let you sign in and edit that content
  — hero copy, traction stats, team bios, and every investment product's ROI
  variables. Changes save to Firestore and appear on the public site within a
  second or two, with **no redeploy needed**.
- Because GitHub Pages only serves static files, there's no Node server here.
  Firebase Auth and Firestore run entirely from the browser (this is a normal,
  supported way to use Firebase). Admin access is enforced by Firestore
  Security Rules, not by a server hiding the page — see `firestore.rules`.

---

## 1. Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`. At this point it's showing the bundled example
content (Firebase isn't connected yet), and `/admin/login` will say so.

---

## 2. Connect Firebase (Auth + Database)

1. Go to [console.firebase.google.com](https://console.firebase.google.com) →
   **Add project** (the free Spark plan is enough for this site).
2. **Authentication** → Get started → enable the **Email/Password** provider.
3. Authentication → Users → **Add user** — this is your one admin login.
   Use a real email and a strong password.
4. **Firestore Database** → Create database → start in **production mode**
   (the security rules below handle access control).
5. Firestore → Rules → paste in the contents of `firestore.rules` from this
   repo → Publish.
6. Project settings (gear icon) → General → scroll to **Your apps** → click
   the `</>` (web) icon → register an app (no hosting needed) → copy the
   `firebaseConfig` values shown.
7. Copy `.env.local.example` to `.env.local` and fill it in:

   ```bash
   cp .env.local.example .env.local
   ```

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
   NEXT_PUBLIC_FIREBASE_APP_ID=...
   NEXT_PUBLIC_ADMIN_EMAIL=you@example.com   # must match the user from step 3
   ```

8. Restart `npm run dev`. Go to `/admin/login` and sign in with the user from
   step 3. You're in the dashboard.
9. Add your real products, stats, team members, and copy. The public site
   updates live as you save each one.

> These `NEXT_PUBLIC_...` values are safe to be public — Firebase's web
> config isn't a secret. Real protection comes from `firestore.rules`, which
> only allows the signed-in admin to write data.

---

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/pureebreed-site.git
git push -u origin main
```

**Important:** open `next.config.mjs` and set `repoName` to match your actual
repository name (this controls the URL subpath GitHub Pages serves from).

---

## 4. Deploy to GitHub Pages (free, automatic)

1. On GitHub: your repo → **Settings** → **Pages** → under "Build and
   deployment", set **Source** to **GitHub Actions**.
2. Your repo → **Settings** → **Secrets and variables** → **Actions** →
   add each of these as a **Repository secret** (same values as your
   `.env.local`):
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`
   - `NEXT_PUBLIC_ADMIN_EMAIL`
3. Push to `main` (or re-run the workflow manually from the **Actions** tab).
   The included workflow (`.github/workflows/deploy.yml`) builds the static
   export and publishes it automatically.
4. Your site goes live at `https://YOUR_USERNAME.github.io/pureebreed-site/`.

Every future `git push` to `main` — code changes only, not content edits —
redeploys automatically.

### Using a custom domain instead

1. In `next.config.mjs`, set `USE_BASE_PATH = false`.
2. Repo → Settings → Pages → add your custom domain, and follow GitHub's
   DNS instructions (a `CNAME` record pointing to `YOUR_USERNAME.github.io`).
3. Commit the `CNAME` file GitHub Pages generates so it persists across
   deploys (add it to `public/CNAME` so it's copied into every build).

---

## Editing content day-to-day

Go to `https://your-site-url/admin/login`, sign in, and use the dashboard:

- **Products & ROI** — add/edit/remove investment products. The
  **Baseline Annual ROI** and **Timeline** fields here are exactly what the
  public profit/loss calculator computes with.
- **Site Content** — hero headline/subheadline, problem/solution copy,
  market size, and the growth chart's data points.
- **Traction Stats** — the four stat cards in the dark section.
- **Team** — add/edit team members and bios.
- **Inquiries** — read investor messages submitted through the contact form.

No redeploy is needed for any of this — it's all live Firestore data.

---

## Local production preview

Since this is a static export, `next start` won't work. Preview the actual
production build like this:

```bash
npm run build
npx serve out
```

---

## Project structure

```
src/
  app/
    page.tsx                 Public homepage (assembles all sections)
    admin/login/page.tsx      Admin sign-in
    admin/dashboard/page.tsx  Protected CMS dashboard
  components/
    layout/                  Navbar, Footer
    sections/                Hero, ProblemSolution, Traction, Products,
                              Calculator, Team, ContactForm
    admin/                   Product/Stats/Team/Content managers, Inquiries
    ui/                      Button, CertificateCard, SectionHeading, StatNumber
  lib/
    firebase.ts              Firebase app init (client-side)
    firestore.ts             Typed CRUD + realtime subscriptions
    seedData.ts               Bundled fallback content
  context/AuthContext.tsx     Auth state + admin-email gate
  types/index.ts               Shared TypeScript types
firestore.rules                Firestore Security Rules (deploy via console)
.github/workflows/deploy.yml   CI: build + deploy to GitHub Pages
```

## Notes on dependencies

`npm audit` may flag a handful of moderate/high advisories in Next.js's own
transitive dependencies (Image Optimization API, WebSocket upgrade handling,
middleware/i18n). These all concern Next's **server runtime**, which this
project never runs — it ships as a static export with no Node server, no
middleware, and no image optimization API. They don't apply to this
deployment, but it's worth checking `npm audit` again before any future
upgrade off static export.
