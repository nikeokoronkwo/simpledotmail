import { defineConfig } from "vitest/config";
import { sharedConfig } from "@simple.mail/vitest-config";
import react from "@vitejs/plugin-react";

export default defineConfig({
	...sharedConfig,
	plugins: [react()],
	test: {
		// ...
	},
});
