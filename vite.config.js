import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import tailwindcss from "@tailwindcss/vite";
import { createStyleImportPlugin, AntdResolve } from "vite-plugin-style-import";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    createStyleImportPlugin({
      resolves: [AntdResolve()], // ✅ 正确使用 React 版 Ant Design 插件
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  resolve: {
    alias: {
      "@/": resolve(__dirname, "src") + "/",
    },
  },
  base: "/pretty-derby/",
});
