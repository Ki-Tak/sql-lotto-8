const LOTTO_QUERY = {
  INSERT: "INSERT INTO lotto (ticket_id, numbers) VALUES (?, ?)",
  SELECT_NUMBERS: "SELECT numbers FROM lotto WHERE ticket_id = ? ORDER BY id",
};
export default LOTTO_QUERY;
