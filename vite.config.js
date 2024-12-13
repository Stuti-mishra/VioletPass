import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { viteStaticCopy } from "vite-plugin-static-copy";
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "src/apiGateway-js-sdk", // Path to the sdk folder
          dest: "apiGateway-js-sdk", // Folder name in the build output
        },
      ],
    }),
  ],
});