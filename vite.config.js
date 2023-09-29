import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    root: "./app/src/",
    base: "",
    server: {
        strictPort: true,
        port: 3000,
    },
    build: {
        emptyOutDir: true,
        minify: "terser",
        outDir: "../build/",
        rollupOptions: {
            input: {
                main: resolve(__dirname, "app/src/home.html"),
                about: resolve(__dirname, "app/src/about.html"),
            },
        },
    },
});
