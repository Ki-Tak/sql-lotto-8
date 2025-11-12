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
    ticket_id INTEGER NOT NULL UNIQUE,
    numbers TEXT NOT NULL,
    bonus_number INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    FOREIGN KEY (ticket_id) REFERENCES lotto_ticket(id) ON DELETE CASCADE
);

-- 매칭 결과 테이블 
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
    FOREIGN KEY (ticket_id) REFERENCES lotto_ticket(id) ON DELETE CASCADE,
);

-- 인덱스 생성
CREATE INDEX IF NOT EXISTS idx_lotto_ticket_id ON lotto(ticket_id);
CREATE INDEX IF NOT EXISTS idx_winning_numbers_ticket_id ON winning_numbers(ticket_id);
CREATE INDEX IF NOT EXISTS idx_match_result_ticket_id ON match_result(ticket_id);
