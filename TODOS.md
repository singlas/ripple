# TODOS

## P1 — High Priority

### Add all 4 Tangled chains
- **What:** Transcribe Group Project, The Secret, and The Test scenario data files from the concept doc
- **Why:** Tests the full Tangled experience with cross-chain meter carry — 4x testing signal
- **Effort:** M (human ~1 day / CC ~20 min)
- **Depends on:** Base POC working
- **Context:** Concept doc has all 4 chains fully written. This is pure data entry into the scenario schema. May also want cross-chain flags (engine addition) to unlock conditional dialogue based on prior chains.

## P2 — Medium Priority

### "What if?" teaser on end screen
- **What:** After the ending, show one line: "What if you had chosen differently at [key moment]?" to drive replay
- **Why:** Transforms "I should try again" into "I NEED to know what would have happened"
- **Effort:** S (human ~2h / CC ~10 min)
- **Depends on:** Base POC
- **Context:** Requires tracking which choice had the largest meter impact. Show that choice's alternative path teaser.

### Shareable story link
- **What:** Encode player's choice sequence in URL params. Add a /story/[path] page that renders the story summary
- **Why:** Creates viral testing loop — kid shares link, friend wants to play and make different choices
- **Effort:** S (human ~3h / CC ~15 min)
- **Depends on:** Base POC
- **Context:** For 1 chain (4 rounds), the choice sequence is short enough for URL params. For 4 chains, may need a hash/encoding scheme.

## P3 — Nice to Have

### Mood shift (background color)
- **What:** Background color subtly transitions from warm (golden/amber) to cool (blue-gray) as trust drops
- **Why:** Makes the gut punch land harder through atmosphere, no visual assets needed
- **Effort:** S (human ~2h / CC ~5 min)
- **Depends on:** Base POC
- **Context:** Tailwind class swap based on meter tier. Needs taste — wrong colors feel cheesy.

### Story timeline visualization
- **What:** After game ends, show a visual branching tree with the player's path highlighted and roads not taken grayed out
- **Why:** Makes "The Ripple" thesis visible — every choice created branches you can literally see
- **Effort:** M (human ~2 days / CC ~30 min)
- **Depends on:** Base POC
- **Context:** SVG or CSS-based tree rendering. Fiddly on mobile. Most iconic potential feature but also most complex.
