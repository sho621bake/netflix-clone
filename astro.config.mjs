// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwindcss from "@tailwindcss/vite";

// import node from "@astrojs/node";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  output: "server",

  integrations: [
    react({
      include: ["**/react/*"],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  // adapter: node({
  //   mode: "standalone",
  // }),
  adapter: vercel(),
});
