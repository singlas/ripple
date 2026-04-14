# The Ripple — Writing Guide

How to write a game: the craft principles, scenario chain rules, pre-writing process, and data format.

---

## Craft principles

These are the rules that distinguish good scenario writing from content that just fills the format.

### 1. Start with the value, then build situations that test it

Before writing any choices, define the core value and find 4 everyday situations where a kid would genuinely face it. The situations should escalate naturally — chain 1 is low stakes, chain 4 is high stakes.

### 2. Choices must feel real

Every option should be something a kid might genuinely consider. The "bad" choice should be tempting — easier, more comfortable, more immediately rewarding. If no kid would pick it, rewrite it.

### 3. The honest option should cost something

The right choice is never free. It should involve discomfort, embarrassment, or giving something up. If the honest option is obviously the best move with no downside, the choice isn't interesting.

### 4. Doubling down must feel like a trap tightening

When the player makes a bad choice and then doubles down, the narration should make the situation feel increasingly tangled. The player should feel the walls closing in — not through punishment, but through the logic of the situation getting worse.

### 5. Recovery windows must feel like genuine relief

The "come clean" option after a bad choice should feel like a weight lifting. The penalty is real but small. The narrative relief is immediate. This teaches that owning up is always worth it.

### 6. Journal entries are stories, not verdicts

Journal entries describe what happened, not whether it was good or bad. They use the player's name. They are specific. A kid should be able to read their journal at the end and see a real story.

- **Wrong:** "You made a bad choice and hurt someone."
- **Right:** "You told Mrs. Sharma that Riya broke the phone. But Riya wasn't even near the table."

### 7. End states describe, never judge

The ending message reflects back what happened. It doesn't say "you failed" or "great job." It says what the choices created, and asks what the player would do differently.

---

## Scenario chain rules

### Structure

- Each game has **4 scenario chains**, played in sequence
- Each chain has **3-4 decision rounds**
- Each round offers **2-3 choices**
- The meter carries across all chains
- Flags set in one chain can affect options in later chains

### Meter changes

- Small good choice: +5 to +8
- Small bad choice: -3 to -5
- Doubled-down bad choice: -10 to -15
- Triple-down: -15 to -20
- Recovery (coming clean): +2 to +5 (partial recovery, net negative from the original bad choice)
- Late recovery: +1 to +3 (harder and less rewarding)

### Branching

Choices within a round point to the next round via `next` IDs. Some rounds only exist on certain paths (e.g., "Round 2 (if blamed Sam)"). The engine follows `next` pointers — rounds without a matching `next` are skipped.

### Flag design

Flags should be named for what the player *did*, not what it means:
- **Good:** `ownedUp`, `blamedSam`, `sharedPhoto`
- **Bad:** `wasHonest`, `madeGoodChoice`

Later chains reference flags with comments explaining the cross-chain connection.

---

## Choice design rules

### The three stances

Every round should offer choices that represent different emotional stances:

| Stance | What it looks like | Typical meter effect |
|---|---|---|
| Honest/brave | Clearly right but uncomfortable | Positive |
| Avoidant/neutral | Not terrible, but doesn't fix things | Mildly negative |
| Selfish/dishonest | Easier in the moment but costly later | Negative |

Not every round needs all three. Some rounds are 2-choice (e.g., the final confrontation: admit or deny).

### Recovery round design

After a bad choice, the next round should include:
- A "come clean" option (partial recovery)
- A "double down" option (escalation, higher penalty)
- Optionally an avoidant option (smaller penalty than doubling down, but no recovery)

### Threshold crossings

When a choice might push the meter below 15, the narrative must:
1. Make the consequence permanent ("Riya doesn't want to talk to you anymore")
2. Acknowledge it's not game over ("The game continues")
3. Be gentle, not punitive

---

## Pre-writing process

Write the brief before writing any scenarios. The brief prevents structural errors from surfacing only at implementation time.

### Step 1 — Core value and meter

Name the value. Name the meter. Write the tagline.

### Step 2 — Four situations

List 4 everyday situations that test the value. They should:
- Be things a kid would actually face
- Escalate in stakes from chain 1 to chain 4
- Share a cast of characters (continuity builds connection)
- Allow cross-chain flag references (something from chain 1 pays off in chain 4)

### Step 3 — End states

Write all 4 end state messages before writing any scenarios. If they don't feel distinct, the game's moral range isn't wide enough.

### Step 4 — Chain 1 in full

Write chain 1 completely — all rounds, all branches, all journal entries, all meter values. This is the calibration chain. If the meter changes feel right here, the rest will follow.

### Step 5 — Remaining chains

Write chains 2-4. After each chain, verify:
- Does the meter math work? (A player making all good choices should end around 80-90, not 100+)
- Are the flags from earlier chains referenced?
- Does the escalation feel natural?
- Are recovery windows present after every bad choice?

---

## Scenario data format

Each scenario chain is a data file, not hardcoded logic. This makes it easy to add new stories without touching the engine.

### File naming

```
games/[game-name]/scenarios/[chain-name].js
```

### Data structure

```javascript
export default {
  id: "chain-id",
  title: "Chain Title",
  setup: "Narrative setup text. 2-3 sentences.",
  rounds: [
    {
      id: "round-id",
      prompt: "Narrative prompt for this decision point.",
      choices: [
        {
          id: "choice-id",
          text: "What the player says or does, in quotes.",
          meterChange: +8,
          journal: "What happened, in plain language.",
          flags: { flagName: true },
          next: "next-round-id"
        }
      ]
    }
  ]
}
```

### Conventions

- Round IDs use the pattern: `[chain-abbrev]-[round-number]` (e.g., `bp-1`, `bp-2-blame`)
- Choice IDs are descriptive: `own-up`, `deflect`, `blame`
- Journal entries are past tense, use "You" for the player
- `next` points to another round ID, or is omitted for chain-ending rounds
- `flags` is optional — only set flags that will be referenced later

---

## Game config format

Each game has a config file that themes the shared engine.

```javascript
export default {
  id: "tangled",
  title: "Tangled",
  theme: "Trust & Honesty",
  meter: {
    name: "Trust Meter",
    start: 50,
    labels: {
      excellent: "Trusted",
      okay: "Okay",
      shaky: "Shaky",
      critical: "Critical",
      broken: "Broken"
    }
  },
  tagline: "The truth is simple. Lies get tangled.",
  scenarios: ["broken-phone", "group-project", "the-secret", "the-test"]
}
```

---

## Character bible

Short profiles for recurring characters. Keep consistent across games.

| Character | Age | Description |
|---|---|---|
| **Alex** | 10 | The player. Well-meaning, sometimes impulsive, learning from every choice. |
| **Riya** | 10 | Loyal and direct. Says what she thinks. Doesn't forgive easily, but respects honesty. |
| **Sam** | 10 | Funny, easily influenced. Follows the crowd but feels bad about it later. |
| **Kabir** | 10 | Quiet, does the work, rarely speaks up. Appreciates being seen. |
| **Priya Ma'am** | ~35 | Class teacher. Fair but firm. Watches more than she says. |

New characters: add a row here before writing their first scenario. One line is enough — what's their default mode, and how does that shift under pressure?
