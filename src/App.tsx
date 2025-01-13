import { useEffect, useState } from 'react';
import HeaderInfos from './components/HeaderInfos';
import GlobalChart from './components/GlobalChart';
import axios from 'axios';
import Table from './components/Table';
import ToTop from './components/ToTop';

const App = () => {
  const [coinsData, setCoinsData] = useState([]);

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C14d%2C30d%2C200d%2C1y'
      )
      .then((res) => setCoinsData(res.data));

    const handleScroll = () => {
      const tableHeader = document.querySelector('.table-header');
      if (tableHeader) {
        if (window.scrollY > 145) {
          tableHeader.classList.add('active');
        } else {
          tableHeader.classList.remove('active');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll); // Nettoyage
    };
  }, []);

  return (
    <>
      <div className="app-container">
        <header>
          <HeaderInfos />
          <GlobalChart coinsData={coinsData} />
        </header>
        <Table coinsData={coinsData} />
        <ToTop />
      </div>
    </>
  );
};

export default App;
