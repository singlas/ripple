import { GameState, GameConfig, Choice, Scenario } from "./types";

const BROKEN_THRESHOLD = 15;
const MAX_MULTIPLIER = 2.5;

export function createInitialState(
  config: GameConfig,
  firstRoundId: string,
): GameState {
  return {
    meter: config.meterStart,
    currentRoundId: firstRoundId,
    currentChainIndex: 0,
    isEnded: false,
    isBroken: false,
    choiceHistory: [],
    journalEntries: [],
    flags: {},
    badStreak: 0,
  };
}

export function getMultiplier(badStreak: number): number {
  if (badStreak <= 0) return 1;
  return Math.min(1 + badStreak * 0.5, MAX_MULTIPLIER);
}

export function applyChoice(state: GameState, choice: Choice): GameState {
  const isNegative = choice.meterChange < 0;
  const multiplier = isNegative ? getMultiplier(state.badStreak) : 1;
  const adjustedChange = Math.round(choice.meterChange * multiplier);
  const newMeter = Math.max(0, Math.min(100, state.meter + adjustedChange));
  const isBroken = state.isBroken || newMeter < BROKEN_THRESHOLD;
  const chainEnded = choice.next === "end";
  const newBadStreak = isNegative ? state.badStreak + 1 : 0;

  const journalEntries = choice.journal
    ? [...state.journalEntries, choice.journal]
    : [...state.journalEntries];

  const flags = choice.flags
    ? { ...state.flags, ...choice.flags }
    : state.flags;

  return {
    meter: newMeter,
    currentRoundId: chainEnded ? null : choice.next,
    currentChainIndex: state.currentChainIndex,
    isEnded: false, // chain ended != game ended — advanceChain handles that
    isBroken,
    choiceHistory: [...state.choiceHistory, choice.id],
    journalEntries,
    flags,
    badStreak: newBadStreak,
  };
}

export function advanceChain(
  state: GameState,
  chains: Scenario[],
): GameState {
  const nextIndex = state.currentChainIndex + 1;

  if (nextIndex >= chains.length) {
    return { ...state, isEnded: true, currentRoundId: null };
  }

  const nextChain = chains[nextIndex];
  return {
    ...state,
    currentChainIndex: nextIndex,
    currentRoundId: nextChain.firstRoundId,
  };
}
