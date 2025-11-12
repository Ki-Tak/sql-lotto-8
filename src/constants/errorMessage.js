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
};

export default ERROR_MESSAGE;
