export const CURRENCY_UNIT = '$';

export const REGEX = {
  EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  CHECK_NUMBER: /.*[0-9].*/,
  CHECK_UPPERCASE: /[A-Z]/,
  CHECK_SYMBOL: /.*[!@#$%^&+=*].*/,
};
