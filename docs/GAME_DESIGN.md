# The Ripple — Game Design

A choice-based story game series for ages 8-12. Every choice creates ripples. Good choices open doors. Bad choices narrow the path. Doubling down makes things worse. But owning up — even late — can start recovery.

---

## Concept

- **Series name:** The Ripple
- **Player:** a kid, 8-12 years old, navigating everyday social situations
- **Format:** interactive web-based branching narrative games
- **Core idea:** choices compound — they build on each other, for better or worse
- **Structure:** an umbrella brand for multiple games, each exploring one core value through everyday scenarios
- **Platform:** mobile-first web app

---

## Glossary

| Term | Definition |
|---|---|
| **Game** | A complete story exploring one core value. Has a title, a themed meter, and 4 scenario chains. |
| **Scenario chain** | A self-contained episode within a game. 3-4 decision rounds deep. The meter carries across chains. |
| **Round** | One decision point within a chain. Shows a situation and offers 2-3 choices. |
| **Choice** | One option within a round. Has a meter change, a journal entry, flags, and a next-round pointer. |
| **Meter** | A 0-100 gauge themed per game (Trust, Courage, Empathy, etc.). Starts at 50. Moves based on choices. |
| **Threshold** | The meter value (15) below which certain consequences become permanent. |
| **Journal** | An append-only record of what happened, written in plain language after each choice. |
| **Flag** | A named boolean set by a choice. Later chains can check flags to unlock or block options. |
| **Recovery window** | The choice immediately after a bad decision that lets the player come clean. Taking it stops the bleeding; ignoring it makes the next recovery harder. |
| **End state** | The final summary screen, determined by the meter value at the end of all chains. |

---

## Planned games

| Game | Theme | Core Meter | Tagline |
|------|-------|------------|---------|
| Tangled | Trust & Honesty | Trust Meter | "The truth is simple. Lies get tangled." |
| The Invisible Thread | Gratitude | Connection Meter | "Can you see what's always been there?" |
| The Loud Silence | Courage & Standing Up | Courage Meter | "Saying nothing is still a choice." |
| In Their Shoes | Kindness & Empathy | Empathy Meter | "What if it were you?" |
| The Slow Burn | Patience & Self-Control | Cool Meter | "Not every fire needs fuel." |
| The Last Slice | Sharing & Generosity | Generosity Meter | "What you give away, you keep." |
| The Second Chance | Forgiveness | Heart Meter | "Holding on hurts you most." |
| The Buck Stops Here | Responsibility | Ownership Meter | "Your mess, your move." |

---

## The Meter (0-100)

Each game has a themed meter that starts at 50 and moves based on choices.

| Range | Label | Effect |
|-------|-------|--------|
| 80-100 | Excellent | Bonus options unlock, NPCs are warm and supportive |
| 50-79 | Okay | Standard options, normal NPC behavior |
| 30-49 | Shaky | Fewer good options, NPCs are wary, recovery is harder |
| 15-29 | Critical | Damage starts becoming permanent, some relationships break |
| 0-14 | Broken | Point of no return for some storylines |

---

## The Compounding Rule

This is the heart of the game. Choices don't exist in isolation — they build on each other.

### Compounding downward

A single bad choice costs maybe -5 on the meter. But if the next choice doubles down, the penalty is -12, not -5. A third escalation might be -20. The cost accelerates because the situation gets more tangled.

### Recovery windows

After a bad choice, the very next decision usually includes a "come clean" or "own up" option. Taking it costs something (embarrassment, a small penalty) but stops the bleeding and opens a recovery path. Ignoring the recovery window makes the next recovery harder and more expensive.

### Compounding upward

Good choices also compound. Being honest once is +5. Being honest in a harder situation after that is +8. Consistently good choices unlock bonus scenarios — moments where built-up goodwill pays off in unexpected ways.

### Recovery multiplier

Consecutive bad choices increase the penalty multiplier: 1x -> 1.5x -> 2x -> 2.5x. A good choice resets the multiplier to 1x.

---

## The Threshold

When the meter drops below 15, certain consequences become permanent for that storyline. A friendship might break. A teacher might stop trusting the player entirely. The game continues, but some damage can't be undone.

The game is honest about this. When it happens, the narrative says something like: *"Riya doesn't want to talk to you anymore. Some things, once broken, stay broken."* This isn't punitive — it's a real lesson delivered gently.

---

## Choice design

Every decision point offers 2-3 options. They are NOT labeled good/bad. Instead, they're written as things a kid might genuinely consider:

- The honest/brave option (clearly right but uncomfortable)
- The avoidant/neutral option (not terrible, but doesn't fix things)
- The selfish/dishonest option (easier in the moment but costly later)

Subtle color hints (warm green, amber, soft red) can guide younger players, but the choices should be written clearly enough that kids can feel the weight of each option on their own.

---

## The Journal

As the player progresses, the journal records what happened in plain language:

> "You told Mrs. Sharma that Riya broke the phone. But Riya wasn't even near the table. Now Riya is upset, and Mrs. Sharma isn't sure who to believe."

At the end, the player can read their full story. This is powerful for replay — they can compare journals from different runs and see how different choices led to different stories.

The journal is append-only. Every choice adds an entry, creating a complete narrative of the playthrough.

---

## End states

Each game ends with a summary based on the final meter value. There are 4 tiers:

| Tier | Meter | Label | Message |
|------|-------|-------|---------|
| 1 | 80+ | Excellent | "Your choices built something real." |
| 2 | 50-79 | Good | "You stumbled, but you got back up. That's what matters." |
| 3 | 30-49 | Rocky | "It's not too late — but it's getting harder. What will you choose tomorrow?" |
| 4 | Below 30 | Broken | "Some ripples can't be taken back. But every day is a new stone to throw." |

All endings include a "Play Again?" option and a prompt: *"What would you do differently?"*

No "game over." Even the worst ending is not a failure — it's a mirror. The game says "this is what happened" and asks "what would you do differently?"

---

## Scenario chain structure

Each game has 4 scenario chains, played in sequence. Each chain is 3-4 decision rounds deep. The meter carries across all chains, so early choices affect late-game options.

Flags are cumulative — scenarios can check flags from earlier chains (e.g., "if ownedUp in broken-phone, unlock bonus dialogue in the-secret").

---

## Design principles

- Warm, not preachy. The game never lectures. It shows consequences through story. The player feels the impact of their choices rather than being told they were wrong.
- No "game over." Even the worst ending is a mirror, not a punishment.
- Replayability is the lesson. The most powerful moment is when a kid plays again and makes a different choice, and sees how the whole story changes. That's the ripple.
- Choices are never labeled good or bad — but they lead to meaningfully different consequences.
- The compounding rule makes sequences of choices matter more than any single choice.
- Recovery windows always exist — owning up is always an option, even when it's expensive.
- The threshold teaches that some damage is permanent — gently, not punitively.
- The journal turns a playthrough into a story the player owns.
- Culturally grounded. Names, settings, and scenarios should feel familiar to Indian kids but universal enough for anyone.
- All text is written for an 8-12 year old. Simple words, short sentences. No metaphors, no figurative language, no therapy vocabulary.
