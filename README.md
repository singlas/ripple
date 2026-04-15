# The Ripple

A choice-based story game series for kids ages 8-12. Every choice creates ripples. Good choices open doors. Bad choices narrow the path. Doubling down makes things worse. But owning up — even late — can start recovery.

## What is this?

The Ripple is an umbrella brand for a series of short, replayable story games. Each game explores one core value (trust, courage, empathy, etc.) through everyday scenarios a kid would actually face. Choices compound — they build on each other, for better or worse.

## Current status

Game 1 — **Tangled** (Trust & Honesty) — is fully playable with all 4 scenario chains:

1. **The Broken Phone** — Alex accidentally cracks Riya's phone. Own up or lie?
2. **The Group Project** — Kabir did the research. Who gets the credit?
3. **The Secret** — Riya shared something private. Can you keep it safe?
4. **The Test** — The answer sheet is right there. Nobody's watching.

Each chain has 6 rounds of branching binary choices with a compounding trust meter. Honest choices build trust; lies compound and narrow your options.

### Engine

- Trust meter with compounding bad-streak multiplier (1x to 2.5x)
- 4 end-state tiers: Excellent / Good / Rocky / Broken
- Journal that records every choice
- 57 tests passing

### Artwork

32 watercolor storybook illustrations generated via Gemini Flash, covering title screen, chapter setups, and key scenes across all 4 chains. Consistent style: warm palette, Indian school setting, Oliver Jeffers meets Quentin Blake.

## Documentation

All game design, writing guides, and product plans live in [`docs/`](docs/FRAMEWORK.md).

## Tech stack

Next.js + TypeScript + Tailwind CSS. Mobile-first web app. Deployed on Vercel.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Generating artwork

Add your Gemini API key to `.env`:

```
GEMINI_API_KEY=your_key_here
```

Then run the generation scripts:

```bash
npx tsx scripts/generate-art.ts          # Chain 1 scenes
npx tsx scripts/generate-chains-2-4.ts   # Chains 2-4 scenes
npx tsx scripts/generate-screens.ts      # Title + chapter setup screens
```

Images are saved to `public/images/tangled/` and `assets/`.
