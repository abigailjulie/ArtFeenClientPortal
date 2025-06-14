export const CURRENCY_REGEX = /^\d{1,3}(,\d{3})*(\.\d{0,2})?$/;

export const formatCurrency = (value) => {
  if (value === null || value === undefined) return "$0.00";

  const numericValue = value.toString().replace(/[^\d.]/g, "");

  if (!numericValue || numericValue === ".") return "$0.00";

  const [integerPart, decimalPart] = numericValue.split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (decimalPart !== undefined) {
    const limitedDecimal = decimalPart.slice(0, 2).padEnd(2, "0");
    return `$${formattedInteger}.${limitedDecimal}`;
  }

  return `$${formattedInteger}.00`;
};

export const parseCurrency = (formattedValue) => {
  if (!formattedValue) return 0;

  const numericValue = formattedValue.toString().replace(/,/g, "");
  return parseFloat(numericValue) || 0;
};

export const isValidCurrency = (value) => {
  if (!value) return true;
  return CURRENCY_REGEX.test(value);
};
