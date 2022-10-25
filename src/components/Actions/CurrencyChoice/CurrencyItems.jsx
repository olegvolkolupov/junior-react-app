import { useQuery } from "@apollo/client";
import { GET_CURRENCIES } from "../../../services/API/queryConsts";

export default function CurrencyItems({
  onCurrencyItemClick,
  currencyItemStyle,
}) {
  const { loading, error, data } = useQuery(GET_CURRENCIES);

  if (loading) return <p>Loading...</p>;
  if (error) return `Error! ${error.message}`;

  return data.currencies.map((currency, idx) => (
    <li
      key={currency.label}
      className={currencyItemStyle}
      data-index={idx}
      onClick={onCurrencyItemClick}
    >
      {currency.symbol} {currency.label}
    </li>
  ));
}
