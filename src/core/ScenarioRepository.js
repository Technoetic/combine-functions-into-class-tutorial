import { safetyChecks, scenarioData } from "../data/scenarios.js";

// @MX:NOTE: Repository mimics async loading so the app keeps a realistic init flow.
export class ScenarioRepository {
  async load() {
    await Promise.resolve();

    return {
      scenarios: structuredClone(scenarioData),
      safetyChecks: structuredClone(safetyChecks),
    };
  }
}
