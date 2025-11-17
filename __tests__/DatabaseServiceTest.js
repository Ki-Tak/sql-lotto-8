import { DatabaseService } from "../src/services/index.js";

describe("데이터베이스 서비스 테스트", () => {
  let dbService;

  const MOCK_LOTTO_8 = [
    [8, 21, 23, 41, 42, 43],
    [3, 5, 11, 16, 32, 38],
    [7, 11, 16, 35, 36, 44],
    [1, 8, 11, 31, 41, 42],
    [13, 14, 16, 38, 42, 45],
    [7, 11, 30, 40, 42, 43],
    [2, 13, 22, 32, 38, 45],
    [1, 3, 5, 14, 22, 45],
  ];
  const MOCK_LOTTO_5 = MOCK_LOTTO_8.slice(0, 5);
  const MOCK_AMOUNT_8000 = 8000;
  const MOCK_TICKET_COUNT_8 = 8;
  const MOCK_AMOUNT_5000 = 5000;
  const MOCK_TICKET_COUNT_5 = 5;
  const MOCK_WINNING_NUMBERS = [1, 2, 3, 4, 5, 6];
  const MOCK_BONUS_NUMBER = 7;
  const MOCK_RANK_COUNT = { 1: 0, 2: 0, 3: 1, 4: 0, 5: 1 };
  const MOCK_TOTAL_PRIZE = 1505000;
  const MOCK_RETURN_RATE = 18.81;

  const setupFullData = (ticketId) => {
    dbService.insertLotto(ticketId, MOCK_LOTTO_8);
    dbService.insertWinningNumbers(
      ticketId,
      MOCK_WINNING_NUMBERS,
      MOCK_BONUS_NUMBER
    );
    dbService.insertMatchResult(
      ticketId,
      MOCK_RANK_COUNT,
      MOCK_TOTAL_PRIZE,
      MOCK_RETURN_RATE
    );
  };

  beforeEach(() => {
    dbService = new DatabaseService({ memory: true });
  });

  afterEach(() => {
    dbService.close();
  });

  describe("로또 DB 테스트", () => {
    test("5개의 로또 번호를 저장하는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_5000,
        MOCK_TICKET_COUNT_5
      );
      dbService.insertLotto(ticketId, MOCK_LOTTO_5);
      const lotto = dbService.selectLottoNumbers(ticketId);
      expect(lotto.length).toBe(MOCK_TICKET_COUNT_5);
    });

    test("8개의 로또 번호를 저장하는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertLotto(ticketId, MOCK_LOTTO_8);
      const lotto = dbService.selectLottoNumbers(ticketId);
      expect(lotto.length).toBe(MOCK_TICKET_COUNT_8);
    });

    test("로또 번호를 저장하고 조회하는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_5000,
        MOCK_TICKET_COUNT_5
      );
      dbService.insertLotto(ticketId, MOCK_LOTTO_5);
      const lotto = dbService.selectLottoNumbers(ticketId);
      lotto.forEach((lotto, index) => {
        const parsed = JSON.parse(lotto.numbers);
        expect(parsed).toEqual(MOCK_LOTTO_5[index]);
      });
    });
  });

  describe("로또 티켓 DB 테스트", () => {
    test("2개의 티켓을 저장하는 경우", () => {
      dbService.insertLottoTicket(MOCK_AMOUNT_8000, MOCK_TICKET_COUNT_8);
      dbService.insertLottoTicket(MOCK_AMOUNT_5000, MOCK_TICKET_COUNT_5);
      const allTickets = dbService.selectAllTickets();
      expect(allTickets.length).toBe(2);
    });

    test("1개의 티켓을 저장하고 조회하는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      const ticket = dbService.selectTicketDetail(ticketId);
      expect(ticket.amount).toBe(MOCK_AMOUNT_8000);
      expect(ticket.ticket_count).toBe(MOCK_TICKET_COUNT_8);
    });

    test("2개의 티켓을 저장하고 조회하는 경우", () => {
      const ticket1Id = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      const ticket2Id = dbService.insertLottoTicket(
        MOCK_AMOUNT_5000,
        MOCK_TICKET_COUNT_5
      );

      const ticket1 = dbService.selectTicketDetail(ticket1Id);
      const ticket2 = dbService.selectTicketDetail(ticket2Id);

      expect(ticket1.amount).toBe(MOCK_AMOUNT_8000);
      expect(ticket1.ticket_count).toBe(MOCK_TICKET_COUNT_8);
      expect(ticket2.amount).toBe(MOCK_AMOUNT_5000);
      expect(ticket2.ticket_count).toBe(MOCK_TICKET_COUNT_5);
    });
  });

  describe("당첨 번호 및 보너스 번호 DB 테스트", () => {
    test("당첨 번호를 저장하고 조회하는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertWinningNumbers(
        ticketId,
        MOCK_WINNING_NUMBERS,
        MOCK_BONUS_NUMBER
      );
      const winning = dbService.selectWinningNumbers(ticketId);
      expect(winning.bonus_number).toBe(MOCK_BONUS_NUMBER);
      expect(winning.ticket_id).toBe(ticketId);
    });

    test("보너스 번호를 저장하고 조회하는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertWinningNumbers(
        ticketId,
        MOCK_WINNING_NUMBERS,
        MOCK_BONUS_NUMBER
      );
      const winning = dbService.selectWinningNumbers(ticketId);
      expect(winning.bonus_number).toBe(MOCK_BONUS_NUMBER);
    });

    test("당첨 번호가 JSON 형태로 조회하는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertWinningNumbers(
        ticketId,
        MOCK_WINNING_NUMBERS,
        MOCK_BONUS_NUMBER
      );
      const winning = dbService.selectWinningNumbers(ticketId);
      const parsed = JSON.parse(winning.numbers);
      expect(parsed).toEqual(MOCK_WINNING_NUMBERS);
    });

    test("티켓 ID(UNIQUE)의 제약조건을 지키지 않고 당첨 번호를 중복 저장하는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertWinningNumbers(
        ticketId,
        MOCK_WINNING_NUMBERS,
        MOCK_BONUS_NUMBER
      );

      expect(() => {
        dbService.insertWinningNumbers(ticketId, [7, 8, 9, 10, 11, 12], 13);
      }).toThrow();
    });
  });

  describe("매칭 결과 DB 테스트", () => {
    test("매칭 결과를 저장하는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertMatchResult(
        ticketId,
        MOCK_RANK_COUNT,
        MOCK_TOTAL_PRIZE,
        MOCK_RETURN_RATE
      );
      const matchResult = dbService.selectMatchResult(ticketId);
      expect(matchResult).toBeDefined();
    });

    test("매칭 결과 저장하고 조회하는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertMatchResult(
        ticketId,
        MOCK_RANK_COUNT,
        MOCK_TOTAL_PRIZE,
        MOCK_RETURN_RATE
      );
      const matchResult = dbService.selectMatchResult(ticketId);

      expect(matchResult.rank_3).toBe(MOCK_RANK_COUNT[3]);
      expect(matchResult.rank_5).toBe(MOCK_RANK_COUNT[5]);
      expect(matchResult.total_prize).toBe(MOCK_TOTAL_PRIZE);
      expect(matchResult.return_rate).toBe(MOCK_RETURN_RATE);
    });

    test("등수별 개수가 정확하게 저장되는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertMatchResult(
        ticketId,
        MOCK_RANK_COUNT,
        MOCK_TOTAL_PRIZE,
        MOCK_RETURN_RATE
      );
      const matchResult = dbService.selectMatchResult(ticketId);

      expect(matchResult.rank_1).toBe(MOCK_RANK_COUNT[1]);
      expect(matchResult.rank_2).toBe(MOCK_RANK_COUNT[2]);
      expect(matchResult.rank_3).toBe(MOCK_RANK_COUNT[3]);
      expect(matchResult.rank_4).toBe(MOCK_RANK_COUNT[4]);
      expect(matchResult.rank_5).toBe(MOCK_RANK_COUNT[5]);
    });

    test("당첨 금액이 정확하게 저장되는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertMatchResult(
        ticketId,
        MOCK_RANK_COUNT,
        MOCK_TOTAL_PRIZE,
        MOCK_RETURN_RATE
      );
      const matchResult = dbService.selectMatchResult(ticketId);

      expect(matchResult.total_prize).toBe(MOCK_TOTAL_PRIZE);
    });

    test("수익률이 정확하게 저장되는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertMatchResult(
        ticketId,
        MOCK_RANK_COUNT,
        MOCK_TOTAL_PRIZE,
        MOCK_RETURN_RATE
      );
      const matchResult = dbService.selectMatchResult(ticketId);

      expect(matchResult.return_rate).toBe(MOCK_RETURN_RATE);
    });

    test("티켓 ID(UNIQUE)의 제약조건을 지키지 않고 매칭 결과를 중복 저장하는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertMatchResult(
        ticketId,
        MOCK_RANK_COUNT,
        MOCK_TOTAL_PRIZE,
        MOCK_RETURN_RATE
      );

      expect(() => {
        dbService.insertMatchResult(
          ticketId,
          MOCK_RANK_COUNT,
          MOCK_TOTAL_PRIZE,
          MOCK_RETURN_RATE
        );
      }).toThrow();
    });
  });

  describe("CASCADE 삭제 테스트", () => {
    test("티켓 삭제 시 관련된 당첨 번호가 삭제되는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertWinningNumbers(
        ticketId,
        MOCK_WINNING_NUMBERS,
        MOCK_BONUS_NUMBER
      );

      dbService.deleteLottoTicket(ticketId);
      const winning = dbService.selectWinningNumbers(ticketId);
      expect(winning).toBeUndefined();
    });

    test("티켓 삭제 시 관련된 로또가 삭제되는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertLotto(ticketId, MOCK_LOTTO_8);

      dbService.deleteLottoTicket(ticketId);
      const lotto = dbService.selectLottoNumbers(ticketId);
      expect(lotto.length).toBe(0);
    });

    test("티켓 삭제 시 관련된 매칭 결과가 삭제되는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertWinningNumbers(
        ticketId,
        MOCK_WINNING_NUMBERS,
        MOCK_BONUS_NUMBER
      );
      dbService.insertMatchResult(
        ticketId,
        MOCK_RANK_COUNT,
        MOCK_TOTAL_PRIZE,
        MOCK_RETURN_RATE
      );

      dbService.deleteLottoTicket(ticketId);
      const matchResult = dbService.selectMatchResult(ticketId);
      expect(matchResult).toBeUndefined();
    });

    test("티켓 삭제 시 모든 관련 데이터가 삭제되는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      setupFullData(ticketId);

      dbService.deleteLottoTicket(ticketId);

      expect(dbService.selectLottoNumbers(ticketId).length).toBe(0);
      expect(dbService.selectWinningNumbers(ticketId)).toBeUndefined();
      expect(dbService.selectMatchResult(ticketId)).toBeUndefined();
    });
  });

  describe("데이터 일관성 테스트", () => {
    test("티켓의 로또 개수와 저장된 로또 개수가 일치하는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertLotto(ticketId, MOCK_LOTTO_8);

      const ticket = dbService.selectTicketDetail(ticketId);
      const lotto = dbService.selectLottoNumbers(ticketId);

      expect(ticket.ticket_count).toBe(MOCK_TICKET_COUNT_8);
      expect(lotto.length).toBe(MOCK_TICKET_COUNT_8);
    });

    test("FK 관계가 유지되는 경우", () => {
      const ticketId = dbService.insertLottoTicket(
        MOCK_AMOUNT_8000,
        MOCK_TICKET_COUNT_8
      );
      dbService.insertWinningNumbers(
        ticketId,
        MOCK_WINNING_NUMBERS,
        MOCK_BONUS_NUMBER
      );
      dbService.insertMatchResult(
        ticketId,
        MOCK_RANK_COUNT,
        MOCK_TOTAL_PRIZE,
        MOCK_RETURN_RATE
      );

      const winning = dbService.selectWinningNumbers(ticketId);
      const matchResult = dbService.selectMatchResult(ticketId);

      expect(winning.ticket_id).toBe(ticketId);
      expect(matchResult.ticket_id).toBe(ticketId);
    });
  });
});
