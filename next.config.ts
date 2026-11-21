import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import "./src/lib/env";

const nextConfig: NextConfig = {
  env: { NEXT_PUBLIC_BUILD_DATE: new Date().toISOString() },
  images: { unoptimized: true },
  output: "export",
  trailingSlash: true,
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);
