import { describe, it, expect } from "vitest";
import {
  createInitialState,
  applyChoice,
  advanceChain,
  getMultiplier,
} from "@/engine/state";
import { GameConfig, Choice, Scenario, GameState } from "@/engine/types";

const config: GameConfig = {
  meterName: "Trust",
  meterStart: 50,
  themeColor: "#6366f1",
  thresholds: [80, 50, 30],
};

function makeChoice(overrides: Partial<Choice> = {}): Choice {
  return {
    id: "test-choice",
    text: "Test choice",
    meterChange: 0,
    next: "next-round",
    ...overrides,
  };
}

function makeScenario(id: string, firstRoundId: string): Scenario {
  return {
    id,
    title: `Scenario ${id}`,
    setup: "Test setup",
    firstRoundId,
    rounds: {
      [firstRoundId]: {
        id: firstRoundId,
        prompt: "Test prompt",
        choices: [
          makeChoice({ id: "a", next: "end" }),
          makeChoice({ id: "b", next: "end" }),
        ],
      },
    },
  };
}

describe("createInitialState", () => {
  it("creates state with config meterStart", () => {
    const state = createInitialState(config, "round-1");
    expect(state.meter).toBe(50);
    expect(state.currentRoundId).toBe("round-1");
    expect(state.currentChainIndex).toBe(0);
    expect(state.isEnded).toBe(false);
    expect(state.isBroken).toBe(false);
    expect(state.choiceHistory).toEqual([]);
    expect(state.journalEntries).toEqual([]);
    expect(state.flags).toEqual({});
    expect(state.badStreak).toBe(0);
  });

  it("uses custom meterStart", () => {
    const custom = { ...config, meterStart: 75 };
    const state = createInitialState(custom, "r1");
    expect(state.meter).toBe(75);
  });
});

describe("applyChoice", () => {
  it("applies positive meter change", () => {
    const state = createInitialState(config, "r1");
    const choice = makeChoice({ meterChange: 8, next: "r2" });
    const next = applyChoice(state, choice);
    expect(next.meter).toBe(58);
    expect(next.currentRoundId).toBe("r2");
    expect(next.badStreak).toBe(0);
  });

  it("applies negative meter change", () => {
    const state = createInitialState(config, "r1");
    const choice = makeChoice({ meterChange: -5, next: "r2" });
    const next = applyChoice(state, choice);
    expect(next.meter).toBe(45);
    expect(next.badStreak).toBe(1);
  });

  it("clamps meter to 0", () => {
    const state = createInitialState(config, "r1");
    const choice = makeChoice({ meterChange: -100, next: "r2" });
    const next = applyChoice(state, choice);
    expect(next.meter).toBe(0);
  });

  it("clamps meter to 100", () => {
    const state = createInitialState(config, "r1");
    const choice = makeChoice({ meterChange: 100, next: "r2" });
    const next = applyChoice(state, choice);
    expect(next.meter).toBe(100);
  });

  it("sets isBroken when meter drops below 15", () => {
    const state = createInitialState(config, "r1");
    const choice = makeChoice({ meterChange: -40, next: "r2" });
    const next = applyChoice(state, choice);
    expect(next.meter).toBe(10);
    expect(next.isBroken).toBe(true);
  });

  it("isBroken stays true once set", () => {
    let state = createInitialState(config, "r1");
    state = applyChoice(state, makeChoice({ meterChange: -40, next: "r2" }));
    expect(state.isBroken).toBe(true);
    state = applyChoice(state, makeChoice({ meterChange: 50, next: "r3" }));
    expect(state.isBroken).toBe(true);
    expect(state.meter).toBe(60);
  });

  it("sets currentRoundId to null when next is 'end'", () => {
    const state = createInitialState(config, "r1");
    const choice = makeChoice({ next: "end" });
    const next = applyChoice(state, choice);
    expect(next.currentRoundId).toBeNull();
    expect(next.isEnded).toBe(false); // chain ended, not game
  });

  it("appends journal entry", () => {
    const state = createInitialState(config, "r1");
    const choice = makeChoice({ journal: "Something happened", next: "r2" });
    const next = applyChoice(state, choice);
    expect(next.journalEntries).toEqual(["Something happened"]);
  });

  it("skips journal if not provided", () => {
    const state = createInitialState(config, "r1");
    const choice = makeChoice({ next: "r2" });
    const next = applyChoice(state, choice);
    expect(next.journalEntries).toEqual([]);
  });

  it("merges flags", () => {
    const state = createInitialState(config, "r1");
    const choice = makeChoice({
      flags: { ownedUp: true },
      next: "r2",
    });
    const next = applyChoice(state, choice);
    expect(next.flags).toEqual({ ownedUp: true });
  });

  it("appends choice id to history", () => {
    const state = createInitialState(config, "r1");
    const choice = makeChoice({ id: "my-choice", next: "r2" });
    const next = applyChoice(state, choice);
    expect(next.choiceHistory).toEqual(["my-choice"]);
  });
});

describe("compounding multiplier", () => {
  it("returns 1x for 0 bad streak", () => {
    expect(getMultiplier(0)).toBe(1);
  });

  it("returns 1.5x for 1 bad streak", () => {
    expect(getMultiplier(1)).toBe(1.5);
  });

  it("returns 2x for 2 bad streak", () => {
    expect(getMultiplier(2)).toBe(2);
  });

  it("caps at 2.5x", () => {
    expect(getMultiplier(3)).toBe(2.5);
    expect(getMultiplier(10)).toBe(2.5);
  });

  it("applies multiplier to negative meter changes", () => {
    let state = createInitialState(config, "r1");
    // First bad: -5 * 1x = -5 → 45
    state = applyChoice(state, makeChoice({ meterChange: -5, next: "r2" }));
    expect(state.meter).toBe(45);
    expect(state.badStreak).toBe(1);

    // Second bad: -5 * 1.5x = -7.5 → round → -7 → 38
    state = applyChoice(state, makeChoice({ meterChange: -5, next: "r3" }));
    expect(state.meter).toBe(38);
    expect(state.badStreak).toBe(2);

    // Third bad: -5 * 2x = -10 → 28
    state = applyChoice(state, makeChoice({ meterChange: -5, next: "r4" }));
    expect(state.meter).toBe(28);
    expect(state.badStreak).toBe(3);
  });

  it("resets bad streak on positive choice", () => {
    let state = createInitialState(config, "r1");
    state = applyChoice(state, makeChoice({ meterChange: -5, next: "r2" }));
    expect(state.badStreak).toBe(1);
    state = applyChoice(state, makeChoice({ meterChange: 3, next: "r3" }));
    expect(state.badStreak).toBe(0);
  });

  it("does not apply multiplier to positive changes", () => {
    let state: GameState = {
      ...createInitialState(config, "r1"),
      badStreak: 3,
    };
    // +5 should NOT be multiplied even with badStreak=3
    state = applyChoice(state, makeChoice({ meterChange: 5, next: "r2" }));
    expect(state.meter).toBe(55);
  });
});

describe("advanceChain", () => {
  it("advances to next chain", () => {
    const chains = [
      makeScenario("chain-1", "c1-r1"),
      makeScenario("chain-2", "c2-r1"),
    ];
    const state: GameState = {
      ...createInitialState(config, "c1-r1"),
      currentRoundId: null,
    };
    const next = advanceChain(state, chains);
    expect(next.currentChainIndex).toBe(1);
    expect(next.currentRoundId).toBe("c2-r1");
    expect(next.isEnded).toBe(false);
  });

  it("ends game when no more chains", () => {
    const chains = [makeScenario("chain-1", "c1-r1")];
    const state: GameState = {
      ...createInitialState(config, "c1-r1"),
      currentRoundId: null,
    };
    const next = advanceChain(state, chains);
    expect(next.isEnded).toBe(true);
    expect(next.currentRoundId).toBeNull();
  });

  it("preserves meter and flags across chains", () => {
    const chains = [
      makeScenario("chain-1", "c1-r1"),
      makeScenario("chain-2", "c2-r1"),
    ];
    const state: GameState = {
      ...createInitialState(config, "c1-r1"),
      meter: 42,
      flags: { ownedUp: true },
      journalEntries: ["entry1"],
      currentRoundId: null,
    };
    const next = advanceChain(state, chains);
    expect(next.meter).toBe(42);
    expect(next.flags).toEqual({ ownedUp: true });
    expect(next.journalEntries).toEqual(["entry1"]);
  });
});
