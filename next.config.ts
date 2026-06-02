import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "export", // Keep this for GitHub Pages
  images: {
    unoptimized: true, // Required for GitHub Pages
  },
};

const withMDX = createMDX({
  // This helps Next.js recognize MDX files during the build
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);