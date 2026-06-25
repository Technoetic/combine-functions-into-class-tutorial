// @MX:NOTE: The canvas turns abstract relationships into motion without showing code.
export class FlowCanvas {
  #documentRef;
  #windowRef;
  #canvas;
  #context;
  #animationId = 0;
  #reducedMotion = false;
  #phase = 0;

  constructor({ documentRef, windowRef }) {
    this.#documentRef = documentRef;
    this.#windowRef = windowRef;
  }

  async init(canvas) {
    await Promise.resolve();
    this.#canvas = canvas;
    this.#context = canvas.getContext("2d");
    this.#reducedMotion = this.#windowRef.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.resize();
  }

  async start() {
    await Promise.resolve();
    this.stop();
    this.#tick();
  }

  stop() {
    if (this.#animationId) {
      this.#windowRef.cancelAnimationFrame(this.#animationId);
      this.#animationId = 0;
    }
  }

  resize() {
    if (!this.#canvas) {
      return;
    }

    const rect = this.#canvas.getBoundingClientRect();
    const ratio = this.#windowRef.devicePixelRatio || 1;
    this.#canvas.width = Math.max(1, Math.round(rect.width * ratio));
    this.#canvas.height = Math.max(1, Math.round(rect.height * ratio));
    this.#context?.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.draw();
  }

  draw() {
    if (!this.#canvas || !this.#context) {
      return;
    }

    const context = this.#context;
    const rect = this.#canvas.getBoundingClientRect();
    context.clearRect(0, 0, rect.width, rect.height);

    const hub = this.#documentRef.querySelector("[data-flow-hub]");
    const nodes = [...this.#documentRef.querySelectorAll("[data-flow-node]")];

    if (!hub || nodes.length === 0) {
      this.#drawEmptyPulse(context, rect);
      return;
    }

    const hubPoint = this.#centerOf(hub, rect);
    context.lineWidth = 2;
    context.lineCap = "round";

    for (const node of nodes) {
      const nodePoint = this.#centerOf(node, rect);
      const collected = node.getAttribute("data-collected") === "true";
      context.strokeStyle = collected ? "rgba(11, 118, 110, 0.52)" : "rgba(29, 37, 41, 0.18)";
      context.setLineDash(collected ? [] : [8, 8]);
      context.beginPath();
      context.moveTo(nodePoint.x, nodePoint.y);
      const midX = (nodePoint.x + hubPoint.x) / 2;
      const midY = (nodePoint.y + hubPoint.y) / 2 - 24;
      context.quadraticCurveTo(midX, midY, hubPoint.x, hubPoint.y);
      context.stroke();

      if (collected) {
        this.#drawParticle(context, nodePoint, hubPoint);
      }
    }

    context.setLineDash([]);
  }

  #tick() {
    this.#phase = this.#reducedMotion ? 0 : (this.#phase + 0.008) % 1;
    this.draw();
    this.#animationId = this.#windowRef.requestAnimationFrame(() => this.#tick());
  }

  #centerOf(element, canvasRect) {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left - canvasRect.left + rect.width / 2,
      y: rect.top - canvasRect.top + rect.height / 2,
    };
  }

  #drawParticle(context, start, end) {
    const x = start.x + (end.x - start.x) * this.#phase;
    const y = start.y + (end.y - start.y) * this.#phase;
    context.fillStyle = "rgba(11, 118, 110, 0.72)";
    context.beginPath();
    context.arc(x, y, 4, 0, Math.PI * 2);
    context.fill();
  }

  #drawEmptyPulse(context, rect) {
    context.fillStyle = "rgba(11, 118, 110, 0.1)";
    context.beginPath();
    context.arc(rect.width / 2, rect.height / 2, 42, 0, Math.PI * 2);
    context.fill();
  }
}
