import { EndState } from "./types";

export function getEnding(trustMeter: number): EndState {
  if (trustMeter >= 40) {
    return {
      title: "Honest Friend",
      message:
        "You told the truth, even when it was hard. Riya knows she can count on you.",
      tier: "excellent",
    };
  }
  if (trustMeter >= 25) {
    return {
      title: "Work in Progress",
      message:
        "Things got messy, but you\u2019re finding your way back. Trust takes time.",
      tier: "good",
    };
  }
  if (trustMeter >= 15) {
    return {
      title: "Thin Ice",
      message:
        "Riya isn\u2019t sure what to believe anymore. The rope is thin \u2014 but it\u2019s still there.",
      tier: "rocky",
    };
  }
  return {
    title: "Tangled Up",
    message:
      "Riya doesn\u2019t want to talk to you anymore. Some things, once broken, stay broken. But every day is a new chance to be honest.",
    tier: "broken",
  };
}
