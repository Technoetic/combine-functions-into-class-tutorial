// @MX:NOTE: EventTarget keeps state changes explicit without a framework.
export class TutorialState extends EventTarget {
  #metricsCalculator;
  #scenarios = [];
  #safetyChecks = [];
  #scenarioId = "";
  #phaseIndex = 0;
  #collected = new Set();
  #safety = new Set();

  constructor({ metricsCalculator }) {
    super();
    this.#metricsCalculator = metricsCalculator;
  }

  async init({ scenarios, safetyChecks }) {
    await Promise.resolve();
    this.#scenarios = scenarios;
    this.#safetyChecks = safetyChecks;
    this.#scenarioId = scenarios.at(0)?.id ?? "";
    this.#emit();
  }

  get snapshot() {
    const scenario = this.#currentScenario();
    const metrics = this.#metricsCalculator.calculate({
      scenario,
      collectedCount: this.#collected.size,
      safetyCount: this.#safety.size,
    });

    return {
      scenarios: this.#scenarios,
      safetyChecks: this.#safetyChecks,
      selectedScenarioId: this.#scenarioId,
      scenario,
      phaseIndex: this.#phaseIndex,
      phase: scenario.phases[this.#phaseIndex],
      collectedIds: [...this.#collected],
      safetyIds: [...this.#safety],
      metrics,
      isComplete:
        this.#collected.size === scenario.fragments.length &&
        this.#safety.size === this.#safetyChecks.length,
    };
  }

  setScenario(id) {
    if (id === this.#scenarioId || !this.#scenarios.some((scenario) => scenario.id === id)) {
      return;
    }

    this.#scenarioId = id;
    this.#phaseIndex = 0;
    this.#collected.clear();
    this.#safety.clear();
    this.#emit();
  }

  setPhase(index) {
    const scenario = this.#currentScenario();
    if (index < 0 || index >= scenario.phases.length || index === this.#phaseIndex) {
      return;
    }

    this.#phaseIndex = index;
    this.#emit();
  }

  collectFragment(id) {
    const scenario = this.#currentScenario();
    if (!scenario.fragments.some((fragment) => fragment.id === id)) {
      return;
    }

    this.#collected.add(id);
    if (this.#collected.size > 0 && this.#phaseIndex < 2) {
      this.#phaseIndex = 2;
    }
    this.#emit();
  }

  collectAll() {
    for (const fragment of this.#currentScenario().fragments) {
      this.#collected.add(fragment.id);
    }
    this.#phaseIndex = 2;
    this.#emit();
  }

  resetScenario() {
    this.#phaseIndex = 0;
    this.#collected.clear();
    this.#safety.clear();
    this.#emit();
  }

  toggleSafety(id) {
    if (!this.#safetyChecks.some((check) => check.id === id)) {
      return;
    }

    if (this.#safety.has(id)) {
      this.#safety.delete(id);
    } else {
      this.#safety.add(id);
    }

    if (this.#safety.size > 0) {
      this.#phaseIndex = 3;
    }
    this.#emit();
  }

  #currentScenario() {
    return (
      this.#scenarios.find((scenario) => scenario.id === this.#scenarioId) ?? this.#scenarios[0]
    );
  }

  #emit() {
    if (!this.#scenarioId) {
      return;
    }

    const event = new Event("statechange");
    event.detail = this.snapshot;
    this.dispatchEvent(event);
  }
}
