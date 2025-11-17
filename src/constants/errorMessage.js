const ERROR_MESSAGE = {
  // 로또 번호 관련
  INVALID_LOTTO_NUMBERS_LENGTH: "[ERROR] 로또 번호는 6개여야 합니다.",
  INVALID_LOTTO_NUMBERS_RANGE:
    "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.",
  DUPLICATE_LOTTO_NUMBERS: "[ERROR] 로또 번호에 중복된 숫자가 있습니다.",

  // 구입 금액 관련
  INVALID_PURCHASE_AMOUNT_UNIT: "[ERROR] 구입 금액은 1,000원 단위여야 합니다.",
  INVALID_PURCHASE_AMOUNT_TYPE: "[ERROR] 구입 금액은 숫자여야 합니다.",
  EMPTY_PURCHASE_AMOUNT: "[ERROR] 구입 금액을 입력해주세요.",

  // 당첨 번호 관련
  INVALID_WINNING_NUMBERS_LENGTH: "[ERROR] 당첨 번호는 6개여야 합니다.",
  INVALID_WINNING_NUMBERS_RANGE:
    "[ERROR] 로또 번호는 1부터 45 사이의 숫자여야 합니다.",
  DUPLICATE_WINNING_NUMBERS: "[ERROR] 당첨 번호에 중복된 숫자가 있습니다.",
  INVALID_WINNING_NUMBERS_TYPE: "[ERROR] 당첨 번호는 숫자여야 합니다.",

  // 보너스 번호 관련
  INVALID_BONUS_NUMBER_RANGE:
    "[ERROR] 보너스 번호는 1부터 45 사이의 숫자여야 합니다.",
  DUPLICATE_BONUS_NUMBER:
    "[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.",
  INVALID_BONUS_NUMBER_TYPE: "[ERROR] 보너스 번호는 숫자여야 합니다.",
  ORDER_WINNING_BEFORE_BONUS:
    "[ERROR] 보너스 번호는 당첨 번호 입력 후에만 입력할 수 있습니다.",

  // 메뉴 입력 관련
  INVALID_MENU_NUMBER: "[ERROR] 메뉴는 1번부터 4번까지 존재합니다.",
  EMPTY_TICKET: "[ERROR] 저장한 티켓이 존재하지 않습니다.",
  INVALID_TICKET_NUMBER: "[ERROR] 유효하지 않는 티켓 번호입니다.",

  // 트렌젝션 관련
  INVALID_TRANSACTION_EXIT:
    "[ERROR] 데이터 저장이 정상적으로 종료되지 않았습니다.",
};

export default ERROR_MESSAGE;
