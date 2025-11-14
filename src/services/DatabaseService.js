import Database from "better-sqlite3";

class DatabaseService {
  #db;

  constructor(dbPath = "lotto.db") {
    this.#db = new Database(dbPath);
    this.#db.pragma("journal_mode = WAL"); // WAL 프라그마 활성화
    this.#initializeTables();
  }

  #initializeTables() {
    this.#db.exec(`
      CREATE TABLE IF NOT EXISTS lotto_ticket (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount INTEGER NOT NULL,
        ticket_count INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS lotto (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_id INTEGER NOT NULL,
        numbers TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ticket_id) REFERENCES lotto_ticket(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS winning_numbers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_id INTEGER NOT NULL UNIQUE,
        numbers TEXT NOT NULL,
        bonus_number INTEGER NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ticket_id) REFERENCES lotto_ticket(id) ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS match_result (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_id INTEGER NOT NULL UNIQUE,
        rank_1 INTEGER DEFAULT 0,
        rank_2 INTEGER DEFAULT 0,
        rank_3 INTEGER DEFAULT 0,
        rank_4 INTEGER DEFAULT 0,
        rank_5 INTEGER DEFAULT 0,
        total_prize INTEGER DEFAULT 0,
        return_rate REAL DEFAULT 0.0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ticket_id) REFERENCES lotto_ticket(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_lotto_ticket_id ON lotto(ticket_id);
      CREATE INDEX IF NOT EXISTS idx_winning_numbers_ticket_id ON winning_numbers(ticket_id);
      CREATE INDEX IF NOT EXISTS idx_match_result_ticket_id ON match_result(ticket_id);
    `);
  }

  insertTicket(amount, ticketCount) {
    const sql = "INSERT INTO lotto_ticket (amount,ticket_count) VALUES (?, ?)";
    return this.#db.prepare(sql).run(amount, ticketCount).lastInsertRowid;
  }

  insertLotto(ticketId, lottoNumbers) {
    const sql = "INSERT INTO lotto (ticket_id, numbers) VALUES (?, ?)";
    lottoNumbers.forEach((numbers) => {
      this.#db.prepare(sql).run(ticketId, JSON.stringify(numbers));
    });
  }

  insertWinningNumbers(ticketId, numbers, bonusNumber) {
    const sql =
      "INSERT INTO winning_numbers (ticket_id, numbers, bonus_number) VALUES (?, ?, ?)";
    return this.#db
      .prepare(sql)
      .run(ticketId, JSON.stringify(numbers), bonusNumber).lastInsertRowid;
  }

  insertMatchResult(ticketId, rankCount, totalPrize, returnRate) {
    const sql = `INSERT INTO match_result 
               (ticket_id, rank_1, rank_2, rank_3, rank_4, rank_5, total_prize, return_rate)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    this.#db
      .prepare(sql)
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
}
export default DatabaseService;
