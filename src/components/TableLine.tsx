import React, { useState } from 'react';
import PercentChange from './PercentChange';
import StarIcon from './StarIcon';
import CoinChart from './CoinChart';

// Typage des props
interface TableLineProps {
  coin: {
    id: string;
    name: string;
    symbol: string;
    image: string;
    current_price: number;
    market_cap: number | null;
    total_volume: number;
    price_change_percentage_1h_in_currency: number | null;
    price_change_percentage_24h_in_currency: number | null;
    price_change_percentage_7d_in_currency: number | null;
    price_change_percentage_30d_in_currency: number | null;
    price_change_percentage_200d_in_currency: number | null;
    price_change_percentage_1y_in_currency: number | null;
    ath_change_percentage: number;
  };
  index: number;
}

const TableLine: React.FC<TableLineProps> = ({ coin, index }) => {
  const [showChart, setShowChart] = useState<boolean>(false);

  // Fonction pour formater le prix
  const priceFormater = (num: number): string => {
    if (Math.round(num).toString().length < 4) {
      return new Intl.NumberFormat('us-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 7,
      }).format(num);
    } else {
      return num.toString();
    }
  };

  // Fonction pour formater la capitalisation boursière
  const mktCapFormater = (num: number | null): string => {
    if (!num || isNaN(num)) return 'Donnée indisponible';
    const formattedValue = (num / 1_000_000).toFixed(2); // Divise par 1M pour obtenir "M$"
    return Number(formattedValue).toLocaleString('us-US'); // Ajoute des séparateurs
  };

  return (
    <div className="table-line">
      <div className="infos-container">
        <StarIcon coinId={coin.id} />
        <p>{index + 1}</p>
        <div className="img">
          <img src={coin.image} alt="logo" height="20" />
        </div>
        <div className="infos">
          <div
            className="chart-img"
            onMouseEnter={() => setShowChart(true)}
            onMouseLeave={() => setShowChart(false)}
          >
            <img src="./assets/chart-icon.svg" alt="chart-icon" />
            <div className="chart-container" id={coin.name}>
              {showChart && <CoinChart coinId={coin.id} coinName={coin.name} />}
            </div>
          </div>
          <h4>{coin.name}</h4>
          <span>- {coin.symbol.toUpperCase()}</span>
          <a
            target="_blank"
            href={
              'https://www.coingecko.com/fr/pi%C3%A8ces/' +
              coin.id.toLowerCase()
            }
          >
            <img src="./assets/info-icon.svg" alt="info-icon" />
          </a>
        </div>
      </div>
      <p>{priceFormater(coin.current_price)} $</p>
      <p className="mktcap">{mktCapFormater(coin.market_cap)} M$</p>
      <p className="volume">{coin.total_volume.toLocaleString()} $</p>
      <PercentChange percent={coin.price_change_percentage_1h_in_currency} />
      <PercentChange percent={coin.price_change_percentage_24h_in_currency} />
      <PercentChange percent={coin.price_change_percentage_7d_in_currency} />
      <PercentChange percent={coin.price_change_percentage_30d_in_currency} />
      <PercentChange percent={coin.price_change_percentage_200d_in_currency} />
      <PercentChange percent={coin.price_change_percentage_1y_in_currency} />
      {coin.ath_change_percentage > -3 ? (
        <p>ATH !</p>
      ) : (
        <PercentChange percent={coin.ath_change_percentage} />
      )}
    </div>
  );
};

export default TableLine;
