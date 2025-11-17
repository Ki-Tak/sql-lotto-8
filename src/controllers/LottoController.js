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

  async #getValidInput(promptFunction) {
    while (true) {
      try {
        return await promptFunction();
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }

  async run() {
    try {
      while (this.#isRunning) {
        await this.#getValidInput(async () => {
          OutputView.printMainMenu();
          const menu = await InputView.inputSelectMenu();
          await this.#handleMenu(menu.trim());
        });
      }
    } catch (error) {
      OutputView.printError(error.message);
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

  async #selectTicketIndex(length, inputFunction) {
    return await this.#getValidInput(async () => {
      const selection = await inputFunction();
      const index = parseInt(selection.trim()) - 1;
      if (index < 0 || index >= length) {
        throw new Error(ERROR_MESSAGE.INVALID_TICKET_NUMBER);
      }
      return index;
    });
  }

  // 1번 메뉴
  async #handlePurchaseLotto() {
    const amount = await this.#getValidInput(async () => {
      return await InputView.inputPurchaseAmount();
    });
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
    const winning = new WinningNumbers();
    const numbers = await this.#inputWinningNumbers();
    winning.setWinningNumbers(numbers);
    const bonus = await this.#inputBonusNumber();
    winning.setBonusNumber(bonus);
    this.#dbService.insertWinningNumbers(ticketId, numbers, bonus);
    this.#analyzeAndSaveResult(ticketId, ticket, winning, amount);
  }

  async #inputWinningNumbers() {
    return await this.#getValidInput(async () => {
      const winningInput = await InputView.inputWinningNumbers();
      return winningInput.split(",").map((n) => parseInt(n.trim()));
    });
  }

  async #inputBonusNumber() {
    return await this.#getValidInput(async () => {
      const bonusInput = await InputView.inputBonusNumber();
      return parseInt(bonusInput.trim());
    });
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
    OutputView.printWinningResult(
      result.rankCount[1],
      result.rankCount[2],
      result.rankCount[3],
      result.rankCount[4],
      result.rankCount[5],
      returnRate
    );
  }

  // 2번 메뉴
  async #handleSelectTicket() {
    const tickets = this.#dbService.selectAllTickets();
    if (tickets.length === 0) {
      throw new Error(ERROR_MESSAGE.EMPTY_TICKET);
    }
    OutputView.printStoreTickets(tickets);
    const index = await this.#selectTicketIndex(
      tickets.length,
      InputView.inputSelectTicket
    );
    const ticketId = tickets[index].id;
    this.#printTicketDetail(ticketId);
  }

  #printTicketDetail(ticketId) {
    const ticket = this.#dbService.selectTicketDetail(ticketId);
    const lottoNumbers = this.#dbService.selectLottoNumbers(ticketId);
    const winning = this.#dbService.selectWinningNumbers(ticketId);
    const matchResult = this.#dbService.selectMatchResult(ticketId);
    OutputView.printTicketInformation(
      ticket,
      lottoNumbers.map((lotto) => JSON.parse(lotto.numbers)),
      JSON.parse(winning.numbers),
      winning.bonus_number
    );
    OutputView.printWinningResult(
      matchResult.rank_1,
      matchResult.rank_2,
      matchResult.rank_3,
      matchResult.rank_4,
      matchResult.rank_5,
      matchResult.return_rate
    );
  }

  // 3번 메뉴
  async #handleDeleteTicket() {
    const tickets = this.#dbService.selectAllTickets();
    if (tickets.length === 0) {
      throw new Error(ERROR_MESSAGE.EMPTY_TICKET);
    }
    OutputView.printStoreTickets(tickets);
    const index = await this.#selectTicketIndex(
      tickets.length,
      InputView.inputSelectDeleteTicket
    );
    const ticketId = tickets[index].id;
    this.#dbService.deleteLottoTicket(ticketId);
    OutputView.printDeleteTicket(ticketId);
  }

  // 4번 메뉴
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
