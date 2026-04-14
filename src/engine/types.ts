export type Choice = {
  id: string;
  text: string;
  meterChange: number;
  journal?: string;
  flags?: Record<string, boolean>;
  next: string; // round ID, or "end" to finish the chain
};

export type Round = {
  id: string;
  prompt: string;
  choices: [Choice, Choice]; // always exactly 2 (binary)
  condition?: { flag: string; value: boolean }; // optional flag gate
};

export type Scenario = {
  id: string;
  title: string;
  setup: string;
  firstRoundId: string;
  rounds: Record<string, Round>;
};

export type GameConfig = {
  meterName: string;
  meterStart: number;
  themeColor: string;
  thresholds: [number, number, number]; // [excellent, good, rocky] — below rocky is broken
};

export type EndState = {
  title: string;
  message: string;
  tier: "excellent" | "good" | "rocky" | "broken";
};

export type GameState = {
  meter: number;
  currentRoundId: string | null;
  currentChainIndex: number;
  isEnded: boolean;
  isBroken: boolean;
  choiceHistory: string[];
  journalEntries: string[];
  flags: Record<string, boolean>;
  badStreak: number;
};
