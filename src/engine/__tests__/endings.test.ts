import { describe, it, expect } from "vitest";
import { getEnding } from "@/engine/endings";
import { GameConfig } from "@/engine/types";

const config: GameConfig = {
  meterName: "Trust",
  meterStart: 50,
  themeColor: "#6366f1",
  thresholds: [80, 50, 30],
};

describe("getEnding", () => {
  it("returns excellent tier for meter >= 80", () => {
    const ending = getEnding(80, config);
    expect(ending.tier).toBe("excellent");
    expect(ending.title).toBe("Trusted Friend");
  });

  it("returns excellent tier for meter = 100", () => {
    const ending = getEnding(100, config);
    expect(ending.tier).toBe("excellent");
  });

  it("returns good tier for meter 50-79", () => {
    expect(getEnding(50, config).tier).toBe("good");
    expect(getEnding(79, config).tier).toBe("good");
  });

  it("returns rocky tier for meter 30-49", () => {
    expect(getEnding(30, config).tier).toBe("rocky");
    expect(getEnding(49, config).tier).toBe("rocky");
  });

  it("returns broken tier for meter < 30", () => {
    expect(getEnding(29, config).tier).toBe("broken");
    expect(getEnding(0, config).tier).toBe("broken");
  });

  it("uses custom thresholds", () => {
    const custom: GameConfig = {
      ...config,
      thresholds: [90, 60, 40],
    };
    expect(getEnding(85, custom).tier).toBe("good");
    expect(getEnding(90, custom).tier).toBe("excellent");
    expect(getEnding(35, custom).tier).toBe("broken");
  });
});
