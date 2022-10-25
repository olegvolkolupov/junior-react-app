import Types from "../types";

export let setCurrencyId = (currencyId) => {
  return {
    type: Types.CURRENCY_ID,
    payload: currencyId,
  };
};

export let setCurrencySymbol = (symbol) => {
  return {
    type: Types.CURRENCY_SYMBOL,
    payload: symbol,
  };
};