import { ERROR_MESSAGE, LOTTO_RULE } from "../constants/index.js";
import { getRandomNumber } from "../utils/index.js";
import { Lotto } from "./index.js";

class LottoTicket {
  #ticket;

  constructor(amount) {
    this.#validate(amount);
    this.#ticket = this.#generateTicket(amount);
  }

  #validate(amount) {
    this.#validateNotEmpty(amount);
    this.#validateNumber(amount);
    this.#validateAmount(amount);
  }

  #validateNotEmpty(amount) {
    if (amount === "") {
      throw new Error(ERROR_MESSAGE.EMPTY_PURCHASE_AMOUNT);
    }
  }

  #validateNumber(amount) {
    if (String(Number(amount)) !== amount) {
      throw new Error(ERROR_MESSAGE.INVALID_PURCHASE_AMOUNT_TYPE);
    }
  }

  #validateAmount(amount) {
    const numAmount = Number(amount);
    if (numAmount % LOTTO_RULE.LOTTO_UNIT !== 0) {
      throw new Error(ERROR_MESSAGE.INVALID_PURCHASE_AMOUNT_UNIT);
    }
  }

  #generateTicket(amount) {
    const count = amount / LOTTO_RULE.LOTTO_UNIT;
    return Array.from({ length: count }, () => this.#createLotto());
  }

  #createLotto() {
    const numbers = getRandomNumber();
    return new Lotto(numbers);
  }

  getTicket() {
    return this.#ticket;
  }

  getTicketCount() {
    return this.#ticket.length;
  }
}

export default LottoTicket;
