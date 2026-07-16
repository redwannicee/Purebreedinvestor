/** @type {import('next').NextConfig} */

// ⚠️ Change this to your actual GitHub repository name.
// Example: if your repo is github.com/yourname/pureebreed-site, set:
const repoName = "Purebreedinvestor";

// If you are deploying to a CUSTOM DOMAIN (e.g. www.pureebreed.com) instead of
// https://yourname.github.io/pureebreed-site, set USE_BASE_PATH to false.
const USE_BASE_PATH = true;

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: USE_BASE_PATH && process.env.NODE_ENV === "production" ? `/${repoName}` : "",
  assetPrefix: USE_BASE_PATH && process.env.NODE_ENV === "production" ? `/${repoName}/` : "",
};

export default nextConfig;
