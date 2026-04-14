import { describe, it, expect } from "vitest";
import { tangledChains } from "@/games/tangled/scenarios";
import { Scenario, Round } from "@/engine/types";

function getAllPaths(
  scenario: Scenario,
  roundId: string,
  depth: number = 0,
): number[] {
  if (roundId === "end") return [depth];
  const round = scenario.rounds[roundId];
  if (!round) throw new Error(`Missing round: ${roundId} in ${scenario.id}`);
  return round.choices.flatMap((c) => getAllPaths(scenario, c.next, depth + 1));
}

function getAllReachableRoundIds(
  scenario: Scenario,
  roundId: string,
  visited: Set<string> = new Set(),
): Set<string> {
  if (roundId === "end" || visited.has(roundId)) return visited;
  visited.add(roundId);
  const round = scenario.rounds[roundId];
  if (!round) throw new Error(`Missing round: ${roundId} in ${scenario.id}`);
  for (const choice of round.choices) {
    getAllReachableRoundIds(scenario, choice.next, visited);
  }
  return visited;
}

describe("scenario structural validation", () => {
  it("has exactly 4 chains", () => {
    expect(tangledChains).toHaveLength(4);
  });

  it.each(tangledChains.map((c) => [c.id, c]))(
    "%s: firstRoundId exists in rounds",
    (_id, scenario) => {
      expect(scenario.rounds[scenario.firstRoundId]).toBeDefined();
    },
  );

  it.each(tangledChains.map((c) => [c.id, c]))(
    "%s: every round has exactly 2 choices",
    (_id, scenario) => {
      for (const [roundId, round] of Object.entries(scenario.rounds)) {
        expect(round.choices).toHaveLength(2);
      }
    },
  );

  it.each(tangledChains.map((c) => [c.id, c]))(
    "%s: all choice next pointers are valid",
    (_id, scenario) => {
      for (const round of Object.values(scenario.rounds)) {
        for (const choice of round.choices) {
          if (choice.next !== "end") {
            expect(
              scenario.rounds[choice.next],
              `Missing round "${choice.next}" referenced by choice "${choice.id}" in round "${round.id}"`,
            ).toBeDefined();
          }
        }
      }
    },
  );

  it.each(tangledChains.map((c) => [c.id, c]))(
    "%s: no orphaned rounds (all rounds reachable from firstRoundId)",
    (_id, scenario) => {
      const reachable = getAllReachableRoundIds(
        scenario,
        scenario.firstRoundId,
      );
      const allRoundIds = Object.keys(scenario.rounds);
      const orphaned = allRoundIds.filter((id) => !reachable.has(id));
      expect(
        orphaned,
        `Orphaned rounds: ${orphaned.join(", ")}`,
      ).toEqual([]);
    },
  );

  it.each(tangledChains.map((c) => [c.id, c]))(
    "%s: all paths are 6 rounds long",
    (_id, scenario) => {
      const pathLengths = getAllPaths(scenario, scenario.firstRoundId);
      for (const len of pathLengths) {
        expect(len, `Found path of length ${len}, expected 6`).toBe(6);
      }
    },
  );

  it.each(tangledChains.map((c) => [c.id, c]))(
    "%s: every choice has a journal entry",
    (_id, scenario) => {
      for (const round of Object.values(scenario.rounds)) {
        for (const choice of round.choices) {
          expect(
            choice.journal,
            `Choice "${choice.id}" in round "${round.id}" missing journal`,
          ).toBeTruthy();
        }
      }
    },
  );

  it("no duplicate choice IDs across all chains", () => {
    const allIds = new Set<string>();
    for (const scenario of tangledChains) {
      for (const round of Object.values(scenario.rounds)) {
        for (const choice of round.choices) {
          expect(
            allIds.has(choice.id),
            `Duplicate choice ID: ${choice.id}`,
          ).toBe(false);
          allIds.add(choice.id);
        }
      }
    }
  });
});
