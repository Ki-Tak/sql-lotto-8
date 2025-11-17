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

  // 1번 메뉴
  async #handlePurchaseLotto() {
    const amount = await InputView.inputPurchaseAmount();
    const ticket = new LottoTicket(amount);
    const ticketId = this.#dbService.insertLottoTicket(
      parseInt(amount),
      ticket.getTicketCount()
    );
    const lottoNumbers = ticket.getTicket().map((lotto) => lotto.getNumbers());
    this.#dbService.insertLotto(ticketId, lottoNumbers);
    OutputView.printLottoCount(ticket.getTicketCount());
    OutputView.printLottoNumbers(lottoNumbers);
    await this.#processWinningAnalysis(ticketId, ticket, amount);
  }

  async #processWinningAnalysis(ticketId, ticket, amount) {
    const numbers = await this.#inputWinningNumbers();
    const bonus = await this.#inputBonusNumber();
    const winning = new WinningNumbers(numbers, bonus);
    this.#dbService.insertWinningNumbers(ticketId, numbers, bonus);
    this.#analyzeAndSaveResult(ticketId, ticket, winning, amount);
  }

  async #inputWinningNumbers() {
    const winningInput = await InputView.inputWinningNumbers();
    return winningInput.split(",").map((n) => parseInt(n.trim()));
  }

  async #inputBonusNumber() {
    const bonusInput = await InputView.inputBonusNumber();
    return parseInt(bonusInput.trim());
  }

  #analyzeAndSaveResult(ticketId, ticket, winning, amount) {
    const result = this.#gameService.analyzeTicket(ticket.getTicket(), winning);
    const returnRate = this.#gameService.calculateReturnRate(
      result.totalPrize,
      parseInt(amount)
    );
    this.#dbService.insertMatchResult(
      ticketId,
      result.rankCount,
      result.totalPrize,
      returnRate
    );
    OutputView.printWinningResult(result.rankCount, returnRate);
  }

  // 2번 메뉴
  async #handleSelectTicket() {}

  // 3번 메뉴
  async #handleDeleteTicket() {}

  #handleExit() {
    OutputView.printExitMessage();
    this.#isRunning = false;
  }

  #cleanup() {
    if (this.#dbService) {
      this.#dbService.close();
    }
  }
}
export default LottoController;
