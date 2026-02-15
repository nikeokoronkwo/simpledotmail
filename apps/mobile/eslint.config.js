// https://docs.expo.dev/guides/using-eslint/
import { defineConfig } from 'eslint/config';
import expoConfig from "eslint-config-expo/flat";
import { config } from "@simple.mail/eslint-config/base"

export default defineConfig([
  config,
  expoConfig,
  {
    ignores: ["dist/*"],
  },
  {
    // Test files only
    files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    extends: ['plugin:testing-library/react'],
  },
]);
