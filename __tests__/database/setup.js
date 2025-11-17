import { DatabaseService } from "../../src/services/index.js";

export const MOCK_DATA = {
  LOTTO_8: [
    [8, 21, 23, 41, 42, 43],
    [3, 5, 11, 16, 32, 38],
    [7, 11, 16, 35, 36, 44],
    [1, 8, 11, 31, 41, 42],
    [13, 14, 16, 38, 42, 45],
    [7, 11, 30, 40, 42, 43],
    [2, 13, 22, 32, 38, 45],
    [1, 3, 5, 14, 22, 45],
  ],
  LOTTO_5: [
    [8, 21, 23, 41, 42, 43],
    [3, 5, 11, 16, 32, 38],
    [7, 11, 16, 35, 36, 44],
    [1, 8, 11, 31, 41, 42],
    [13, 14, 16, 38, 42, 45],
  ],
  AMOUNT_8000: 8000,
  TICKET_COUNT_8: 8,
  AMOUNT_5000: 5000,
  TICKET_COUNT_5: 5,
  WINNING_NUMBERS: [1, 2, 3, 4, 5, 6],
  BONUS_NUMBER: 7,
  RANK_COUNT: { 1: 0, 2: 0, 3: 1, 4: 0, 5: 1 },
  TOTAL_PRIZE: 1505000,
  RETURN_RATE: 18.81,
};

export const createTestDatabase = () => {
  return new DatabaseService({ memory: true });
};

export const setupFullData = (dbService, ticketId) => {
  dbService.insertLotto(ticketId, MOCK_DATA.LOTTO_8);
  dbService.insertWinningNumbers(
    ticketId,
    MOCK_DATA.WINNING_NUMBERS,
    MOCK_DATA.BONUS_NUMBER
  );
  dbService.insertMatchResult(
    ticketId,
    MOCK_DATA.RANK_COUNT,
    MOCK_DATA.TOTAL_PRIZE,
    MOCK_DATA.RETURN_RATE
  );
};
