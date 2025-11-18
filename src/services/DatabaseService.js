import Database from "better-sqlite3";
import {
  LOTTO_TICKET_QUERY,
  LOTTO_QUERY,
  WINNING_NUMBERS_QUERY,
  MATCH_RESULT_QUERY,
  TRANSACTION_QUERY,
} from "../database/queries/index.js";
import { INIT_TABLE } from "../database/schema/index.js";

class DatabaseService {
  #db;

  constructor(options = {}) {
    const { path = "lotto.db", memory = false } = options;

    if (memory) {
      this.#db = new Database(":memory:");
    } else {
      this.#db = new Database(path);
    }

    this.#db.pragma("journal_mode = WAL"); // WAL 프라그마 활성화
    this.#initializeTables();
  }

  #initializeTables() {
    this.#db.exec(INIT_TABLE);
  }

  beginTransaction() {
    this.#db.prepare(TRANSACTION_QUERY.BEGIN).run();
  }

  commit() {
    this.#db.prepare(TRANSACTION_QUERY.COMMIT).run();
  }

  rollback() {
    this.#db.prepare(TRANSACTION_QUERY.ROLLBACK).run();
  }

  executeInTransaction(callback) {
    try {
      this.beginTransaction();
      const result = callback();
      this.commit();
      return result;
    } catch (error) {
      this.rollback();
      throw new Error(ERROR_MESSAGE.INVALID_TRANSACTION_EXIT);
    }
  }

  insertLottoTicket(amount, ticketCount) {
    return this.#db.prepare(LOTTO_TICKET_QUERY.INSERT).run(amount, ticketCount)
      .lastInsertRowid;
  }

  insertLotto(ticketId, lottoNumbers) {
    lottoNumbers.forEach((numbers) => {
      this.#db
        .prepare(LOTTO_QUERY.INSERT)
        .run(ticketId, JSON.stringify(numbers));
    });
  }

  insertWinningNumbers(ticketId, numbers, bonusNumber) {
    return this.#db
      .prepare(WINNING_NUMBERS_QUERY.INSERT)
      .run(ticketId, JSON.stringify(numbers), bonusNumber).lastInsertRowid;
  }

  insertMatchResult(ticketId, rankCount, totalPrize, returnRate) {
    this.#db
      .prepare(MATCH_RESULT_QUERY.INSERT)
      .run(
        ticketId,
        rankCount[1],
        rankCount[2],
        rankCount[3],
        rankCount[4],
        rankCount[5],
        totalPrize,
        returnRate
      );
  }

  deleteLottoTicket(ticketId) {
    this.#db.prepare(LOTTO_TICKET_QUERY.DELETE).run(ticketId);
  }

  selectAllTickets() {
    return this.#db.prepare(LOTTO_TICKET_QUERY.SELETE_ALL).all();
  }

  selectTicketDetail(ticketId) {
    return this.#db.prepare(LOTTO_TICKET_QUERY.SELETE_DETAIL).get(ticketId);
  }

  selectLottoNumbers(ticketId) {
    return this.#db.prepare(LOTTO_QUERY.SELECT_NUMBERS).all(ticketId);
  }

  selectWinningNumbers(ticketId) {
    return this.#db.prepare(WINNING_NUMBERS_QUERY.SELECT_DETAIL).get(ticketId);
  }

  selectMatchResult(ticketId) {
    return this.#db.prepare(MATCH_RESULT_QUERY.SELECT_DETAIL).get(ticketId);
  }

  close() {
    if (this.#db) {
      this.#db.close();
    }
  }
}
export default DatabaseService;
