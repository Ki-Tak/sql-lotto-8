import { createTestDatabase, MOCK_DATA } from "./setup.js";

describe("매칭 결과 DB 테스트", () => {
  let dbService;

  beforeEach(() => {
    dbService = createTestDatabase();
  });

  afterEach(() => {
    dbService.close();
  });

  test("매칭 결과를 저장하는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    dbService.insertMatchResult(
      ticketId,
      MOCK_DATA.RANK_COUNT,
      MOCK_DATA.TOTAL_PRIZE,
      MOCK_DATA.RETURN_RATE
    );
    const matchResult = dbService.selectMatchResult(ticketId);
    expect(matchResult).toBeDefined();
  });

  test("매칭 결과 저장하고 조회하는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    dbService.insertMatchResult(
      ticketId,
      MOCK_DATA.RANK_COUNT,
      MOCK_DATA.TOTAL_PRIZE,
      MOCK_DATA.RETURN_RATE
    );
    const matchResult = dbService.selectMatchResult(ticketId);

    expect(matchResult.rank_3).toBe(MOCK_DATA.RANK_COUNT[3]);
    expect(matchResult.rank_5).toBe(MOCK_DATA.RANK_COUNT[5]);
    expect(matchResult.total_prize).toBe(MOCK_DATA.TOTAL_PRIZE);
    expect(matchResult.return_rate).toBe(MOCK_DATA.RETURN_RATE);
  });

  test("등수별 개수가 정확하게 저장되는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    dbService.insertMatchResult(
      ticketId,
      MOCK_DATA.RANK_COUNT,
      MOCK_DATA.TOTAL_PRIZE,
      MOCK_DATA.RETURN_RATE
    );
    const matchResult = dbService.selectMatchResult(ticketId);

    expect(matchResult.rank_1).toBe(MOCK_DATA.RANK_COUNT[1]);
    expect(matchResult.rank_2).toBe(MOCK_DATA.RANK_COUNT[2]);
    expect(matchResult.rank_3).toBe(MOCK_DATA.RANK_COUNT[3]);
    expect(matchResult.rank_4).toBe(MOCK_DATA.RANK_COUNT[4]);
    expect(matchResult.rank_5).toBe(MOCK_DATA.RANK_COUNT[5]);
  });

  test("당첨 금액이 정확하게 저장되는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    dbService.insertMatchResult(
      ticketId,
      MOCK_DATA.RANK_COUNT,
      MOCK_DATA.TOTAL_PRIZE,
      MOCK_DATA.RETURN_RATE
    );
    const matchResult = dbService.selectMatchResult(ticketId);

    expect(matchResult.total_prize).toBe(MOCK_DATA.TOTAL_PRIZE);
  });

  test("수익률이 정확하게 저장되는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    dbService.insertMatchResult(
      ticketId,
      MOCK_DATA.RANK_COUNT,
      MOCK_DATA.TOTAL_PRIZE,
      MOCK_DATA.RETURN_RATE
    );
    const matchResult = dbService.selectMatchResult(ticketId);

    expect(matchResult.return_rate).toBe(MOCK_DATA.RETURN_RATE);
  });

  test("티켓 ID(UNIQUE)의 제약조건을 지키지 않고 매칭 결과를 중복 저장하는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    dbService.insertMatchResult(
      ticketId,
      MOCK_DATA.RANK_COUNT,
      MOCK_DATA.TOTAL_PRIZE,
      MOCK_DATA.RETURN_RATE
    );

    expect(() => {
      dbService.insertMatchResult(
        ticketId,
        MOCK_DATA.RANK_COUNT,
        MOCK_DATA.TOTAL_PRIZE,
        MOCK_DATA.RETURN_RATE
      );
    }).toThrow();
  });
});
