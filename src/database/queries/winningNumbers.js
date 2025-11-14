const WINNING_NUMBERS_QUERY = {
  INSERT:
    "INSERT INTO winning_numbers (ticket_id, numbers, bonus_number) VALUES (?, ?, ?)",
};
export default WINNING_NUMBERS_QUERY;
