import React, { useEffect, useState } from 'react';

interface StarIconProps {
  coinId: string; // Typage pour la prop coinId
}

const StarIcon: React.FC<StarIconProps> = ({ coinId }) => {
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    if (window.localStorage.coinList) {
      const favList = window.localStorage.coinList.split(',');
      if (favList.includes(coinId)) {
        setLike(true);
      } else {
        setLike(false);
      }
    }
  }, [coinId]);

  const idChecker = (id: string): void => {
    let favList: string[] | null = null;

    if (window.localStorage.coinList) {
      favList = window.localStorage.coinList.split(',');
    }

    if (favList) {
      if (favList.includes(id)) {
        // Retirer l'ID de la liste
        window.localStorage.coinList = favList
          .filter((coin) => coin !== id)
          .join(',');
        setLike(false);
      } else {
        // Ajouter l'ID à la liste
        window.localStorage.coinList = [...favList, coinId].join(',');
        setLike(true);
      }
    } else {
      // Créer une nouvelle liste si aucune n'existe
      window.localStorage.coinList = coinId;
      setLike(true);
    }
  };

  return (
    <img
      onClick={() => idChecker(coinId)}
      src={like ? './assets/star-full.svg' : './assets/star-empty.svg'}
      alt="icon-star"
      style={{ cursor: 'pointer' }}
    />
  );
};

export default StarIcon;
