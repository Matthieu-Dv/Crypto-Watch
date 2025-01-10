import React, { useEffect, useState } from 'react';
import { Tooltip, Treemap } from 'recharts';

interface CoinsData {
  coinsData: number | null;
}

const GlobalChart: React.FC<CoinsData> = ({ coinsData }) => {
  const [dataArray, setDataArray] = useState([]);

  const rootStyles = getComputedStyle(document.documentElement);

  const green1 = rootStyles.getPropertyValue('--green1').trim();
  const red1 = rootStyles.getPropertyValue('--red1').trim();
  const colors1 = rootStyles.getPropertyValue('--colors1').trim();
  const green2 = rootStyles.getPropertyValue('--green2').trim();
  const red2 = rootStyles.getPropertyValue('--red2').trim();
  const black2 = rootStyles.getPropertyValue('--black2').trim();

  const colorPicker = (number) => {
    if (number >= 20) {
      return colors1;
    } else if (number >= 5) {
      return green2;
    } else if (number >= 0) {
      return green1;
    } else if (number >= -5) {
      return red1;
    } else if (number >= -20) {
      return red2;
    } else {
      return black2;
    }
  };

  const excludeCoin = (coin) => {
    if (
      coin === 'usdt' ||
      coin === 'usdc' ||
      coin === 'busd' ||
      coin === 'dai' ||
      coin === 'ust' ||
      coin === 'mim'
    ) {
      return false;
    } else {
      return true;
    }
  };
  useEffect(() => {
    let chartData = [];

    if (coinsData.length > 0) {
      for (let i = 0; i < 45; i++) {
        if (excludeCoin(coinsData[i].symbol)) {
          chartData.push({
            name:
              coinsData[i].symbol.toUpperCase() +
              '' +
              coinsData[i].market_cap_change_percentage_24h.toFixed(1) +
              '%',
            size: coinsData[i].market_cap,
            fill: colorPicker(coinsData[i].price_change_percentage_24h),
          });
        }
      }
    }
    setDataArray(chartData);
  }, [coinsData]);

  const TreemapToolTip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].payload.name}</p>
        </div>
      );
    }
    return null;
  };
  return (
    <div className="global-chart">
      <Treemap
        width={730}
        height={181}
        data={dataArray}
        dataKey="size"
        stroke="rgb(51,51,51)"
        fill="black"
        aspectRatio="1"
      >
        <Tooltip content={<TreemapToolTip />} />
      </Treemap>
    </div>
  );
};

export default GlobalChart;
