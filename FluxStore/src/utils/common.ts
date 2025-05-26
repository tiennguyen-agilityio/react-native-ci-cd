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

export const toggleItem = (array: string[], item: string): string[] => {
  const index = array.indexOf(item);
  if (index !== -1) {
    return array.filter((_, i) => i !== index);
  } else {
    return [...array, item];
  }
};
