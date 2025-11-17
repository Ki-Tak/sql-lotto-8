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

  static printWinningResult(rank_1, rank_2, rank_3, rank_4, rank_5, rate) {
    MissionUtils.Console.print(INTRO_MESSAGE.WINNING_TITLE);
    MissionUtils.Console.print(INTRO_MESSAGE.RANK_FIFTH(rank_5));
    MissionUtils.Console.print(INTRO_MESSAGE.RANK_FOURTH(rank_4));
    MissionUtils.Console.print(INTRO_MESSAGE.RANK_THIRD(rank_3));
    MissionUtils.Console.print(INTRO_MESSAGE.RANK_SECOND(rank_2));
    MissionUtils.Console.print(INTRO_MESSAGE.RANK_FIRST(rank_1));
    MissionUtils.Console.print(INTRO_MESSAGE.RETURN_ON_INVESTMENT(rate));
    MissionUtils.Console.print("\n");
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
    MissionUtils.Console.print("\n");
  }

  static printTicketInformation(
    ticket,
    lottoNumbers,
    winningNumbers,
    bonusNumber
  ) {
    MissionUtils.Console.print(INTRO_MESSAGE.TICKET_DETAIL_TITLE);
    MissionUtils.Console.print(
      INTRO_MESSAGE.TICKET_DETAIL_AMOUNT(ticket.amount)
    );
    MissionUtils.Console.print(
      INTRO_MESSAGE.TICKET_DETAIL_DATE(ticket.created_at)
    );
    this.printLottoNumbers(lottoNumbers);
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

  static printError(errorMessage) {
    MissionUtils.Console.print(errorMessage);
  }
}

export default OutputView;
