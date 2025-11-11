import { MissionUtils } from "@woowacourse/mission-utils";
import { LOTTO_RULE } from "../constants/index.js";

const getRandomNumber = () => {
  return MissionUtils.Random.pickUniqueNumbersInRange(
    LOTTO_RULE.RANDOM_NUMBER_MIN,
    LOTTO_RULE.RANDOM_NUMBER_MAX,
    LOTTO_RULE.LOTTO_LENGTH
  );
};

export default getRandomNumber;
