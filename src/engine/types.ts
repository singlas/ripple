export type Choice = {
  id: string;
  text: string;
  meterChange: number;
  journal?: string;
  next: string; // round ID, or "end" to trigger ending screen
};

export type Round = {
  id: string;
  prompt: string;
  choices: Choice[];
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
};

export type EndState = {
  title: string;
  message: string;
  tier: "excellent" | "good" | "rocky" | "broken";
};

export type GameState = {
  trustMeter: number;
  currentRoundId: string | null;
  isEnded: boolean;
  isBroken: boolean;
  choiceHistory: string[];
};
