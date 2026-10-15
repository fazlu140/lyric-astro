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

/* The hosted Studio build only sees SANITY_STUDIO_ variables */
process.env.SANITY_STUDIO_PROJECT_ID ??= process.env.PUBLIC_SANITY_PROJECT_ID;
process.env.SANITY_STUDIO_DATASET ??= process.env.PUBLIC_SANITY_DATASET ?? "production";

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.PUBLIC_SANITY_DATASET ?? "production",
  },
});
