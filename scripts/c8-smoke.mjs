import assert from "node:assert/strict";
import { MetricsCalculator } from "../src/core/MetricsCalculator.js";
import { ScenarioRepository } from "../src/core/ScenarioRepository.js";
import { TutorialState } from "../src/core/TutorialState.js";

// @MX:NOTE: c8 tracks this direct ESM path more reliably than Vitest workers on Windows.
const repository = new ScenarioRepository();
const state = new TutorialState({ metricsCalculator: new MetricsCalculator() });

await state.init(await repository.load());
const initialRoutes = state.snapshot.metrics.routes;
state.collectFragment("distance");
assert.equal(state.snapshot.phaseIndex, 2);
assert.ok(state.snapshot.metrics.routes < initialRoutes);

state.collectAll();
state.toggleSafety("sameData");
state.toggleSafety("behavior");
state.toggleSafety("name");
assert.equal(state.snapshot.isComplete, true);

state.setScenario("music");
assert.equal(state.snapshot.selectedScenarioId, "music");
assert.deepEqual(state.snapshot.collectedIds, []);

state.setPhase(1);
assert.equal(state.snapshot.phaseIndex, 1);

state.resetScenario();
assert.equal(state.snapshot.phaseIndex, 0);
