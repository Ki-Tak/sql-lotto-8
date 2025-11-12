import { LottoTicket } from "../src/models";
import { ERROR_MESSAGE } from "../src/constants";

const testValidTicket = (amount) => {
  expect(() => {
    new LottoTicket(amount);
  }).not.toThrow();
};

const testInvalidTicket = (amount, errorMessage) => {
  expect(() => {
    new LottoTicket(amount);
  }).toThrow(errorMessage);
};

const testTicketCount = (amount, expectedCount) => {
  const lottoTicket = new LottoTicket(amount);
  expect(lottoTicket.getTicketCount()).toBe(expectedCount);
};

describe("로또 티켓 클래스 테스트", () => {
  describe("빈 값 검증", () => {
    test("구입 금액이 빈 문자열인 경우", () => {
      testInvalidTicket("", ERROR_MESSAGE.EMPTY_PURCHASE_AMOUNT);
    });
  });

  describe("숫자 타입 검증", () => {
    test("구입 금액이 문자인 경우", () => {
      testInvalidTicket("abc", ERROR_MESSAGE.INVALID_PURCHASE_AMOUNT_TYPE);
    });

    test("구입 금액이 특수문자인 경우", () => {
      testInvalidTicket("!@#$", ERROR_MESSAGE.INVALID_PURCHASE_AMOUNT_TYPE);
    });
  });

  describe("금액 단위 검증", () => {
    test("구입 금액이 500원인 경우", () => {
      testInvalidTicket("500", ERROR_MESSAGE.INVALID_PURCHASE_AMOUNT_UNIT);
    });

    test("구입 금액이 1,500원인 경우", () => {
      testInvalidTicket("1500", ERROR_MESSAGE.INVALID_PURCHASE_AMOUNT_UNIT);
    });

    test("구입 금액이 소수점인 경우", () => {
      testInvalidTicket("1000.5", ERROR_MESSAGE.INVALID_PURCHASE_AMOUNT_UNIT);
    });

    test("구입 금액이 1,000원인 경우", () => {
      testValidTicket("1000");
    });

    test("구입 금액이 3,000원인 경우", () => {
      testValidTicket("3000");
    });
  });

  describe("로또 개수 생성", () => {
    test("1,000원으로 1개의 로또를 생성하는 경우", () => {
      testTicketCount("1000", 1);
    });

    test("3,000원으로 3개의 로또를 생성하는 경우", () => {
      testTicketCount("3000", 3);
    });

    test("100,000원으로 100개의 로또를 생성하는 경우", () => {
      testTicketCount("100000", 100);
    });
  });
});
