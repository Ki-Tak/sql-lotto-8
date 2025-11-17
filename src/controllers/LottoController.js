import { DatabaseService, LottoGameService } from "../services/index.js";
import { InputView, OutputView } from "../views/index.js";
import { LottoTicket, WinningNumbers } from "../models/index.js";
import { ERROR_MESSAGE } from "../constants/index.js";

class LottoController {
  #gameService;
  #dbService;
  #isRunning;

  constructor() {
    this.#gameService = new LottoGameService();
    this.#dbService = new DatabaseService();
    this.#isRunning = true;
  }

  async run() {
    try {
      while (this.#isRunning) {
        OutputView.printMainMenu();
        const menu = await InputView.inputSelectMenu();
        await this.#handleMenu(menu.trim());
      }
    } catch (error) {
      OutputView.printExitMessage(error.message);
      throw error;
    } finally {
      this.#cleanup();
    }
  }

  async #handleMenu(menu) {
    if (menu === "1") {
      await this.#handlePurchaseLotto();
      return;
    }

    if (menu === "2") {
      await this.#handleSelectTicket();
      return;
    }

    if (menu === "3") {
      await this.#handleDeleteTicket();
      return;
    }

    if (menu === "4") {
      this.#handleExit();
      return;
    }

    throw new Error(ERROR_MESSAGE.INVALID_MENU_NUMBER);
  }

  #handleExit() {
    OutputView.printExitMessage();
    this.#isRunning = false;
  }

  #cleanup() {
    if (this.#dbService) {
      this.#dbService.close();
    }
  }

  async #handlePurchaseLotto() {}
  async #handleSelectTicket() {}
  async #handleDeleteTicket() {}
}
export default LottoController;
