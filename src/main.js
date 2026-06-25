import "./main.css";
import { App } from "./App.js";
import { MetricsCalculator } from "./core/MetricsCalculator.js";
import { ScenarioRepository } from "./core/ScenarioRepository.js";
import { TutorialState } from "./core/TutorialState.js";
import { FlowCanvas } from "./ui/FlowCanvas.js";
import { TutorialView } from "./ui/TutorialView.js";

// @MX:NOTE: App assembly uses constructor injection so each class keeps one job.
const root = document.querySelector("#app");
const repository = new ScenarioRepository();
const metricsCalculator = new MetricsCalculator();
const state = new TutorialState({ metricsCalculator });
const flowCanvas = new FlowCanvas({ documentRef: document, windowRef: window });
const view = new TutorialView({ root, state, flowCanvas });
const app = new App({ repository, state, view });

await app.init();
