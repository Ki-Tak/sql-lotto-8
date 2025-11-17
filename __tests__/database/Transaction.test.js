import { DatabaseService } from "../../src/services/index.js";

describe("Transaction 테스트", () => {
  let dbService;

  beforeEach(() => {
    dbService = new DatabaseService({ memory: true });
  });

  afterEach(() => {
    dbService.close();
  });

  test("롤백 시 모든 데이터 취소", () => {
    dbService.beginTransaction();

    const ticketId = dbService.insertLottoTicket(5000, 5);
    const lottoNumbers = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
      [19, 20, 21, 22, 23, 24],
      [25, 26, 27, 28, 29, 30],
    ];
    dbService.insertLotto(ticketId, lottoNumbers);
    dbService.insertWinningNumbers(ticketId, [1, 2, 3, 4, 5, 6], 7);

    let tickets = dbService.selectAllTickets();
    expect(tickets).toHaveLength(1);
    expect(tickets[0].amount).toBe(5000);

    dbService.rollback();

    tickets = dbService.selectAllTickets();
    expect(tickets).toHaveLength(0);
  });

  test("커밋 시 모든 데이터 저장", () => {
    dbService.beginTransaction();

    const ticketId = dbService.insertLottoTicket(3000, 3);
    const lottoNumbers = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
    ];
    dbService.insertLotto(ticketId, lottoNumbers);
    dbService.insertWinningNumbers(ticketId, [1, 2, 3, 4, 5, 6], 7);
    dbService.insertMatchResult(
      ticketId,
      { 1: 1, 2: 0, 3: 0, 4: 1, 5: 1 },
      2005000,
      668.33
    );

    dbService.commit();

    const tickets = dbService.selectAllTickets();
    expect(tickets).toHaveLength(1);
    expect(tickets[0].amount).toBe(3000);

    const ticket = dbService.selectTicketDetail(ticketId);
    expect(ticket.ticket_count).toBe(3);

    const lotto = dbService.selectLottoNumbers(ticketId);
    expect(lotto).toHaveLength(3);

    const winning = dbService.selectWinningNumbers(ticketId);
    expect(winning.bonus_number).toBe(7);

    const matchResult = dbService.selectMatchResult(ticketId);
    expect(matchResult.rank_1).toBe(1);
    expect(matchResult.total_prize).toBe(2005000);
  });

  test("FK 제약 조건 위반시 롤백으로 데이터 무결성 보장", () => {
    try {
      dbService.beginTransaction();

      const ticketId = dbService.insertLottoTicket(2000, 2);
      dbService.insertLotto(ticketId, [
        [1, 2, 3, 4, 5, 6],
        [7, 8, 9, 10, 11, 12],
      ]);

      dbService.insertWinningNumbers(99999, [1, 2, 3, 4, 5, 6], 7);

      dbService.commit();
    } catch (error) {
      dbService.rollback();
    }

    const tickets = dbService.selectAllTickets();
    expect(tickets).toHaveLength(0);
  });
});
