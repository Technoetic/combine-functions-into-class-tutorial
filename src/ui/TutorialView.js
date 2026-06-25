// @MX:NOTE: Rendering uses semantic controls while keeping the tutorial code-free on screen.
export class TutorialView {
  #root;
  #state;
  #flowCanvas;
  #snapshot;

  constructor({ root, state, flowCanvas }) {
    this.#root = root;
    this.#state = state;
    this.#flowCanvas = flowCanvas;
  }

  async init() {
    await Promise.resolve();
    this.#root.innerHTML = this.#template();
    const canvas = this.#root.querySelector("[data-flow-canvas]");
    await this.#flowCanvas.init(canvas);
    await this.#flowCanvas.start();
    this.#bindEvents();
    this.#state.addEventListener("statechange", (event) => this.#render(event.detail));
    this.#render(this.#state.snapshot);
  }

  renderFailure(error) {
    this.#root.textContent = "";
    const failure = document.createElement("main");
    failure.className = "failure";
    failure.textContent = error instanceof Error ? error.message : "튜토리얼을 열 수 없습니다.";
    this.#root.append(failure);
  }

  #template() {
    return `
      <div class="app-shell">
        <header class="topbar">
          <div class="brand-block">
            <p class="eyebrow">Refactoring Tutorial</p>
            <h1>Combine Functions into Class</h1>
            <p class="lead">흩어진 기능 조각을 한곳에 모아 변경을 더 가볍게 만드는 감각을 익힙니다.</p>
          </div>
          <div class="topbar__tools">
            <div class="scenario-tabs" data-scenario-tabs aria-label="대중 앱 사례"></div>
            <div class="progress-pill" data-progress-pill aria-live="polite"></div>
          </div>
        </header>

        <main class="workbench">
          <nav class="lesson-rail" data-phase-list aria-label="학습 단계"></nav>

          <section class="stage-panel" aria-labelledby="stage-title">
            <div class="stage-copy">
              <p class="eyebrow" data-before-label></p>
              <h2 id="stage-title" data-stage-title></h2>
              <p data-stage-note></p>
            </div>
            <div class="stage-map" data-stage-map>
              <canvas class="flow-canvas" data-flow-canvas aria-hidden="true"></canvas>
              <div class="fragment-field" data-fragment-field></div>
              <div
                class="stage-center"
                data-drop-zone
                data-flow-hub
                tabindex="0"
                aria-label="기능 센터"
              >
                <span class="center-kicker">Class</span>
                <strong data-center-name></strong>
                <span data-center-count></span>
                <div class="center-tokens" data-center-tokens></div>
              </div>
            </div>
            <div class="stage-actions">
              <button class="command-button" type="button" data-action="collect-all">모으기</button>
              <button class="icon-button" type="button" data-action="reset" aria-label="처음으로">↺</button>
            </div>
          </section>

          <aside class="insight-panel" aria-label="관찰 패널">
            <section class="insight-block">
              <p class="eyebrow">오늘의 감각</p>
              <h2 data-scenario-title></h2>
              <p data-scenario-summary></p>
            </section>
            <section class="insight-block metrics-block" data-metrics></section>
            <section class="insight-block">
              <p class="eyebrow">안전 체크</p>
              <div class="safety-list" data-safety-list></div>
            </section>
            <section class="insight-block result-block" data-result-block></section>
          </aside>
        </main>
      </div>
    `;
  }

  #bindEvents() {
    this.#root.addEventListener("click", (event) => {
      const target = event.target.closest("button");
      if (!target) {
        return;
      }

      if (target.matches("[data-scenario-id]")) {
        this.#state.setScenario(target.dataset.scenarioId);
      }

      if (target.matches("[data-phase-index]")) {
        this.#state.setPhase(Number(target.dataset.phaseIndex));
      }

      if (target.matches("[data-fragment-id]")) {
        this.#state.collectFragment(target.dataset.fragmentId);
      }

      if (target.dataset.action === "collect-all") {
        this.#state.collectAll();
      }

      if (target.dataset.action === "reset") {
        this.#state.resetScenario();
      }
    });

    this.#root.addEventListener("change", (event) => {
      if (event.target.matches("[data-safety-id]")) {
        this.#state.toggleSafety(event.target.dataset.safetyId);
      }
    });

    this.#root.addEventListener("dragstart", (event) => {
      const button = event.target.closest("[data-fragment-id]");
      if (button) {
        event.dataTransfer.setData("text/plain", button.dataset.fragmentId);
      }
    });

    const dropZone = this.#root.querySelector("[data-drop-zone]");
    dropZone.addEventListener("dragover", (event) => {
      event.preventDefault();
    });
    dropZone.addEventListener("drop", (event) => {
      event.preventDefault();
      this.#state.collectFragment(event.dataTransfer.getData("text/plain"));
    });

    window.addEventListener("resize", () => this.#flowCanvas.resize(), { passive: true });
  }

  #render(snapshot) {
    this.#snapshot = snapshot;
    this.#renderScenarioTabs();
    this.#renderPhases();
    this.#renderStage();
    this.#renderMetrics();
    this.#renderSafety();
    this.#renderResult();
    this.#flowCanvas.resize();
  }

  #renderScenarioTabs() {
    const container = this.#root.querySelector("[data-scenario-tabs]");
    container.textContent = "";

    for (const scenario of this.#snapshot.scenarios) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "tab-button";
      button.dataset.scenarioId = scenario.id;
      button.setAttribute(
        "aria-pressed",
        String(scenario.id === this.#snapshot.selectedScenarioId),
      );
      button.textContent = scenario.label;
      container.append(button);
    }
  }

  #renderPhases() {
    const container = this.#root.querySelector("[data-phase-list]");
    container.textContent = "";

    this.#snapshot.scenario.phases.forEach((phase, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "phase-button";
      button.dataset.phaseIndex = String(index);
      button.setAttribute("aria-current", index === this.#snapshot.phaseIndex ? "step" : "false");
      button.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong></strong><em></em>`;
      button.querySelector("strong").textContent = phase.label;
      button.querySelector("em").textContent = phase.title;
      container.append(button);
    });
  }

  #renderStage() {
    const scenario = this.#snapshot.scenario;
    const collected = new Set(this.#snapshot.collectedIds);
    this.#root.querySelector("[data-before-label]").textContent =
      collected.size === scenario.fragments.length ? scenario.afterLabel : scenario.beforeLabel;
    this.#root.querySelector("[data-stage-title]").textContent = this.#snapshot.phase.title;
    this.#root.querySelector("[data-stage-note]").textContent = this.#snapshot.phase.note;
    this.#root.querySelector("[data-center-name]").textContent = scenario.objectName;
    this.#root.querySelector("[data-center-count]").textContent =
      `${collected.size}/${scenario.fragments.length} 조각`;
    this.#root.querySelector("[data-scenario-title]").textContent = scenario.title;
    this.#root.querySelector("[data-scenario-summary]").textContent = scenario.summary;
    this.#root.querySelector("[data-progress-pill]").textContent = this.#snapshot.isComplete
      ? "완료"
      : `${Math.round((collected.size / scenario.fragments.length) * 100)}%`;

    this.#renderFragments(collected);
    this.#renderCenterTokens(collected);
  }

  #renderFragments(collected) {
    const container = this.#root.querySelector("[data-fragment-field]");
    container.textContent = "";

    for (const fragment of this.#snapshot.scenario.fragments) {
      const button = document.createElement("button");
      button.type = "button";
      button.draggable = true;
      button.className = `fragment-chip slot-${fragment.slot}`;
      button.dataset.fragmentId = fragment.id;
      button.dataset.flowNode = "";
      button.dataset.collected = String(collected.has(fragment.id));
      button.disabled = collected.has(fragment.id);

      const label = document.createElement("strong");
      label.textContent = fragment.label;
      const detail = document.createElement("span");
      detail.textContent = fragment.detail;
      button.append(label, detail);
      container.append(button);
    }
  }

  #renderCenterTokens(collected) {
    const container = this.#root.querySelector("[data-center-tokens]");
    container.textContent = "";

    for (const fragment of this.#snapshot.scenario.fragments.filter((item) =>
      collected.has(item.id),
    )) {
      const token = document.createElement("span");
      token.className = "center-token";
      token.dataset.flowNode = "";
      token.dataset.collected = "true";
      token.textContent = fragment.label;
      container.append(token);
    }
  }

  #renderMetrics() {
    const container = this.#root.querySelector("[data-metrics]");
    const metrics = [
      {
        label: "수정 경로",
        value: this.#snapshot.metrics.routes,
        max: 10,
        suffix: "곳",
        invert: true,
      },
      {
        label: "중복 판단",
        value: this.#snapshot.metrics.duplication,
        max: 100,
        suffix: "%",
        invert: true,
      },
      {
        label: "확신",
        value: this.#snapshot.metrics.confidence,
        max: 100,
        suffix: "%",
        invert: false,
      },
      {
        label: "응집감",
        value: this.#snapshot.metrics.cohesion,
        max: 100,
        suffix: "%",
        invert: false,
      },
    ];
    container.textContent = "";

    for (const metric of metrics) {
      const row = document.createElement("div");
      row.className = "metric-row";

      const label = document.createElement("span");
      label.textContent = metric.label;
      const value = document.createElement("strong");
      value.textContent = `${metric.value}${metric.suffix}`;
      const bar = document.createElement("span");
      bar.className = metric.invert ? "metric-bar is-inverted" : "metric-bar";
      bar.style.setProperty("--meter-value", `${Math.round((metric.value / metric.max) * 100)}%`);
      bar.append(document.createElement("i"));
      row.append(label, value, bar);
      container.append(row);
    }
  }

  #renderSafety() {
    const container = this.#root.querySelector("[data-safety-list]");
    const selected = new Set(this.#snapshot.safetyIds);
    container.textContent = "";

    for (const check of this.#snapshot.safetyChecks) {
      const label = document.createElement("label");
      label.className = "safety-toggle";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.dataset.safetyId = check.id;
      input.checked = selected.has(check.id);
      const span = document.createElement("span");
      span.textContent = check.label;
      label.append(input, span);
      container.append(label);
    }
  }

  #renderResult() {
    const block = this.#root.querySelector("[data-result-block]");
    block.textContent = "";

    const title = document.createElement("h2");
    const text = document.createElement("p");

    if (this.#snapshot.isComplete) {
      title.textContent = "리팩토링 감각이 완성됐습니다";
      text.textContent =
        "같은 데이터를 바라보는 판단을 한 센터로 모으고, 결과 유지까지 확인했습니다.";
    } else {
      title.textContent = "아직 흩어진 조각이 남아 있습니다";
      text.textContent = "모이는 조각이 늘수록 변경 경로가 짧아지는 흐름을 관찰하세요.";
    }

    block.append(title, text);
  }
}
