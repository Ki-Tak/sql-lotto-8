import { PRIZE } from "../constants/index.js";

class LottoGameService {
  analyzeTicket(lottoNumbers, winningNumbers) {
    const rankCount = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    lottoNumbers.forEach((lotto) => {
      const matchCount = winningNumbers.countMatch(lotto.getNumbers());
      const isBonusMatch = winningNumbers.hasBonusMatch(lotto.getNumbers());
      this.#updateRank(rankCount, matchCount, isBonusMatch);
    });

    const totalPrize = this.#calculateTotalPrize(rankCount);
    return { rankCount, totalPrize };
  }

  #updateRank(rankCount, matchCount, isBonusMatch) {
    if (matchCount === 6) rankCount++;
    if (matchCount === 5 && isBonusMatch) rankCount++;
    if (matchCount === 5) rankCount++;
    if (matchCount === 4) rankCount++;
    if (matchCount === 3) rankCount++;
  }

  #calculateTotalPrize(rankCount) {
    let total = 0;
    Object.entries(rankCount).forEach(([rank, count]) => {
      total += PRIZE[rank] * count;
    });
    return total;
  }

  calculateReturnRate(totalPrize, amount) {
    return ((totalPrize / amount) * 100).toFixed(1);
  }
}

export default LottoGameService;
