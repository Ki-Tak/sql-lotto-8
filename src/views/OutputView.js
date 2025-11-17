import { MissionUtils } from "@woowacourse/mission-utils";
import { INTRO_MESSAGE } from "../constants/index.js";

class OutputView {
  static printMainMenu() {
    MissionUtils.Console.print(INTRO_MESSAGE.MENU_TITLE);
    MissionUtils.Console.print(INTRO_MESSAGE.PURCHASE_MENU);
    MissionUtils.Console.print(INTRO_MESSAGE.CHECK_MENU);
    MissionUtils.Console.print(INTRO_MESSAGE.DELETE_MENU);
    MissionUtils.Console.print(INTRO_MESSAGE.EXIT_MENU);
  }

  static printLottoCount(count) {
    MissionUtils.Console.print(INTRO_MESSAGE.LOTTO_COUNT(count));
  }

  static printLottoNumbers(lottoNumbers) {
    lottoNumbers.forEach((lotto) => {
      MissionUtils.Console.print(`[${lotto.join(", ")}]`);
    });
  }

  static printWinningResult(rankCount, rate) {
    MissionUtils.Console.print(INTRO_MESSAGE.WINNING_TITLE);
    MissionUtils.Console.print(INTRO_MESSAGE.RANK_FIFTH(rankCount[5]));
    MissionUtils.Console.print(INTRO_MESSAGE.RANK_FOURTH(rankCount[4]));
    MissionUtils.Console.print(INTRO_MESSAGE.RANK_THIRD(rankCount[3]));
    MissionUtils.Console.print(INTRO_MESSAGE.RANK_SECOND(rankCount[2]));
    MissionUtils.Console.print(INTRO_MESSAGE.RANK_FIRST(rankCount[1]));
    MissionUtils.Console.print(INTRO_MESSAGE.RETURN_ON_INVESTMENT(rate));
  }

  static printStoreTickets(tickets) {
    MissionUtils.Console.print(INTRO_MESSAGE.STORE_TICKET_TITLE);
    tickets.forEach((ticket, index) => {
      MissionUtils.Console.print(
        INTRO_MESSAGE.STORE_TICKET_INFO(
          index + 1,
          ticket.id,
          ticket.amount,
          ticket.ticket_count
        )
      );
    });
  }

  static printTicketDetail(amount, date, winningNumbers, bonusNumber) {
    MissionUtils.Console.print(INTRO_MESSAGE.TICKET_DETAIL_TITLE);
    MissionUtils.Console.print(INTRO_MESSAGE.TICKET_DETAIL_AMOUNT(amount));
    MissionUtils.Console.print(INTRO_MESSAGE.TICKET_DETAIL_DATE(date));
    // TODO: 로또 번호 배열 출력하기
    MissionUtils.Console.print(
      INTRO_MESSAGE.TICKET_DETAIL_WINNING(winningNumbers)
    );
    MissionUtils.Console.print(INTRO_MESSAGE.TICKET_DETAIL_BONUS(bonusNumber));
  }

  static printDeleteTicket(ticketId) {
    MissionUtils.Console.print(INTRO_MESSAGE.DELETE_TICKET(ticketId));
  }

  static printExitMessage() {
    MissionUtils.Console.print(INTRO_MESSAGE.EXIT_PROGRAM);
  }
}

export default OutputView;
