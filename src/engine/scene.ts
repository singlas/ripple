import { Scenario, Round } from "./types";

export function loadRound(scenario: Scenario, roundId: string): Round {
  const round = scenario.rounds[roundId];
  if (!round) {
    throw new Error(`Missing round: "${roundId}" in scenario "${scenario.id}"`);
  }
  return round;
}
