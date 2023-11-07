import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
    return {
        root: "./app/renderer/src/",
        base: command === "serve" ? "/" : "",
        server: {
            strictPort: true,
            port: 3000,
        },
        plugins: [react()],
        build: {
            emptyOutDir: true,
            minify: "terser",
            outDir: "../build/",
            // rollupOptions: {
            //     input: {
            //         main: resolve(__dirname, "app/renderer/src/home.html"),
            //         about: resolve(__dirname, "app/renderer/src/about.html"),
            //     },
            // },
        },
    };
});
