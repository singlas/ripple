/**
 * Generate watercolor storybook artwork for Chains 2-4
 * Usage: npx tsx scripts/generate-chains-2-4.ts
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
  "Kabir: quiet kid, glasses, neat hair, shy posture, always carrying a book.",
  "Priya Ma'am: adult woman, glasses, warm but firm expression, sari.",
].join(" ");

interface Scene {
  id: string;
  chain: string;
  name: string;
  prompt: string;
}

const scenes: Scene[] = [
  // ── Chain 2: The Group Project ──
  {
    id: "chain2_setup",
    chain: "chain2",
    name: "Chapter 2 setup",
    prompt: "A classroom before a presentation. Four Indian school kids (age 10) at a table with a poster project. Kabir (glasses, shy) is holding research notes nervously. Alex stands, about to go to the front. Riya gives a thumbs up. Sam looks excited. Priya Ma'am watches from her desk. Warm classroom light, other kids at their desks.",
  },
  {
    id: "01_presenting",
    chain: "chain2",
    name: "Round 1 — Presenting the project",
    prompt: "Alex standing at the front of a classroom, holding Kabir's research notes. The class watches. Kabir sits in the back, small and nervous, hoping to be mentioned. Priya Ma'am nods encouragingly. Spotlight moment — will Alex give credit?",
  },
  {
    id: "02_kabir_smiles",
    chain: "chain2",
    name: "Credit path — Kabir reacts",
    prompt: "Kabir smiling shyly after being praised. A rare, genuine smile. Alex is at the front of the class, gesturing toward Kabir. Riya gives a thumbs up. Warm golden light suggesting recognition and fairness.",
  },
  {
    id: "03_kabir_hurt",
    chain: "chain2",
    name: "Steal credit — Kabir is hurt",
    prompt: "Kabir looking down at his desk, hurt and invisible, while Alex presents confidently at the front taking all the credit. Riya frowns. The watercolor palette shifts cooler around Kabir — blues and grays of being overlooked.",
  },
  {
    id: "04_teacher_asks",
    chain: "chain2",
    name: "Teacher investigates",
    prompt: "Priya Ma'am sitting at her desk after class, looking at Alex with a searching expression. She's asking who really did the work. Alex looks caught. Papers and the project visible on the desk. Warm but tense moment.",
  },
  {
    id: "05_kabir_alone",
    chain: "chain2",
    name: "Kabir withdraws",
    prompt: "School cafeteria. Kabir sitting alone at a far corner table, eating quietly, looking at his book. In the background, Alex's group is at their usual table. The distance between them tells the story. Lonely blues around Kabir, warm tones around the group.",
  },
  {
    id: "06_kabir_note",
    chain: "chain2",
    name: "Kabir's note",
    prompt: "Close-up of a desk with a small folded note. Kabir walking away in the background. Alex's hands reaching for the note. Soft, emotional watercolor with warm tones returning — a moment of quiet reconciliation.",
  },

  // ── Chain 3: The Secret ──
  {
    id: "chain3_setup",
    chain: "chain3",
    name: "Chapter 3 setup",
    prompt: "School lunch table. Sam sitting with his tray, leaning in curiously, asking a question. An empty seat where Riya usually sits. Alex sitting across, looking conflicted — holding a secret. The cafeteria is busy but the focus is on this quiet, tense moment between friends.",
  },
  {
    id: "01_sam_asks",
    chain: "chain3",
    name: "Round 1 — Sam asks about Riya",
    prompt: "Close-up of Sam and Alex at a lunch table. Sam looks concerned and curious, asking about Riya. Alex's face shows the internal conflict — loyalty vs. sharing. Riya's empty chair is prominent. Warm but tense lighting.",
  },
  {
    id: "02_keeping_secret",
    chain: "chain3",
    name: "Keeping the secret",
    prompt: "Alex with a determined, protective expression, gently deflecting Sam's questions. Sam looks a bit frustrated but understanding. A subtle warm glow around Alex suggesting doing the right thing. The empty chair between them.",
  },
  {
    id: "03_riya_arrives",
    chain: "chain3",
    name: "Riya arrives — did you tell?",
    prompt: "Riya sitting down at the lunch table, eyes slightly red from crying, looking at Alex with a vulnerable, questioning expression. Alex meets her eyes reassuringly. Sam glances between them. Intimate, emotional moment with soft watercolor washes.",
  },
  {
    id: "04_secret_spreads",
    chain: "chain3",
    name: "Secret spreads",
    prompt: "School hallway. Whispers spreading — kids turning to look at Riya as she walks by. Riya looks small and exposed. Watercolor ink-blot effect radiating outward from the center, showing how secrets spread like ripples. Cool, uncomfortable blues and purples.",
  },
  {
    id: "05_riya_confronts",
    chain: "chain3",
    name: "Riya confronts Alex",
    prompt: "Riya standing face-to-face with Alex, eyes red, voice cracking. She looks betrayed. Alex looks guilty and small. Other kids have stepped back, giving them space. Dramatic but gentle lighting, emotional watercolor with tears-like washes.",
  },
  {
    id: "06_bench_alone",
    chain: "chain3",
    name: "Riya alone on bench",
    prompt: "Riya sitting alone on a school bench outside, looking at the ground. Alex approaching from a distance, hesitant. Autumn-toned watercolor — warm but melancholic. The space between them is the story.",
  },

  // ── Chain 4: The Test ──
  {
    id: "chain4_setup",
    chain: "chain4",
    name: "Chapter 4 setup",
    prompt: "An empty classroom after school. Alex alone, returning a notebook to the teacher's desk. On the desk, a paper is visible — the answer sheet. Nobody else is around. Late afternoon light streaming through windows, creating a dramatic spotlight on the desk. Moment of temptation.",
  },
  {
    id: "01_answer_sheet",
    chain: "chain4",
    name: "Round 1 — The answer sheet",
    prompt: "Close-up dramatic shot: Alex's hand hovering over a desk where an answer sheet sits in plain sight. The test paper is clearly visible. Alex's face shows temptation and internal conflict. Heart beating fast. Late afternoon light, shadows lengthening. Nobody watching.",
  },
  {
    id: "02_walking_away",
    chain: "chain4",
    name: "Walking away",
    prompt: "Alex walking away from the teacher's desk, looking back once over the shoulder. The answer sheet remains untouched. Warm golden light suggesting integrity. Alex's posture shows relief mixed with lingering temptation. Beautiful, quiet heroism.",
  },
  {
    id: "03_phone_photo",
    chain: "chain4",
    name: "Taking the photo",
    prompt: "Alex's hand holding a phone, photographing the answer sheet on the desk. The phone screen glows in the dim classroom. Alex's face shows a mix of excitement and guilt. Darker watercolor tones — shadows growing, a visual weight of the wrong choice.",
  },
  {
    id: "04_during_test",
    chain: "chain4",
    name: "During the test",
    prompt: "Classroom during a test. Students bent over papers. Alex sits with a conflicted expression — remembering the answers from the peek. Sam next to Alex, struggling honestly with the test. Priya Ma'am walking between desks. Tension in the air.",
  },
  {
    id: "05_results",
    chain: "chain4",
    name: "Test results",
    prompt: "Priya Ma'am handing back test papers. She pauses at Alex's desk with a raised eyebrow and a knowing look. Alex holds the paper — a high score that wasn't honestly earned. The grade glows but Alex's face doesn't match. Guilt watercolor — warm surface, cold underneath.",
  },
  {
    id: "06_walking_home",
    chain: "chain4",
    name: "Walking home — reflection",
    prompt: "Alex walking home alone on a tree-lined path, backpack heavy, looking thoughtful. Sam walks beside, talking casually. The test paper is metaphorically weighing Alex down. Late afternoon golden light, long shadows. A moment of quiet reckoning. Beautiful, contemplative composition.",
  },
];

async function generateImage(scene: Scene): Promise<void> {
  const outputDir = path.join(__dirname, "..", "public", "images", "tangled", scene.chain);
  fs.mkdirSync(outputDir, { recursive: true });

  // Also save to assets
  const assetsDir = path.join(__dirname, "..", "assets", scene.chain);
  fs.mkdirSync(assetsDir, { recursive: true });

  const fullPrompt = `${STYLE_PREFIX}\n\nCharacters: ${CHARACTER_REF}\n\nScene: ${scene.prompt}`;

  console.log(`Generating: [${scene.chain}] ${scene.name}...`);

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
    console.error(`Failed for ${scene.id}: ${response.status} ${err.slice(0, 200)}`);
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

  const publicPath = path.join(outputDir, `${scene.id}.png`);
  fs.writeFileSync(publicPath, imageBuffer);

  const assetsPath = path.join(assetsDir, `${scene.id}.png`);
  fs.writeFileSync(assetsPath, imageBuffer);

  console.log(`  Saved: ${publicPath} (${(imageBuffer.length / 1024).toFixed(0)} KB)`);
}

async function main() {
  console.log(`Generating ${scenes.length} scenes for Chains 2-4\n`);

  for (const scene of scenes) {
    await generateImage(scene);
    await new Promise((r) => setTimeout(r, 2000));
  }

  console.log("\nDone! Check public/images/tangled/chain{2,3,4}/");
}

main().catch(console.error);
