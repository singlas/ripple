import { describe, it, expect } from "vitest";
import { loadRound } from "@/engine/scene";
import { Scenario } from "@/engine/types";

const scenario: Scenario = {
  id: "test-scenario",
  title: "Test",
  setup: "Test setup",
  firstRoundId: "r1",
  rounds: {
    r1: {
      id: "r1",
      prompt: "What do you do?",
      choices: [
        { id: "a", text: "Option A", meterChange: 5, next: "r2" },
        { id: "b", text: "Option B", meterChange: -5, next: "end" },
      ],
    },
    r2: {
      id: "r2",
      prompt: "What next?",
      choices: [
        { id: "c", text: "Option C", meterChange: 3, next: "end" },
        { id: "d", text: "Option D", meterChange: -3, next: "end" },
      ],
    },
  },
};

describe("loadRound", () => {
  it("returns the correct round", () => {
    const round = loadRound(scenario, "r1");
    expect(round.id).toBe("r1");
    expect(round.prompt).toBe("What do you do?");
    expect(round.choices).toHaveLength(2);
  });

  it("throws for missing round", () => {
    expect(() => loadRound(scenario, "nonexistent")).toThrow(
      'Missing round: "nonexistent" in scenario "test-scenario"'
    );
  });
});
