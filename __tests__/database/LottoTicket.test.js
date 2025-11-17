import { createTestDatabase, MOCK_DATA } from "./setup.js";

describe("로또 티켓 DB 테스트", () => {
  let dbService;

  beforeEach(() => {
    dbService = createTestDatabase();
  });

  afterEach(() => {
    dbService.close();
  });

  test("2개의 티켓을 저장하는 경우", () => {
    dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_5000,
      MOCK_DATA.TICKET_COUNT_5
    );
    const allTickets = dbService.selectAllTickets();
    expect(allTickets.length).toBe(2);
  });

  test("1개의 티켓을 저장하고 조회하는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    const ticket = dbService.selectTicketDetail(ticketId);
    expect(ticket.amount).toBe(MOCK_DATA.AMOUNT_8000);
    expect(ticket.ticket_count).toBe(MOCK_DATA.TICKET_COUNT_8);
  });

  test("2개의 티켓을 저장하고 조회하는 경우", () => {
    const ticket1Id = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    const ticket2Id = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_5000,
      MOCK_DATA.TICKET_COUNT_5
    );

    const ticket1 = dbService.selectTicketDetail(ticket1Id);
    const ticket2 = dbService.selectTicketDetail(ticket2Id);

    expect(ticket1.amount).toBe(MOCK_DATA.AMOUNT_8000);
    expect(ticket1.ticket_count).toBe(MOCK_DATA.TICKET_COUNT_8);
    expect(ticket2.amount).toBe(MOCK_DATA.AMOUNT_5000);
    expect(ticket2.ticket_count).toBe(MOCK_DATA.TICKET_COUNT_5);
  });
});
