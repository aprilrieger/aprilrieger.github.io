import mdx from "@astrojs/mdx";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// User site: https://aprilrieger.github.io/ (no path prefix)
export default defineConfig({
  site: "https://aprilrieger.github.io",
  integrations: [mdx(), tailwind()],
  redirects: {
    "/about": "/resume",
  },
});
