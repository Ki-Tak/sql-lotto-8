import { createTestDatabase, MOCK_DATA } from "./setup.js";

describe("당첨 번호 DB 테스트", () => {
  let dbService;

  beforeEach(() => {
    dbService = createTestDatabase();
  });

  afterEach(() => {
    dbService.close();
  });

  test("당첨 번호를 저장하고 조회하는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    dbService.insertWinningNumbers(
      ticketId,
      MOCK_DATA.WINNING_NUMBERS,
      MOCK_DATA.BONUS_NUMBER
    );
    const winning = dbService.selectWinningNumbers(ticketId);
    expect(winning.bonus_number).toBe(MOCK_DATA.BONUS_NUMBER);
    expect(winning.ticket_id).toBe(ticketId);
  });

  test("보너스 번호를 저장하고 조회하는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    dbService.insertWinningNumbers(
      ticketId,
      MOCK_DATA.WINNING_NUMBERS,
      MOCK_DATA.BONUS_NUMBER
    );
    const winning = dbService.selectWinningNumbers(ticketId);
    expect(winning.bonus_number).toBe(MOCK_DATA.BONUS_NUMBER);
  });

  test("당첨 번호가 JSON 형태로 조회하는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    dbService.insertWinningNumbers(
      ticketId,
      MOCK_DATA.WINNING_NUMBERS,
      MOCK_DATA.BONUS_NUMBER
    );
    const winning = dbService.selectWinningNumbers(ticketId);
    const parsed = JSON.parse(winning.numbers);
    expect(parsed).toEqual(MOCK_DATA.WINNING_NUMBERS);
  });

  test("티켓 ID(UNIQUE)의 제약조건을 지키지 않고 당첨 번호를 중복 저장하는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    dbService.insertWinningNumbers(
      ticketId,
      MOCK_DATA.WINNING_NUMBERS,
      MOCK_DATA.BONUS_NUMBER
    );

    expect(() => {
      dbService.insertWinningNumbers(ticketId, [7, 8, 9, 10, 11, 12], 13);
    }).toThrow();
  });
});
