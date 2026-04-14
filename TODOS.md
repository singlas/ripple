# TODOS

## P0 — Engine rebuild with design pivot (DONE)

- [x] Binary-choice Reigns-style interaction (always 2 choices per round)
- [x] Longer chains (6 rounds per playthrough), all 4 chains of Tangled
- [x] Chain sequencing (play chains 1-4 in order, ending after chain 4)
- [x] Generic `meter` field, config-driven thresholds (80/50/30)
- [x] Compounding multiplier (1x → 2.5x cap)
- [x] Flags (cross-chain consequences)
- [x] Journal entries stored in state, displayed on end screen
- [x] Mid-game isBroken visual signal (crack overlay, "Broken" label)
- [x] Phone frame mockup for desktop
- [x] Chain interstitial between scenarios

## P1 — Tests (DONE)

- [x] Vitest setup with @/ alias config
- [x] Unit tests: state (23), scene (2), endings (7), scenario validation (25)
- [x] 57 total tests, all passing

## P2 — Enhanced end screen

- [ ] "What if?" teaser (largest meter-impact choice shown with alternative)

## P3 — Polish (deferred)

- [ ] Mood shift (background warm → cold as meter drops)
- [ ] Shareable story link (choice sequence in URL params)
- [ ] Story timeline visualization (branching tree with player's path highlighted)
