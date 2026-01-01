import adapter from "@hono/vite-dev-server/cloudflare";
import build from "@hono/vite-build/cloudflare-pages";
import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  if (mode === "client") {
    return {
      publicDir: "public",
      build: {
        rollupOptions: {
          input: "./app/client.ts",
          output: {
            entryFileNames: "static/client.js",
          },
        },
      },
    };
  } else {
    return {
      publicDir: "public",
      plugins: [
        devServer({
          adapter,
          entry: "app/server.ts",
        }),
        build(),
      ],
    };
  }
});
