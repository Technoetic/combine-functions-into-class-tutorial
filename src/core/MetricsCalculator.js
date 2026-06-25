// @MX:NOTE: Metrics are visual teaching signals, not production analytics.
export class MetricsCalculator {
  calculate({ scenario, collectedCount, safetyCount }) {
    const total = scenario.fragments.length;
    const collectedRatio = total === 0 ? 0 : collectedCount / total;
    const safetyRatio = safetyCount / 3;

    return {
      routes: Math.round(
        this.#mix(scenario.metrics.before.routes, scenario.metrics.after.routes, collectedRatio),
      ),
      duplication: Math.round(
        this.#mix(
          scenario.metrics.before.duplication,
          scenario.metrics.after.duplication,
          collectedRatio,
        ),
      ),
      confidence: Math.round(
        this.#mix(
          scenario.metrics.before.confidence,
          scenario.metrics.after.confidence,
          collectedRatio * 0.75 + safetyRatio * 0.25,
        ),
      ),
      cohesion: Math.round(
        this.#mix(
          scenario.metrics.before.cohesion,
          scenario.metrics.after.cohesion,
          collectedRatio,
        ),
      ),
    };
  }

  #mix(start, end, ratio) {
    return start + (end - start) * Math.min(Math.max(ratio, 0), 1);
  }
}
