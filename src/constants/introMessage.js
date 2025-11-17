const createTitleTemplate = (content) => `=== ${content} ===\n`;

const INTRO_MESSAGE = {
  TITLE_TEMPLATE: (content) => `=== ${content} ===\n`,
  MENU_TITLE: createTitleTemplate("로또 게임"),
  PURCHASE_MENU: `1. 로또 구매\n`,
  CHECK_MENU: `2. 로또 조회\n`,
  DELETE_MENU: `3. 로또 삭제\n`,
  EXIT_MENU: `4. 종료\n`,
  LOTTO_COUNT: (count) => `\n로또 번호 (총 ${count}개):\n`,
  WINNING_TITLE: "\n당첨 통계\n---",
  RANK_FIFTH: (count) => `3개 일치 (5,000원) - ${count}개`,
  RANK_FOURTH: (count) => `4개 일치 (50,000원) - ${count}개`,
  RANK_THIRD: (count) => `5개 일치 (1,500,000원) - ${count}개`,
  RANK_SECOND: (count) =>
    `5개 일치, 보너스 볼 일치 (30,000,000원) - ${count}개`,
  RANK_FIRST: (count) => `6개 일치 (2,000,000,000원) - ${count}개`,
  RETURN_ON_INVESTMENT: (rate) => `총 수익률은 ${rate}%입니다.`,
  STORE_TICKET_TITLE: createTitleTemplate("저장된 티켓"),
  STORE_TICKET_INFO: (index, ticket_id, amount, count) =>
    `${index}. 티켓 #${ticket_id} (${amount}원, ${count}개)`,
  TICKET_DETAIL_TITLE: createTitleTemplate("티켓 상세 정보"),
  TICKET_DETAIL_AMOUNT: (amount) => `구매 금액: ${amount}원`,
  TICKET_DETAIL_DATE: (date) => `구매 날짜: ${date}\n`,
  TICKET_DETAIL_WINNING: (winningNumbers) => `\n당첨 번호: [${winningNumbers}]`,
  TICKET_DETAIL_BONUS: (bonusNumber) => `보너스 번호: ${bonusNumber}`,
  DELETE_TICKET: (ticket_id) => `티켓 #${ticket_id}이(가) 삭제되었습니다.`,
  EXIT_PROGRAM: "프로그램을 종료합니다.",
};
export default INTRO_MESSAGE;
