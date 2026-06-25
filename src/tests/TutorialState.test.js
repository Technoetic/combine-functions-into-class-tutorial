import { describe, expect, it } from "vitest";
import { MetricsCalculator } from "../core/MetricsCalculator.js";
import { ScenarioRepository } from "../core/ScenarioRepository.js";
import { TutorialState } from "../core/TutorialState.js";

const createState = async () => {
  const repository = new ScenarioRepository();
  const state = new TutorialState({ metricsCalculator: new MetricsCalculator() });
  await state.init(await repository.load());
  return state;
};

describe("TutorialState", () => {
  it("reduces scattered routes as fragments are collected", async () => {
    const state = await createState();
    const before = state.snapshot.metrics.routes;

    state.collectFragment("distance");
    state.collectFragment("coupon");

    expect(state.snapshot.metrics.routes).toBeLessThan(before);
    expect(state.snapshot.phaseIndex).toBe(2);
  });

  it("resets collected fragments when the scenario changes", async () => {
    const state = await createState();

    state.collectFragment("distance");
    state.setScenario("music");

    expect(state.snapshot.selectedScenarioId).toBe("music");
    expect(state.snapshot.collectedIds).toEqual([]);
  });

  it("marks the tutorial complete only after fragments and safety checks are done", async () => {
    const state = await createState();

    state.collectAll();
    state.toggleSafety("sameData");
    state.toggleSafety("behavior");
    expect(state.snapshot.isComplete).toBe(false);

    state.toggleSafety("name");
    expect(state.snapshot.isComplete).toBe(true);
    expect(state.snapshot.metrics.confidence).toBeGreaterThan(80);
  });
});
