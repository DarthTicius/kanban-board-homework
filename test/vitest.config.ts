import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		css: true,
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
		},
	},
	resolve: {
		alias: {
			"@src": path.resolve(__dirname, "../src"),
			"@components": path.resolve(__dirname, "../src/components"),
		},
	},
});
