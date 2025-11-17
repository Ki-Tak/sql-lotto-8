import { Lotto, WinningNumbers } from "../../src/models";
import { ERROR_MESSAGE } from "../../src/constants";

const testValidWinningNumbers = (numbers, bonusNumber) => {
  expect(() => {
    new WinningNumbers(numbers, bonusNumber);
  }).not.toThrow();
};

const testInvalidWinningNumbers = (numbers, bonusNumber, errorMessage) => {
  expect(() => {
    new WinningNumbers(numbers, bonusNumber);
  }).toThrow(errorMessage);
};

export const testMatchCount = (
  winningNumbers,
  bonusNumber,
  lottoNumbers,
  expectedCount
) => {
  const winningNumbersObject = new WinningNumbers(winningNumbers, bonusNumber);
  const lotto = new Lotto(lottoNumbers);
  expect(winningNumbersObject.countMatch(lotto.getNumbers())).toBe(
    expectedCount
  );
};

export const testBonusMatch = (
  winningNumbers,
  bonusNumber,
  lottoNumbers,
  expectedResult
) => {
  const winningNumbersObject = new WinningNumbers(winningNumbers, bonusNumber);
  const lotto = new Lotto(lottoNumbers);
  expect(winningNumbersObject.hasBonusMatch(lotto.getNumbers())).toBe(
    expectedResult
  );
};

const VALID_NUMBERS = [2, 3, 4, 5, 6, 7];
const VALID_BONUS = 15;

describe("당첨 번호 클래스 테스트", () => {
  describe("당첨 번호 길이 검증", () => {
    test("당첨 번호가 5개인 경우", () => {
      testInvalidWinningNumbers(
        [1, 2, 3, 4, 5],
        VALID_BONUS,
        ERROR_MESSAGE.INVALID_WINNING_NUMBERS_LENGTH
      );
    });

    test("당첨 번호가 7개인 경우", () => {
      testInvalidWinningNumbers(
        [1, 2, 3, 4, 5, 6, 7],
        VALID_BONUS,
        ERROR_MESSAGE.INVALID_WINNING_NUMBERS_LENGTH
      );
    });

    test("당첨 번호가 비어있는 경우", () => {
      testInvalidWinningNumbers(
        [],
        VALID_BONUS,
        ERROR_MESSAGE.INVALID_WINNING_NUMBERS_LENGTH
      );
    });

    test("당첨 번호가 6개인 경우", () => {
      testValidWinningNumbers(VALID_NUMBERS, VALID_BONUS);
    });
  });

  describe("당첨 번호 중복 검증", () => {
    test("당첨 번호에 중복이 1개 있는 경우", () => {
      testInvalidWinningNumbers(
        [1, 2, 3, 4, 5, 5],
        VALID_BONUS,
        ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS
      );
    });

    test("모든 당첨 번호가 같은 경우", () => {
      testInvalidWinningNumbers(
        [5, 5, 5, 5, 5, 5],
        VALID_BONUS,
        ERROR_MESSAGE.DUPLICATE_WINNING_NUMBERS
      );
    });
  });

  describe("당첨 번호 범위 검증", () => {
    test("당첨 번호가 1보다 작은 경우", () => {
      testInvalidWinningNumbers(
        [0, 1, 2, 3, 4, 5],
        VALID_BONUS,
        ERROR_MESSAGE.INVALID_WINNING_NUMBERS_RANGE
      );
    });

    test("당첨 번호가 음수인 경우", () => {
      testInvalidWinningNumbers(
        [-1, 1, 2, 3, 4, 5],
        VALID_BONUS,
        ERROR_MESSAGE.INVALID_WINNING_NUMBERS_RANGE
      );
    });

    test("당첨 번호가 45보다 큰 경우", () => {
      testInvalidWinningNumbers(
        [1, 2, 3, 4, 5, 46],
        VALID_BONUS,
        ERROR_MESSAGE.INVALID_WINNING_NUMBERS_RANGE
      );
    });

    test("당첨 번호가 1~45 범위 내인 경우", () => {
      testValidWinningNumbers([1, 10, 20, 30, 40, 45], VALID_BONUS);
    });
  });

  describe("보너스 번호 범위 검증", () => {
    test("보너스 번호가 1보다 작은 경우", () => {
      testInvalidWinningNumbers(
        VALID_NUMBERS,
        0,
        ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE
      );
    });

    test("보너스 번호가 음수인 경우", () => {
      testInvalidWinningNumbers(
        VALID_NUMBERS,
        -1,
        ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE
      );
    });

    test("보너스 번호가 45보다 큰 경우", () => {
      testInvalidWinningNumbers(
        VALID_NUMBERS,
        46,
        ERROR_MESSAGE.INVALID_BONUS_NUMBER_RANGE
      );
    });
  });

  describe("보너스 번호 중복 검증", () => {
    test("보너스 번호가 당첨 번호와 중복되는 경우", () => {
      testInvalidWinningNumbers(
        [1, 2, 3, 4, 5, 6],
        3,
        ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER
      );
    });

    test("보너스 번호가 당첨 번호와 중복되지 않는 경우", () => {
      testValidWinningNumbers([1, 2, 3, 4, 5, 6], 7);
    });
  });

  describe("정상 생성", () => {
    test("유효한 당첨 번호와 보너스 번호로 생성하는 경우", () => {
      testValidWinningNumbers(VALID_NUMBERS, VALID_BONUS);
    });

    test("생성된 당첨 번호가 오름차순으로 정렬된 경우", () => {
      const winningNumbers = new WinningNumbers([6, 5, 4, 3, 2, 1], 7);
      expect(winningNumbers.getWinningNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe("경계값", () => {
    test("최소값 1을 포함하는 당첨 번호를 생성하는 경우", () => {
      testValidWinningNumbers([1, 2, 3, 4, 5, 6], VALID_BONUS);
    });

    test("최대값 45를 포함하는 당첨 번호를 생성하는 경우", () => {
      testValidWinningNumbers([40, 41, 42, 43, 44, 45], VALID_BONUS);
    });

    test("보너스 번호가 최소값인 경우", () => {
      testValidWinningNumbers(VALID_NUMBERS, 1);
    });

    test("보너스 번호가 최대값인 경우", () => {
      testValidWinningNumbers(VALID_NUMBERS, 45);
    });
  });

  describe("번호 숫자 검증", () => {
    test("당첨 번호에 특수 문자가 있는 경우", () => {
      testInvalidWinningNumbers(
        [1, 2, 3, 4, 5, "#"],
        VALID_BONUS,
        ERROR_MESSAGE.INVALID_WINNING_NUMBERS_TYPE
      );
    });

    test("보너스 번호에 특수 문자가 있는 경우", () => {
      testInvalidWinningNumbers(
        VALID_NUMBERS,
        "#",
        ERROR_MESSAGE.INVALID_BONUS_NUMBER_TYPE
      );
    });
  });

  describe("당첨 번호 일치 개수 확인", () => {
    test("당첨 번호가 모두 일치하는 경우", () => {
      testMatchCount([1, 2, 3, 4, 5, 6], 7, [1, 2, 3, 4, 5, 6], 6);
    });

    test("당첨 번호가 3개가 일치하는 경우", () => {
      testMatchCount([1, 2, 3, 4, 5, 6], 7, [1, 2, 3, 10, 11, 12], 3);
    });

    test("당첨 번호가 모두 다른 경우", () => {
      testMatchCount([1, 2, 3, 4, 5, 6], 7, [10, 11, 12, 13, 14, 15], 0);
    });
  });

  describe("보너스 번호 일치 여부", () => {
    test("보너스 번호가 있는 경우", () => {
      testBonusMatch([1, 2, 3, 4, 5, 6], 7, [7, 10, 11, 12, 13, 14], true);
    });

    test("보너스 번호가 없는 경우", () => {
      testBonusMatch([1, 2, 3, 4, 5, 6], 7, [10, 11, 12, 13, 14, 15], false);
    });
  });

  describe("당첨 번호와 보너스 번호 일치 여부", () => {
    test("5개 일치 + 보너스 일치하는 경우", () => {
      testMatchCount([1, 2, 3, 4, 5, 6], 7, [1, 2, 3, 4, 5, 7], 5);
      testBonusMatch([1, 2, 3, 4, 5, 6], 7, [1, 2, 3, 4, 5, 7], true);
    });
  });
});
