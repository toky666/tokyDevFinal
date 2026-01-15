import { defineConfig, envField } from "astro/config";

import react from "@astrojs/react";

import vercelServerless from "@astrojs/vercel";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://itssofi.dev",
  env: {
    schema: {
      LOCAL_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      SITE_URL: envField.string({
        context: "client",
        access: "public",optional: true,
      }),
      YT_API: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      CHANNEL_ID: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  integrations: [react(), mdx()],
  output: "server",
  adapter: vercelServerless(),
});
