export const formatAmount = (number: number) => {
  if (number) {
    if (Number.isInteger(number)) {
      return number.toLocaleString('en-US');
    } else {
      return number.toLocaleString('en-US', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    }
  }
  return 0;
};
