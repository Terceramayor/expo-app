export const getSignFromCurrency = (currency: string) => {
  switch (currency) {
    case "EUR":
      return "€";
    default:
      return;
  }
};
