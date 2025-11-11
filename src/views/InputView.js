import { MissionUtils } from "@woowacourse/mission-utils";
import { INPUT_MESSAGE } from "../constants/index.js";

class InputView {
  static async inputSelectMenu() {
    const input = await MissionUtils.Console.readLineAsync(
      INPUT_MESSAGE.INPUT_SELECT_MENU
    );
    return input;
  }

  static async inputPurchaseAmount() {
    const input = await MissionUtils.Console.readLineAsync(
      INPUT_MESSAGE.INPUT_AMOUNT
    );
    return input;
  }

  static async inputWinningNumbers() {
    const input = await MissionUtils.Console.readLineAsync(
      INPUT_MESSAGE.INPUT_WINNING_NUMBERS
    );
    return input;
  }

  static async inputBonusNumber() {
    const input = await MissionUtils.Console.readLineAsync(
      INPUT_MESSAGE.INPUT_BONUS_NUMBER
    );
    return input;
  }

  static async inputSelectTicket() {
    const input = await MissionUtils.Console.readLineAsync(
      INPUT_MESSAGE.INPUT_CHECK_TICKET
    );
    return input;
  }

  static async inputSelectDeleteTicket() {
    const input = await MissionUtils.Console.readLineAsync(
      INPUT_MESSAGE.INPUT_DELETE_TICKET
    );
    return input;
  }
}

export default InputView;
