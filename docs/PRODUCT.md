# The Ripple — Product

---

## What's built

- Game concept document — series overview, shared mechanics, Game 1 (Tangled) fully written with all 4 scenario chains and all branches
- Shared engine — state management (meter, journal, flags, compounding, end states), scene rendering, choice logic (57 tests passing)
- Game 1: Tangled — all 4 chains playable (The Broken Phone, The Group Project, The Secret, The Test)
- Mobile-first UI with phone mockup frame, trust meter, choice buttons, chain interstitials, end screen with journal
- Watercolor storybook illustrations (Gemini Flash) — title screen, chapter setup, and key scene art for Chain 1
- Deployed on Vercel (Next.js + TypeScript + Tailwind CSS)

---

## Next steps

1. **Playtest with kids.** Test with a few 8-12 year olds. Iterate on wording, difficulty, and meter balance.
2. **Expand artwork.** Generate scene illustrations for remaining chains (2-4) and end screen art.
3. **Home screen.** Game selection, journal review, replay prompt.
4. **Game 2 writing.** Begin scenario writing for The Invisible Thread (Gratitude).

---

## Product direction

- **Breadth over depth.** More games exploring different values, not deeper individual games. Target 4-6 games over time.
- **Shared engine, different stories.** Every game uses the same mechanics (meter, compounding, journal, end states) but tells a different story with a different theme. Adding a game means adding data files, not engine code.
- **Replayability is built in.** Branching paths + the journal comparison = kids naturally want to replay to see what changes. No replay mechanic needed — the structure does the work.
- **Culturally grounded, universally resonant.** Indian school settings, family dynamics, and social norms — but the values are universal.
- **Success target.** ~100 thoughtful families, one game session per day, replaying across different games. Parent-driven discovery, not viral growth.

---

## Launch plan

### What has to exist at launch

- ~~Shared engine — fully functional meter, journal, flags, end states~~ Done
- ~~Game 1: Tangled — all 4 chains playable~~ Done
- Home screen — game selection, journal review, replay prompt

### Launch trigger

Not a feature checklist. The bar is: *"if I showed this to the friend most likely to be politely unimpressed, would they still share it?"* Features are done when that answer is yes.

---

## Later

- Game 2: The Invisible Thread (Gratitude)
- Game 3: The Loud Silence (Courage)
- Cross-game character appearances (Riya shows up in a Courage scenario, reinforcing the shared world)
- Sound design — ambient sounds (school bell, playground, classroom hum) and choice feedback (soft chime for good, muted thud for bad)
- ~~Illustrations — warm, slightly stylized, picture book for older kids~~ Started (Chain 1 complete)

---

*Status: Engine built and tested. Game 1 fully playable with watercolor illustrations. Deployed on Vercel.*
