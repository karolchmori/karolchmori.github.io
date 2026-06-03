import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});


const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],

  experimental: {
    turbo: false,
  }, 
  webpack(config) {
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: "@mdx-js/loader",
        },
      ],
    });

    return config;
  },
};



export default withMDX(nextConfig);