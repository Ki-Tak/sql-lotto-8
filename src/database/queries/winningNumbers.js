const WINNING_NUMBERS_QUERY = {
  INSERT:
    "INSERT INTO winning_numbers (ticket_id, numbers, bonus_number) VALUES (?, ?, ?)",
  SELECT_ALL: "SELECT * FROM winning_numbers WHERE ticket_id = ?",
};
export default WINNING_NUMBERS_QUERY;
