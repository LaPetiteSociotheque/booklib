import withMDX from "@next/mdx"

import type { NextConfig } from "next"

const withMdx = withMDX({
  extension: /\.mdx?$/,
  options: {
    
  },
})

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  
}

export default withMdx(nextConfig)
