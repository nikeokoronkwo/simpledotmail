import { defineConfig } from 'vitest/config'
import { sharedConfig } from "@simple.mail/vitest-config";

export default defineConfig({
  ...sharedConfig,
  test: {
    projects: ['packages/*'],
  },
})