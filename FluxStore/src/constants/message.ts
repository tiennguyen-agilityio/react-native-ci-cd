export const ERROR_MESSAGES = {
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required`,
  FIELD_INVALID: (fieldName: string) => `Invalid format of ${fieldName}`,
  PASSWORD_NOT_LONG: 'Your password must be at least 8 characters long',
  PASSWORD_NOT_MATCH: 'Password and Confirm password do not match',
  PASSWORD_NOT_HAVE_NUMBER: 'Your password must contain at least one number',
  PASSWORD_NOT_HAVE_UPPERCASE: 'Your password must contain at least one uppercase character',
  PASSWORD_NOT_HAVE_SYMBOL: 'Your password must contain at least one special character',
  LOGIN_FAILED: 'Email or password is incorrect!',
};

export const SUCCESS_MESSAGES = {
  ADDED: (name: string) => `${name} has been added successfully`,
  UPDATED: (name: string) => `${name} has been updated successfully`,
  DELETED: (name: string) => `${name} has been deleted successfully`,
  CHANGE: (name: string) => `${name} has been changed successfully`,
};

export const WARNING_MESSAGES = {
  MODIFIED: 'The information has been modified since the original submissionn',
};
