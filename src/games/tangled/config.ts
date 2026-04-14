import { GameConfig } from "@/engine/types";

const tangledConfig: GameConfig = {
  meterName: "Trust",
  meterStart: 50,
  themeColor: "#6366f1", // indigo
  thresholds: [80, 50, 30], // excellent, good, rocky — below 30 is broken
};

export default tangledConfig;
