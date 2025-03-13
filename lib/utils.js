export const currencyFormatter = (amount) => {
  const formatter = Intl.NumberFormat("en-US", {
    currency: "ZAR",
    style: "currency",
  });

  return formatter.format(amount);
};
