// Seed Sanity with the 5 team members from app/experience/page.js as Author documents.
// Each author photo is uploaded from /public/employees/ to Sanity assets.
//
// Run: node scripts/seed-authors.mjs

import "dotenv/config";
import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID,
  NEXT_PUBLIC_SANITY_DATASET = "production",
  SANITY_API_TOKEN,
} = process.env;

if (!SANITY_API_TOKEN) {
  console.error("Missing SANITY_API_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId: NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2024-10-01",
  token: SANITY_API_TOKEN,
  useCdn: false,
});

const team = [
  {
    name: "Rob Anderson",
    jobTitle: "President",
    photo: "ra.jpg",
    bio: "After stints with Boeing and a commercial window manufacturer, Rob joined Scougal in 1992 and has been instrumental in overseeing production, operations, and sales. He currently manages both the Seattle and Reno operations.",
  },
  {
    name: "Scott Nelson",
    jobTitle: "Vice President Sales & Marketing",
    photo: "sn.jpg",
    bio: "Scott joined the Sales/Estimating Team in 2006 after graduating from the University of Washington. He played a key role in relocating Scougal Rubber to the new McCarran, NV plant in 2011.",
  },
  {
    name: "Alfredo Shanklin",
    jobTitle: "Plant Manager - Seattle",
    photo: "as.jpg",
    bio: "With over 16 years at Scougal, Al transitioned from Quality Control to Production, ensuring the company remains competitive in rubber manufacturing.",
  },
  {
    name: "Ahsan Ativalu",
    jobTitle: "Plant Manager - Reno",
    photo: "aa.jpg",
    bio: "Ahsan, who joined Scougal Rubber in 1999, was pivotal in planning and executing the relocation of critical equipment to McCarran, NV in 2010.",
  },
  {
    name: "Brad Streeter",
    jobTitle: "Quality Manager",
    photo: "bs.jpg",
    bio: "Brad oversees quality management with over 30 years of experience in formal quality systems and continuous improvement, ensuring top-notch product standards.",
  },
];

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function uploadPhoto(filename) {
  const filePath = path.join(repoRoot, "public", "employees", filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ photo not found: ${filename}`);
    return null;
  }
  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, { filename });
  return asset._id;
}

async function main() {
  for (const member of team) {
    const slug = slugify(member.name);
    const docId = `author-${slug}`;
    console.log(`\n→ ${member.name}`);

    const photoAssetId = await uploadPhoto(member.photo);

    const doc = {
      _id: docId,
      _type: "author",
      name: member.name,
      slug: { _type: "slug", current: slug },
      jobTitle: member.jobTitle,
      bio: member.bio,
      ...(photoAssetId
        ? {
            avatar: {
              _type: "image",
              asset: { _type: "reference", _ref: photoAssetId },
              alt: member.name,
            },
          }
        : {}),
    };

    await client.createOrReplace(doc);
    console.log(`  ✓ created`);
  }

  console.log(`\n✅ Seeded ${team.length} authors.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
