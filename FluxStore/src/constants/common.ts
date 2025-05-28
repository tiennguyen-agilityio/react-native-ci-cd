export const CURRENCY_UNIT = '$';

export const REGEX = {
  EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
  CHECK_NUMBER: /.*[0-9].*/,
  CHECK_UPPERCASE: /[A-Z]/,
  CHECK_SYMBOL: /.*[!@#$%^&+=*].*/,
};

export const INIT_PAGE = 1;

export const PAGE_SIZE = 10;

export const DEEP_LINK_PATH_PREFIX = 'fluxstore://';
