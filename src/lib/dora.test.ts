import { describe, expect, it } from "vitest";
import { changeFailureRate, deploymentFrequency, type Deployment } from "./dora";

const deploys: Deployment[] = [
  { createdAt: new Date("2026-10-01"), status: "success" },
  { createdAt: new Date("2026-10-02"), status: "success" },
  { createdAt: new Date("2026-10-03"), status: "failure" },
  { createdAt: new Date("2026-10-04"), status: "success" },
];

describe("deploymentFrequency", () => {
  it("counts successful deploys per day", () => {
    expect(deploymentFrequency(deploys, 3)).toBe(1);
  });
  it("rejects a non-positive window", () => {
    expect(() => deploymentFrequency(deploys, 0)).toThrow();
  });
});

describe("changeFailureRate", () => {
  it("returns the failed share", () => {
    expect(changeFailureRate(deploys)).toBe(0.25);
  });
  it("returns 0 with no deploys", () => {
    expect(changeFailureRate([])).toBe(0);
  });
});
