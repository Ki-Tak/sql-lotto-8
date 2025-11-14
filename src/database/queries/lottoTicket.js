const LOTTO_TICKET_QUERY = {
  INSERT: "INSERT INTO lotto_ticket (amount, ticket_count) VALUES (?, ?)",
  DELETE: "DELETE FROM lotto_ticket WHERE id = ?",
};
export default LOTTO_TICKET_QUERY;
