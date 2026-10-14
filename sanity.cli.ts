/**
 * Settings for the `sanity` command line (npx sanity …): importing the seed
 * content, managing datasets, CORS and tokens. Reads the same `.env` as the
 * site.
 */
import { defineCliConfig } from "sanity/cli";

try {
  process.loadEnvFile(".env");
} catch {
  /* No .env yet: the variables may come from the shell instead */
}

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.PUBLIC_SANITY_DATASET ?? "production",
  },
});
