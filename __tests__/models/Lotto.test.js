import { Lotto } from "../../src/models";
import { ERROR_MESSAGE } from "../../src/constants";

const testValidLotto = (numbers) => {
  expect(() => {
    new Lotto(numbers);
  }).not.toThrow();
};

const testInvalidLotto = (numbers, errorMessage) => {
  expect(() => {
    new Lotto(numbers);
  }).toThrow(errorMessage);
};

describe("로또 클래스 테스트", () => {
  describe("길이 검증", () => {
    test("로또 번호가 5개인 경우", () => {
      testInvalidLotto(
        [1, 2, 3, 4, 5],
        ERROR_MESSAGE.INVALID_LOTTO_NUMBERS_LENGTH
      );
    });

    test("로또 번호가 비어있는 경우", () => {
      testInvalidLotto([], ERROR_MESSAGE.INVALID_LOTTO_NUMBERS_LENGTH);
    });
  });

  describe("중복 검증", () => {
    test("로또 번호에 중복이 1개 있는 경우", () => {
      testInvalidLotto(
        [1, 2, 3, 4, 5, 5],
        ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBERS
      );
    });

    test("모든 로또 번호가 같은 경우", () => {
      testInvalidLotto(
        [5, 5, 5, 5, 5, 5],
        ERROR_MESSAGE.DUPLICATE_LOTTO_NUMBERS
      );
    });
  });

  describe("범위 검증", () => {
    test("로또 번호가 1보다 작은 경우", () => {
      testInvalidLotto(
        [0, 1, 2, 3, 4, 5],
        ERROR_MESSAGE.INVALID_LOTTO_NUMBERS_RANGE
      );
    });

    test("로또 번호가 음수인 경우", () => {
      testInvalidLotto(
        [-1, 1, 2, 3, 4, 5],
        ERROR_MESSAGE.INVALID_LOTTO_NUMBERS_RANGE
      );
    });

    test("로또 번호가 45보다 큰 경우", () => {
      testInvalidLotto(
        [1, 2, 3, 4, 5, 46],
        ERROR_MESSAGE.INVALID_LOTTO_NUMBERS_RANGE
      );
    });

    test("로또 번호가 1~45 범위 내인 경우", () => {
      testValidLotto([1, 10, 20, 30, 40, 45]);
    });
  });

  describe("정상 생성", () => {
    test("유효한 로또 번호로 로또를 생성하는 경우", () => {
      testValidLotto([1, 2, 3, 4, 5, 6]);
    });

    test("생성된 로또 번호가 오름차순으로 정렬된 경우", () => {
      const lotto = new Lotto([6, 5, 4, 3, 2, 1]);
      expect(lotto.getNumbers()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe("경계값", () => {
    test("최소값 1을 포함하는 로또를 생성하는 경우", () => {
      testValidLotto([1, 2, 3, 4, 5, 6]);
    });

    test("최대값 45를 포함하는 로또를 생성하는 경우", () => {
      testValidLotto([40, 41, 42, 43, 44, 45]);
    });

    test("최소값 미만인 0을 포함하는 경우", () => {
      testInvalidLotto(
        [0, 1, 2, 3, 4, 5],
        ERROR_MESSAGE.INVALID_LOTTO_NUMBERS_RANGE
      );
    });

    test("최대값 초과인 46을 포함하는 경우", () => {
      testInvalidLotto(
        [41, 42, 43, 44, 45, 46],
        ERROR_MESSAGE.INVALID_LOTTO_NUMBERS_RANGE
      );
    });
  });
});
