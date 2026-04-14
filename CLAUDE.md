@AGENTS.md

## What this project is

The Ripple is a choice-based story game series for kids ages 8-12. Each game explores one core value (trust, courage, empathy, etc.) through everyday scenarios with branching choices that compound. A shared engine powers all games — adding a new game means adding data files, not engine code.

## Documentation

All game design, writing guides, and product plans live in `docs/`. See `docs/FRAMEWORK.md` for the index.

| Doc | Contents |
|---|---|
| `docs/GAME_DESIGN.md` | Concept, glossary, mechanics (meter, compounding, threshold, journal, end states), design principles |
| `docs/WRITING_GUIDE.md` | Craft principles, scenario chain rules, choice design, data format, repo structure, character bible |
| `docs/PRODUCT.md` | What's built, next steps, product direction, launch plan |
| `stories/TANGLED.md` | Game 1 — full scenario chains with all rounds, choices, meter values, end states |

## Tech stack

Next.js + TypeScript + Tailwind CSS. Mobile-first web app.

## Current status

- Game concept and design docs complete
- Game 1 (Tangled — Trust & Honesty) fully written with all 4 scenario chains
- Static site scaffolding deployed on Vercel
- Engine not yet built

## Skill routing

When the user's request matches an available skill, ALWAYS invoke it using the Skill
tool as your FIRST action. Do NOT answer directly, do NOT use other tools first.
The skill has specialized workflows that produce better results than ad-hoc answers.

Key routing rules:
- Product ideas, "is this worth building", brainstorming → invoke office-hours
- Bugs, errors, "why is this broken", 500 errors → invoke investigate
- Ship, deploy, push, create PR → invoke ship
- QA, test the site, find bugs → invoke qa
- Code review, check my diff → invoke review
- Update docs after shipping → invoke document-release
- Weekly retro → invoke retro
- Design system, brand → invoke design-consultation
- Visual audit, design polish → invoke design-review
- Architecture review → invoke plan-eng-review
- Save progress, checkpoint, resume → invoke checkpoint
- Code quality, health check → invoke health
