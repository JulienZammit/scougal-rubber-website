import "dotenv/config";
import { createClient } from "@sanity/client";

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET = "production",
  SANITY_API_TOKEN,
} = process.env;

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-10-01",
  token: SANITY_API_TOKEN,
  useCdn: false,
});

try {
  const count = await client.fetch(`count(*[_type == "post"])`);
  console.log(`✓ Connected to project ${NEXT_PUBLIC_SANITY_PROJECT_ID}`);
  console.log(`✓ Dataset "${NEXT_PUBLIC_SANITY_DATASET}" reachable`);
  console.log(`✓ Existing posts: ${count}`);
} catch (err) {
  console.error("✗ Connection failed:", err.message);
  process.exit(1);
}
