import { ERROR_MESSAGE, LOTTO_RULE } from "../constants/index.js";
class WinningNumbers {
  #winningNumbers = null;
  #bonusNumber = null;

  constructor(numberArray, bonusNumber) {
    if (numberArray !== undefined) this.setWinningNumbers(numberArray);
    if (bonusNumber !== undefined) this.setBonusNumber(bonusNumber);
  }

  setWinningNumbers(numberArray) {
    this.#validateWinningNumbers(numberArray);
    this.#winningNumbers = [...numberArray].sort((a, b) => a - b);
  }

  setBonusNumber(bonusNumber) {
    this.#validateBonusNumber(bonusNumber);
    this.#bonusNumber = bonusNumber;
  }

  #validateWinningNumbers(numberArray) {
    this.#validateNumberType(numberArray);
    this.#validateLength(numberArray);
    this.#validateRange(numberArray);
    this.#validateDuplicate(numberArray);
  }

  #validateBonusNumber(bonusNumber) {
    this.#validateBonusNumberType(bonusNumber);
    this.#validateBonusRange(bonusNumber);
    this.#validateBonusDuplicate(this.#winningNumbers, bonusNumber);
  }

  #validateNumberType(numberArray) {
    if (numberArray.some((num) => String(Number(num)) !== String(num))) {
      throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_TYPE);
    }
  }

  #validateLength(numberArray) {
    if (numberArray.length !== LOTTO_RULE.LOTTO_LENGTH) {
      throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_LENGTH);
    }
  }

  #validateRange(numberArray) {
    if (
      numberArray.some(
        (num) =>
          num < LOTTO_RULE.RANDOM_NUMBER_MIN ||
          num > LOTTO_RULE.RANDOM_NUMBER_MAX
      )
    ) {
      throw new Error(ERROR_MESSAGE.INVALID_WINNING_NUMBERS_RANGE);
    }
  }

  #validateDuplicate(numberArray) {
    if (new Set(numberArray).size !== numberArray.length) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS);
    }
  }

  #validateBonusNumberType(bonusNumber) {
    if (String(Number(bonusNumber)) !== String(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_TYPE);
    }
  }

  #validateBonusRange(bonusNumber) {
    if (
      bonusNumber < LOTTO_RULE.RANDOM_NUMBER_MIN ||
      bonusNumber > LOTTO_RULE.RANDOM_NUMBER_MAX
    ) {
      throw new Error(ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE);
    }
  }

  #validateBonusDuplicate(numberArray, bonusNumber) {
    if (numberArray === null) {
      throw new Error(ERROR_MESSAGE.ORDER_WINNING_BEFORE_BONUS);
    }
    if (numberArray.includes(bonusNumber)) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
    }
  }

  getWinningNumbers() {
    return this.#winningNumbers;
  }

  getBonusNumber() {
    return this.#bonusNumber;
  }

  countMatch(lotto) {
    return lotto.filter((num) => this.#winningNumbers.includes(num)).length;
  }

  hasBonusMatch(lotto) {
    return lotto.includes(this.#bonusNumber);
  }
}

export default WinningNumbers;
