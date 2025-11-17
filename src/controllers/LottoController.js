import { DatabaseService, LottoGameService } from "../services/index.js";

class LottoController {
  #gameService;
  #dbService;
  #isRunning;

  constructor() {
    this.#gameService = new LottoGameService();
    this.#dbService = new DatabaseService();
    this.#isRunning = true;
  }

  async run() {}
}
export default LottoController;
