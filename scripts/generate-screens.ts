/**
 * Generate title screen and chapter setup artwork
 * Usage: npx tsx scripts/generate-screens.ts
 */

import fs from "fs";
import path from "path";

const envPath = path.join(__dirname, "..", ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const match = line.match(/^(\w+)=(.+)$/);
    if (match) process.env[match[1]] = match[2];
  }
}

const API_KEY = process.env.GEMINI_API_KEY;
if (!API_KEY) {
  console.error("Missing GEMINI_API_KEY in .env");
  process.exit(1);
}

const OUTPUT_DIR = path.join(__dirname, "..", "public", "images", "tangled");

const STYLE_PREFIX = [
  "Watercolor storybook illustration for children ages 8-12.",
  "Soft, warm palette with visible brush strokes and paper texture.",
  "Style reference: Oliver Jeffers meets Quentin Blake watercolor.",
  "No text, no speech bubbles, no words, no letters.",
].join(" ");

interface Scene {
  id: string;
  name: string;
  prompt: string;
}

const scenes: Scene[] = [
  {
    id: "title",
    name: "Title / Begin screen",
    prompt:
      "A beautiful watercolor cover illustration. A school hallway seen from above, with ripples spreading outward like water from a central point — as if a pebble was dropped. The ripples connect several Indian school children (ages 10) going about their day. One child (Alex, messy black hair) stands at the center looking thoughtful. The overall mood is warm, hopeful, and slightly mysterious. Soft indigo and gold tones. Paper texture visible. Book cover composition — vertical, centered, with space at top and bottom for title text.",
  },
  {
    id: "chain1_setup",
    name: "Chapter 1 setup — The Broken Phone",
    prompt:
      "A school cafeteria at lunchtime. Warm, bustling atmosphere. Indian school children (age 10) sitting at long tables with lunch trays. In the foreground, Alex (messy black hair, curious eyes) is mid-laugh with Sam (curly hair, big smile) at their table. Riya (braided hair, confident) sits nearby with her phone on the table. The scene is lively and happy — the calm before the accident. Golden afternoon light through cafeteria windows. Other kids chatting in the background.",
  },
];

async function generateImage(scene: Scene): Promise<void> {
  const fullPrompt = `${STYLE_PREFIX}\n\nScene: ${scene.prompt}`;

  console.log(`Generating: ${scene.name}...`);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: `Generate an image: ${fullPrompt}` }],
          },
        ],
        generationConfig: {
          responseModalities: ["IMAGE", "TEXT"],
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    console.error(`Failed for ${scene.id}: ${response.status} ${err}`);
    return;
  }

  const data = await response.json();
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts) {
    console.error(`No parts in response for ${scene.id}`);
    return;
  }

  const imagePart = parts.find(
    (p: any) => p.inlineData?.mimeType?.startsWith("image/")
  );

  if (!imagePart) {
    console.error(`No image in response for ${scene.id}`);
    return;
  }

  const imageBuffer = Buffer.from(imagePart.inlineData.data, "base64");
  const outputPath = path.join(OUTPUT_DIR, `${scene.id}.png`);
  fs.writeFileSync(outputPath, imageBuffer);
  console.log(`Saved: ${outputPath} (${(imageBuffer.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  for (const scene of scenes) {
    await generateImage(scene);
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("\nDone!");
}

main().catch(console.error);
