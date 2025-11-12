import { ERROR_MESSAGE, LOTTO_RULE } from "../constants/index.js";
class Lotto {
  #numbers;

  constructor(numbers) {
    this.#validate(numbers);
    this.#numbers = [...numbers].sort((a, b) => a - b);
  }

  #validate(numbers) {
    this.#validateLength(numbers);
    this.#validateDuplicate(numbers);
    this.#validateRange(numbers);
  }

  #validateLength(numbers) {
    if (numbers.length !== LOTTO_RULE.LOTTO_LENGTH) {
      throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUMBERS_LENGTH);
    }
  }

  #validateDuplicate(numbers) {
    if (new Set(numbers).size !== numbers.length) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBERS);
    }
  }

  #validateRange(numbers) {
    if (
      numbers.some(
        (num) =>
          num < LOTTO_RULE.RANDOM_NUMBER_MIN ||
          num > LOTTO_RULE.RANDOM_NUMBER_MAX
      )
    ) {
      throw new Error(ERROR_MESSAGE.INVALID_LOTTO_NUMBERS_RANGE);
    }
  }

  getNumbers() {
    return this.#numbers;
  }
}

export default Lotto;
