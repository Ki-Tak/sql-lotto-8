import { createTestDatabase, MOCK_DATA, setupFullData } from "./setup.js";

describe("데이터베이스 통합 테스트", () => {
  let dbService;

  beforeEach(() => {
    dbService = createTestDatabase();
  });

  afterEach(() => {
    dbService.close();
  });

  describe("CASCADE 삭제", () => {
    test("티켓 삭제 시 관련된 당첨 번호가 삭제되는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_DATA.AMOUNT_8000,
        MOCK_DATA.TICKET_COUNT_8
      );
      dbService.insertWinningNumbers(
        ticketId,
        MOCK_DATA.WINNING_NUMBERS,
        MOCK_DATA.BONUS_NUMBER
      );

      dbService.deleteLottoTicket(ticketId);
      const winning = dbService.selectWinningNumbers(ticketId);
      expect(winning).toBeUndefined();
    });

    test("티켓 삭제 시 관련된 로또가 삭제되는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_DATA.AMOUNT_8000,
        MOCK_DATA.TICKET_COUNT_8
      );
      dbService.insertLotto(ticketId, MOCK_DATA.LOTTO_8);

      dbService.deleteLottoTicket(ticketId);
      const lotto = dbService.selectLottoNumbers(ticketId);
      expect(lotto.length).toBe(0);
    });

    test("티켓 삭제 시 관련된 매칭 결과가 삭제되는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_DATA.AMOUNT_8000,
        MOCK_DATA.TICKET_COUNT_8
      );
      dbService.insertWinningNumbers(
        ticketId,
        MOCK_DATA.WINNING_NUMBERS,
        MOCK_DATA.BONUS_NUMBER
      );
      dbService.insertMatchResult(
        ticketId,
        MOCK_DATA.RANK_COUNT,
        MOCK_DATA.TOTAL_PRIZE,
        MOCK_DATA.RETURN_RATE
      );

      dbService.deleteLottoTicket(ticketId);
      const matchResult = dbService.selectMatchResult(ticketId);
      expect(matchResult).toBeUndefined();
    });

    test("티켓 삭제 시 모든 관련 데이터가 삭제되는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_DATA.AMOUNT_8000,
        MOCK_DATA.TICKET_COUNT_8
      );
      setupFullData(dbService, ticketId);

      dbService.deleteLottoTicket(ticketId);

      expect(dbService.selectLottoNumbers(ticketId).length).toBe(0);
      expect(dbService.selectWinningNumbers(ticketId)).toBeUndefined();
      expect(dbService.selectMatchResult(ticketId)).toBeUndefined();
    });
  });

  describe("데이터 일관성", () => {
    test("티켓의 로또 개수와 저장된 로또 개수가 일치하는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_DATA.AMOUNT_8000,
        MOCK_DATA.TICKET_COUNT_8
      );
      dbService.insertLotto(ticketId, MOCK_DATA.LOTTO_8);

      const ticket = dbService.selectTicketDetail(ticketId);
      const lotto = dbService.selectLottoNumbers(ticketId);

      expect(ticket.ticket_count).toBe(MOCK_DATA.TICKET_COUNT_8);
      expect(lotto.length).toBe(MOCK_DATA.TICKET_COUNT_8);
    });

    test("FK 관계가 유지되는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_DATA.AMOUNT_8000,
        MOCK_DATA.TICKET_COUNT_8
      );
      dbService.insertWinningNumbers(
        ticketId,
        MOCK_DATA.WINNING_NUMBERS,
        MOCK_DATA.BONUS_NUMBER
      );
      dbService.insertMatchResult(
        ticketId,
        MOCK_DATA.RANK_COUNT,
        MOCK_DATA.TOTAL_PRIZE,
        MOCK_DATA.RETURN_RATE
      );

      const winning = dbService.selectWinningNumbers(ticketId);
      const matchResult = dbService.selectMatchResult(ticketId);

      expect(winning.ticket_id).toBe(ticketId);
      expect(matchResult.ticket_id).toBe(ticketId);
    });
  });
});
