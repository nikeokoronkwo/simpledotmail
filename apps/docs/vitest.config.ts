import { defineConfig } from "vitest/config";
import { sharedConfig } from "@simple.mail/vitest-config";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	...sharedConfig,
	plugins: [react(), tsconfigPaths()],
	test: {
		environment: "jsdom",
		browser: {
			enabled: true,
			provider: playwright(),
			// https://vitest.dev/config/browser/playwright
			instances: [
				{ browser: "chromium" },
				{ browser: "firefox" },
				{ browser: "webkit" },
			],
		},
	},
});
