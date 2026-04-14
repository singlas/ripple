/**
 * Generate watercolor storybook artwork for Chain 1: The Broken Phone
 * Uses Gemini 2.0 Flash image generation API
 *
 * Usage: npx tsx scripts/generate-art.ts
 */

import fs from "fs";
import path from "path";

// Load .env
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

const OUTPUT_DIR = path.join(__dirname, "..", "assets", "chain1");

const STYLE_PREFIX = [
  "Watercolor storybook illustration for children ages 8-12.",
  "Soft, warm palette with visible brush strokes and paper texture.",
  "Characters are Indian school kids (~10 years old) in casual school uniforms.",
  "Expressive faces, gentle lighting, no text or speech bubbles.",
  "Style reference: Oliver Jeffers meets Quentin Blake watercolor.",
].join(" ");

const CHARACTER_REF = [
  "Alex: medium skin, short messy black hair, curious eyes, slightly small for their age.",
  "Riya: dark skin, long braided hair, confident posture, kind face.",
  "Sam: light-brown skin, curly hair, big smile, energetic body language.",
  "Priya Ma'am: adult woman, glasses, warm but firm expression, sari.",
].join(" ");

interface Scene {
  id: string;
  name: string;
  prompt: string;
}

const scenes: Scene[] = [
  {
    id: "01_lunch_table_accident",
    name: "Round 1 — The moment it happens",
    prompt:
      "A school cafeteria lunch table. Alex's elbow has just knocked a phone off the table. The phone is mid-fall or just landed on the floor with a cracked screen. Riya looks shocked, Sam is eating nearby. Other kids in the background. Moment of panic on Alex's face.",
  },
  {
    id: "02_honest_apology",
    name: "Round 1 — Honest choice",
    prompt:
      "Alex standing across from Riya at the lunch table, looking genuinely sorry with hands open in an apologetic gesture. Riya looks surprised but not angry. Warm golden light suggesting relief and honesty. The cracked phone is on the table between them.",
  },
  {
    id: "03_blame_sam",
    name: "Round 1 — Blame Sam choice",
    prompt:
      "Alex pointing subtly toward Sam while talking to Riya. Sam is in the background, unaware, laughing with another kid. Alex's expression is nervous, avoiding eye contact. A slight shadow falls over Alex. Riya looks confused, glancing between Alex and Sam.",
  },
  {
    id: "04_teacher_confrontation",
    name: "Round 2 — Teacher looks at Alex",
    prompt:
      "Classroom scene. Priya Ma'am (teacher in sari, glasses) standing with arms crossed looking at Alex with a searching, fair expression. Sam stands nearby looking hurt and confused, shaking his head. Alex looks cornered, other students watching from their desks.",
  },
  {
    id: "05_doubling_down",
    name: "Round 2 — Doubling down",
    prompt:
      "Alex talking with forced confidence while Sam looks deeply hurt in the background, turning away. The watercolor palette shifts cooler — more blues and grays around Alex, suggesting the weight of the lie growing. Riya watches from a distance, arms crossed.",
  },
  {
    id: "06_recess_apology",
    name: "Round 3 — Finding Sam at recess",
    prompt:
      "School playground at recess. Alex approaching Sam who sits alone on a bench. Alex's body language is small and humble. Sam looks up, guarded but listening. Warm afternoon sunlight breaking through clouds — a visual metaphor for possible reconciliation. Other kids playing in the soft background.",
  },
  {
    id: "07_gossip_escalation",
    name: "Round 3 — Telling another friend / escalation",
    prompt:
      "Alex whispering to another kid in a school corridor, gesturing dismissively. In the background, Sam and Riya stand together looking toward Alex with hurt and disbelief. The watercolor tones are murky — darker blues, muddy greens — showing the lie spreading like ink in water.",
  },
  {
    id: "08_riya_confronts",
    name: "Round 4 — Riya confronts Alex",
    prompt:
      "Face to face: Riya standing tall and direct, looking Alex in the eyes with a mix of hurt and strength. Alex looks small, caught. They're in the school hallway, other kids visible but giving space. Dramatic but gentle lighting. The cracked phone is visible in Riya's hand.",
  },
  {
    id: "09_late_honesty",
    name: "Round 4 — Late honesty",
    prompt:
      "Alex with head slightly bowed, finally telling the truth. A single tear or expression of relief. Riya's face softens slightly — not fully forgiving but acknowledging the courage. Sam stands a few steps back, arms crossed but listening. Warm light returns but muted — trust can rebuild but it takes time.",
  },
  {
    id: "10_bridge_burned",
    name: "Round 4 — Bridge burned",
    prompt:
      "Alex walking away alone down a school corridor. Behind them, Riya has turned her back, and Sam is walking away in the other direction with another friend. The watercolor bleeds at the edges — cool blues and lonely grays. Alex's shadow is long. A powerful, sad moment showing the cost of broken trust.",
  },
];

async function generateImage(scene: Scene): Promise<void> {
  const fullPrompt = `${STYLE_PREFIX}\n\nCharacters: ${CHARACTER_REF}\n\nScene: ${scene.prompt}`;

  console.log(`Generating: ${scene.name} (${scene.id})...`);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `Generate an image: ${fullPrompt}`,
              },
            ],
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

  // Extract image from response
  const parts = data.candidates?.[0]?.content?.parts;
  if (!parts) {
    console.error(`No parts in response for ${scene.id}`);
    console.error(JSON.stringify(data, null, 2).slice(0, 500));
    return;
  }

  const imagePart = parts.find(
    (p: any) => p.inlineData?.mimeType?.startsWith("image/")
  );

  if (!imagePart) {
    console.error(`No image in response for ${scene.id}`);
    console.error(
      JSON.stringify(parts.map((p: any) => Object.keys(p))).slice(0, 200)
    );
    return;
  }

  const imageBuffer = Buffer.from(imagePart.inlineData.data, "base64");
  const outputPath = path.join(OUTPUT_DIR, `${scene.id}.png`);
  fs.writeFileSync(outputPath, imageBuffer);
  console.log(`Saved: ${outputPath} (${(imageBuffer.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Generating ${scenes.length} scenes for Chain 1: The Broken Phone\n`);

  // Generate sequentially to avoid rate limits
  for (const scene of scenes) {
    await generateImage(scene);
    // Small delay between requests
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("\nDone! Check assets/chain1/");
}

main().catch(console.error);
