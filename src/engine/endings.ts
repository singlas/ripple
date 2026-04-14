import { EndState, GameConfig } from "./types";

export function getEnding(meter: number, config: GameConfig): EndState {
  const [excellent, good, rocky] = config.thresholds;

  if (meter >= excellent) {
    return {
      title: "Trusted Friend",
      message:
        "Trust is built one honest moment at a time. You built something real.",
      tier: "excellent",
    };
  }
  if (meter >= good) {
    return {
      title: "Learning & Growing",
      message:
        "Nobody\u2019s perfect. What matters is that when you stumbled, you chose to get back up. That takes courage too.",
      tier: "good",
    };
  }
  if (meter >= rocky) {
    return {
      title: "Thin Ice",
      message:
        "Trust is like a rope \u2014 every lie cuts a thread. There\u2019s still rope left, but it\u2019s thin. What will you do tomorrow?",
      tier: "rocky",
    };
  }
  return {
    title: "Tangled Up",
    message:
      "When you lie, you don\u2019t just fool others \u2014 you lose yourself in the tangle. But here\u2019s the thing: you can always start telling the truth again. It\u2019s never too late for the first honest word.",
    tier: "broken",
  };
}
