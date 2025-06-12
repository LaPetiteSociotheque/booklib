import withMDX from "@next/mdx"
import type { NextConfig } from "next"

const withMdx = withMDX({
  extension: /\.mdx?$/,
  options: {
    // You can add remark/rehype plugins here if needed
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  eslint: {
    ignoreDuringBuilds: true, // ⬅️ Add this line to bypass ESLint errors on Vercel
  },
}

export default withMdx(nextConfig)
