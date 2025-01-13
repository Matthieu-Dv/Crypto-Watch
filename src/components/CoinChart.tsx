import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

// Typage des props
interface CoinChartProps {
  coinId: string;
  coinName: string;
}

// Typage des données du graphique
interface CoinData {
  date: string;
  price: number | string;
}

// Composant avec typage React.FC
const CoinChart: React.FC<CoinChartProps> = ({ coinId, coinName }) => {
  const [duration, setDuration] = useState<number>(30);
  const [coinData, setCoinData] = useState<CoinData[] | undefined>(undefined);

  const rootStyles = getComputedStyle(document.documentElement);
  const color1 = rootStyles.getPropertyValue('--color1').trim();
  const white1 = rootStyles.getPropertyValue('--white1').trim();

  // Typage des données de durée
  const headerData: [number, string][] = [
    [1, '1 jour'],
    [3, '3 jours'],
    [7, '7 jours'],
    [30, '1 mois'],
    [91, '3 mois'],
    [181, '6 mois'],
    [365, '1 an'],
    [3000, 'Max'],
  ];

  useEffect(() => {
    const dataArray: CoinData[] = [];

    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${duration}${
          duration > 32 ? '&interval=daily' : ''
        }`
      )
      .then((res) => {
        for (let i = 0; i < res.data.prices.length; i++) {
          let price = res.data.prices[i][1];

          dataArray.push({
            date: new Date(res.data.prices[i][0]).toLocaleDateString(),
            price: price < '50' ? price : parseInt(price, 10),
          });
        }
        setCoinData(dataArray);
      });
  }, [coinId, duration]);

  return (
    <div className="coin-chart">
      <p>{coinName}</p>
      <div className="btn-container">
        {headerData.map(([key, label]) => (
          <div
            key={key}
            onClick={() => setDuration(key)}
            className={key === duration ? 'active-btn' : ''}
          >
            {label}
          </div>
        ))}
      </div>
      <AreaChart
        width={680}
        height={250}
        data={coinData}
        margin={{ top: 10, right: 0, left: 100, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="7%" stopColor={color1} stopOpacity={0.8} />
            <stop offset="93%" stopColor={white1} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="date" />
        <YAxis domain={['auto', 'auto']} />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="price"
          stroke={color1}
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default CoinChart;
