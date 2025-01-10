import React, { useState } from 'react';
import TableLine from './TableLine';
import ToTop from './ToTop';

const Table: React.FC = ({ coinsData }) => {
  const [rangeNumber, setRangeNumber] = useState(100);
  const [orderBy, setOrderBy] = useState('');

  const tableHeader = [
    'Prix',
    'MarketCap',
    'Volume',
    '1h',
    '24h',
    '7j',
    '1m',
    '6m',
    '1a',
    'ATH',
  ];

  return (
    <div className="table-container">
      <ul className="table-header">
        <div className="range-container">
          <span>
            Top{' '}
            <input
              type="text"
              value={rangeNumber}
              onChange={(e) => setRangeNumber(e.target.value)}
            />
          </span>
          <input
            type="range"
            min="1"
            max="250"
            value={rangeNumber}
            onChange={(e) => setRangeNumber(e.target.value)}
          />
          <ToTop />
        </div>
        {tableHeader.map((el) => (
          <li key={el}>
            <input
              type="radio"
              name="header-el"
              id={el}
              defaultChecked={
                el === orderBy || el === orderBy + 'reverse' ? true : false
              }
              onClick={() => {
                if (orderBy === el) {
                  setOrderBy(el + 'reverse');
                } else {
                  setOrderBy(el);
                }
              }}
            />
            <label htmlFor={el}>{el}</label>
          </li>
        ))}
      </ul>
      {coinsData &&
        coinsData
          .slice(0, rangeNumber)
          .sort((a, b) => {
            switch (orderBy) {
              case 'Prix':
                return b.current_price - a.current_price;
              case 'Volume':
                return b.total_volume - a.total_volume;
              case 'MarketCap':
                return b.market_cap - a.market_cap;
              case '1h':
                return (
                  b.price_change_percentage_1h_in_currency -
                  a.price_change_percentage_1h_in_currency
                );
              case '24h':
                return (
                  b.market_cap_change_percentage_24h -
                  a.market_cap_change_percentage_24h
                );
              case '7j':
                return (
                  b.price_change_percentage_7d_in_currency -
                  a.price_change_percentage_7d_in_currency
                );
              case '1m':
                return (
                  b.price_change_percentage_30d_in_currency -
                  a.price_change_percentage_30d_in_currency
                );
              case '6m':
                return (
                  b.price_change_percentage_200d_in_currency -
                  a.price_change_percentage_200d_in_currency
                );
              case '1a':
                return (
                  b.price_change_percentage_1y_in_currency -
                  a.price_change_percentage_1y_in_currency
                );
              case 'ATH':
                return b.ath_change_percentage - a.ath_change_percentage;
              case '#reverse':
                return a.market_cap - b.market_cap;
              case 'Prixreverse':
                return a.current_price - b.current_price;
              case 'Volumereverse':
                return a.total_volume - b.total_volume;
              case 'MarketCapreverse':
                return a.market_cap - b.market_cap;
              case '1hreverse':
                return (
                  a.price_change_percentage_1h_in_currency -
                  b.price_change_percentage_1h_in_currency
                );
              case '24hreverse':
                return (
                  a.market_cap_change_percentage_24h -
                  b.market_cap_change_percentage_24h
                );
              case '7jreverse':
                return (
                  a.price_change_percentage_7d_in_currency -
                  b.price_change_percentage_7d_in_currency
                );
              case '1mreverse':
                return (
                  a.price_change_percentage_30d_in_currency -
                  b.price_change_percentage_30d_in_currency
                );
              case '6mreverse':
                return (
                  a.price_change_percentage_200d_in_currency -
                  b.price_change_percentage_200d_in_currency
                );
              case '1areverse':
                return (
                  a.price_change_percentage_1y_in_currency -
                  b.price_change_percentage_1y_in_currency
                );
              case 'ATHreverse':
                return a.ath_change_percentage - b.ath_change_percentage;
              default:
                null;
            }
          })
          .map((coin, index) => <TableLine coin={coin} index={index} />)}
    </div>
  );
};

export default Table;
