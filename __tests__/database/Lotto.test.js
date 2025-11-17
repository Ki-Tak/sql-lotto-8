import { createTestDatabase, MOCK_DATA } from "./setup.js";

describe("로또 번호 DB 테스트", () => {
  let dbService;

  beforeEach(() => {
    dbService = createTestDatabase();
  });

  afterEach(() => {
    dbService.close();
  });

  test("5개의 로또 번호를 저장하는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_5000,
      MOCK_DATA.TICKET_COUNT_5
    );
    dbService.insertLotto(ticketId, MOCK_DATA.LOTTO_5);
    const lotto = dbService.selectLottoNumbers(ticketId);
    expect(lotto.length).toBe(MOCK_DATA.TICKET_COUNT_5);
  });

  test("8개의 로또 번호를 저장하는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_8000,
      MOCK_DATA.TICKET_COUNT_8
    );
    dbService.insertLotto(ticketId, MOCK_DATA.LOTTO_8);
    const lotto = dbService.selectLottoNumbers(ticketId);
    expect(lotto.length).toBe(MOCK_DATA.TICKET_COUNT_8);
  });

  test("로또 번호를 저장하고 조회하는 경우", () => {
    const ticketId = dbService.insertLottoTicket(
      MOCK_DATA.AMOUNT_5000,
      MOCK_DATA.TICKET_COUNT_5
    );
    dbService.insertLotto(ticketId, MOCK_DATA.LOTTO_5);
    const lotto = dbService.selectLottoNumbers(ticketId);
    lotto.forEach((lotto, index) => {
      const parsed = JSON.parse(lotto.numbers);
      expect(parsed).toEqual(MOCK_DATA.LOTTO_5[index]);
    });
  });
});
