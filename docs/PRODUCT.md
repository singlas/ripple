# The Ripple — Product

---

## What's built

- Game concept document (`the-ripple-game-concept.md`) — series overview, shared mechanics, Game 1 (Tangled) fully written with all 4 scenario chains and all branches
- Technical architecture spec — repository structure, scenario data format, engine rules
- Static site scaffolding (Next.js + Tailwind, deployed on Vercel)

---

## Next steps

1. **Shared engine.** State management (meter, journal, flags), scene rendering, choice logic, journal tracking, end state calculation. This is the foundation everything else runs on.
2. **Game 1: Tangled.** Implement all 4 scenario chains from the concept doc. First playable game.
3. **Playtest with kids.** Test with a few 8-12 year olds. Iterate on wording, difficulty, and meter balance.
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

- Shared engine — fully functional meter, journal, flags, end states
- Game 1: Tangled — all 4 chains playable
- Home screen — game selection, journal review, replay prompt

### Launch trigger

Not a feature checklist. The bar is: *"if I showed this to the friend most likely to be politely unimpressed, would they still share it?"* Features are done when that answer is yes.

---

## Later

- Game 2: The Invisible Thread (Gratitude)
- Game 3: The Loud Silence (Courage)
- Cross-game character appearances (Riya shows up in a Courage scenario, reinforcing the shared world)
- Sound design — ambient sounds (school bell, playground, classroom hum) and choice feedback (soft chime for good, muted thud for bad)
- Illustrations — warm, slightly stylized, picture book for older kids

---

*Status: Concept document complete. Tangled fully written. Engine not yet built.*
