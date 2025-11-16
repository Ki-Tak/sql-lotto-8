import { DatabaseService } from "../src/services/index.js";

describe("데이터베이스 서비스 테스트", () => {
  let dbService;

  beforeEach(() => {
    dbService = new DatabaseService("test.db", { memory: true }); // 테스트 코드라 인메모리로 사용
  });

  afterEach(() => {
    dbService.close();
  });
});
