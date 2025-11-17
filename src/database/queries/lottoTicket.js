const LOTTO_TICKET_QUERY = {
  INSERT: "INSERT INTO lotto_ticket (amount, ticket_count) VALUES (?, ?)",
  DELETE: "DELETE FROM lotto_ticket WHERE id = ?",
  SELETE_ALL: "SELECT * FROM lotto_ticket ORDER BY created_at",
  SELETE_DETAIL:
    "SELECT t.id, t.amount, t.ticket_count, t.created_at, COUNT(l.id) as lotto_count FROM lotto_ticket t LEFT JOIN lotto l ON t.id = l.ticket_id WHERE t.id = ? GROUP BY t.id",
};
export default LOTTO_TICKET_QUERY;
