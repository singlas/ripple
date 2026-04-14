import { GameState, Choice } from "./types";

const METER_START = 50;
const THRESHOLD = 15;

export function createInitialState(firstRoundId: string): GameState {
  return {
    trustMeter: METER_START,
    currentRoundId: firstRoundId,
    isEnded: false,
    isBroken: false,
    choiceHistory: [],
  };
}

export function applyChoice(state: GameState, choice: Choice): GameState {
  const newMeter = Math.max(0, Math.min(100, state.trustMeter + choice.meterChange));
  const isBroken = state.isBroken || newMeter < THRESHOLD;
  const isEnded = choice.next === "end";

  return {
    trustMeter: newMeter,
    currentRoundId: isEnded ? null : choice.next,
    isEnded,
    isBroken,
    choiceHistory: [...state.choiceHistory, choice.id],
  };
}
