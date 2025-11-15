const MATCH_RESULT_QUERY = {
  INSERT: `INSERT INTO match_result 
    (ticket_id, rank_1, rank_2, rank_3, rank_4, rank_5, total_prize, return_rate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
  SELECT_ALL: "SELECT * FROM match_result WHERE ticket_id = ?",
};
export default MATCH_RESULT_QUERY;
