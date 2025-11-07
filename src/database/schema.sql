-- SQLite는 배열 타입을 지원하지 않아서 numbers를 TEXT 타입으로 저장
-- 이후에 JSON 형식으로 저장해야함 

-- 로또 티켓 테이블
CREATE TABLE IF NOT EXISTS lotto_ticket (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount INTEGER NOT NULL,
    ticket_count INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 로또 번호 테이블
CREATE TABLE IF NOT EXISTS lotto (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id INTEGER NOT NULL,
    numbers TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (ticket_id) REFERENCES lotto_ticket(id) ON DELETE CASCADE
);

-- 당첨 번호 및 보너스 번호 테이블
CREATE TABLE IF NOT EXISTS winning_numbers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    numbers TEXT NOT NULL,
    bonus_number INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 매칭 결과 테이블 
-- 구현하면서 더 고민해봐야 함
-- 정말 필요한 테이블인지 아니면 다른 테이블의 조합으로 대체 가능한지
CREATE TABLE IF NOT EXISTS match_result (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lotto_id INTEGER NOT NULL,
    winning_id INTEGER NOT NULL,
    match_count INTEGER NOT NULL,
    has_bonus INTEGER NOT NULL DEFAULT 0,
    rank INTEGER,
    prize INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (lotto_id) REFERENCES lotto(id) ON DELETE CASCADE,
    FOREIGN KEY (winning_id) REFERENCES winning_numbers(id) ON DELETE CASCADE
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_lotto_ticket_id ON lotto(ticket_id);

-- 추후, 매칭 결과 테이블 변경시 같이 변경  
CREATE INDEX IF NOT EXISTS idx_match_result_lotto_id ON match_result(lotto_id);
CREATE INDEX IF NOT EXISTS idx_match_result_winning_id ON match_result(winning_id);