// @MX:NOTE: The app lifecycle stays explicit: construct, async init, then render.
export class App {
  #repository;
  #state;
  #view;

  constructor({ repository, state, view }) {
    this.#repository = repository;
    this.#state = state;
    this.#view = view;
  }

  async init() {
    try {
      const scenarios = await this.#repository.load();
      await this.#state.init(scenarios);
      await this.#view.init();
    } catch (error) {
      this.#view.renderFailure(error);
    }
  }
}
