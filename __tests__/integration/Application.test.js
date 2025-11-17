import App from "../../src/App.js";
import { MissionUtils } from "@woowacourse/mission-utils";
import { DatabaseService } from "../../src/services/index.js";
import { INTRO_MESSAGE, ERROR_MESSAGE } from "../../src/constants/index.js";

jest.mock("@woowacourse/mission-utils", () => ({
  MissionUtils: {
    Console: {
      readLineAsync: jest.fn(),
      print: jest.fn(),
    },
    Random: {
      pickUniqueNumbersInRange: jest.fn(),
    },
  },
}));

jest.mock("../../src/services/DatabaseService.js");

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    if (input === undefined) {
      // 입력값이 부족할 때 테스트가 멈추지 않도록 처리
      return Promise.reject(new Error("테스트 입력값이 부족합니다."));
    }
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickUniqueNumbersInRange = jest.fn();
  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickUniqueNumbersInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, "print");
  logSpy.mockClear();
  return logSpy;
};

const runTotalTest = async (randoms, inputs, expectedLogs) => {
  const logSpy = getLogSpy();
  mockRandoms(randoms);
  mockQuestions(inputs);

  const app = new App();
  await app.run();

  expectedLogs.forEach((log) => {
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
  });
};

const runException = async (inputs, expectedError) => {
  const logSpy = getLogSpy();

  const RANDOM_NUMBERS_TO_END = [1, 2, 3, 4, 5, 6];

  mockRandoms([RANDOM_NUMBERS_TO_END]);
  mockQuestions(inputs);

  const app = new App();
  await app.run();

  expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(expectedError));
};

describe("전체적인 플로우 테스트", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    const TestDatabaseService = jest.requireActual(
      "../../src/services/DatabaseService.js"
    ).default;
    DatabaseService.mockImplementation(() => {
      return new TestDatabaseService({ memory: true });
    });
  });

  describe("통합 테스트", () => {
    test("구매(1) -> 조회(2) -> 삭제(3) -> 종료(4) 통합 플로우", async () => {
      const randoms = [[1, 2, 3, 10, 11, 12]];
      const inputs = ["1", "1000", "1,2,3,4,5,6", "7", "2", "1", "3", "1", "4"];
      const expectedLogs = [
        INTRO_MESSAGE.LOTTO_COUNT(1),
        "[1, 2, 3, 10, 11, 12]",
        INTRO_MESSAGE.RANK_FIFTH(1),
        INTRO_MESSAGE.RETURN_ON_INVESTMENT("500.0"),

        INTRO_MESSAGE.STORE_TICKET_TITLE,
        INTRO_MESSAGE.STORE_TICKET_INFO(1, 1, 1000, 1),
        INTRO_MESSAGE.TICKET_DETAIL_TITLE,
        INTRO_MESSAGE.TICKET_DETAIL_WINNING("1,2,3,4,5,6"),
        INTRO_MESSAGE.TICKET_DETAIL_BONUS(7),

        INTRO_MESSAGE.DELETE_TICKET(1),

        INTRO_MESSAGE.EXIT_PROGRAM,
      ];

      await runTotalTest(randoms, inputs, expectedLogs);
    });

    test("8장 구매, 5등 1개 (메뉴 1 -> 4)", async () => {
      const randoms = [
        [8, 21, 23, 41, 42, 43],
        [3, 5, 11, 16, 32, 38],
        [7, 11, 16, 35, 36, 44],
        [1, 8, 11, 31, 41, 42],
        [13, 14, 16, 38, 42, 45],
        [7, 11, 30, 40, 42, 43],
        [2, 13, 22, 32, 38, 45],
        [1, 3, 5, 14, 22, 45],
      ];
      const inputs = ["1", "8000", "1,2,3,4,5,6", "7", "4"];
      const expectedLogs = [
        INTRO_MESSAGE.LOTTO_COUNT(8),
        "[8, 21, 23, 41, 42, 43]",
        "[3, 5, 11, 16, 32, 38]",
        "[7, 11, 16, 35, 36, 44]",
        "[1, 8, 11, 31, 41, 42]",
        "[13, 14, 16, 38, 42, 45]",
        "[7, 11, 30, 40, 42, 43]",
        "[2, 13, 22, 32, 38, 45]",
        "[1, 3, 5, 14, 22, 45]",
        INTRO_MESSAGE.RANK_FIFTH(1),
        INTRO_MESSAGE.RANK_FOURTH(0),
        INTRO_MESSAGE.RANK_THIRD(0),
        INTRO_MESSAGE.RANK_SECOND(0),
        INTRO_MESSAGE.RANK_FIRST(0),
        INTRO_MESSAGE.RETURN_ON_INVESTMENT("62.5"),
        INTRO_MESSAGE.EXIT_PROGRAM,
      ];

      await runTotalTest(randoms, inputs, expectedLogs);
    });

    test("1장 구매, 0개 당첨 (메뉴 1 -> 4)", async () => {
      const randoms = [[10, 11, 12, 13, 14, 15]];
      const inputs = ["1", "1000", "1,2,3,4,5,6", "7", "4"];
      const expectedLogs = [
        INTRO_MESSAGE.LOTTO_COUNT(1),
        "[10, 11, 12, 13, 14, 15]",
        INTRO_MESSAGE.RANK_FIFTH(0),
        INTRO_MESSAGE.RANK_FOURTH(0),
        INTRO_MESSAGE.RANK_THIRD(0),
        INTRO_MESSAGE.RANK_SECOND(0),
        INTRO_MESSAGE.RANK_FIRST(0),
        INTRO_MESSAGE.RETURN_ON_INVESTMENT("0.0"),
        INTRO_MESSAGE.EXIT_PROGRAM,
      ];

      await runTotalTest(randoms, inputs, expectedLogs);
    });
  });

  describe("예외 입력 테스트", () => {
    test("금액 단계 예외 입력", async () => {
      const inputs = ["1", "1000j", "1000", "1,2,3,4,5,6", "7", "4"];
      await runException(inputs, ERROR_MESSAGE.INVALID_PURCHASE_AMOUNT_TYPE);
    });

    test("당첨 번호 단계 예외 입력", async () => {
      const inputs = ["1", "1000", "1,2,a,4,5,6", "1,2,3,4,5,6", "7", "4"];
      await runException(inputs, ERROR_MESSAGE.INVALID_WINNING_NUMBERS_TYPE);
    });

    test("보너스 번호 단계 예외 입력 (중복)", async () => {
      const inputs = ["1", "1000", "1,2,3,4,5,6", "6", "7", "4"];
      await runException(inputs, ERROR_MESSAGE.DUPLICATE_BONUS_NUMBER);
    });
  });
});
