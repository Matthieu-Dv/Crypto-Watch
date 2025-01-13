import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setStableState } from '../action/stable.action';
import { setListDisplay } from '../action/list.action';
import { AppDispatch } from '../index'; // Importer AppDispatch depuis index.tsx

const TableFilters: React.FC = () => {
  const [showStable, setShowStable] = useState<boolean>(true);
  const [showFavList, setShowFavList] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>(); // Typage du dispatch

  useEffect(() => {
    dispatch(setStableState(showStable));
    dispatch(setListDisplay(showFavList));
  }, [showStable, showFavList, dispatch]);

  return (
    <div className="table-filters">
      <div className="table-filters-container">
        {/* Stable Coins Toggle */}
        <div className="stable-checkbox-container">
          <input
            type="checkbox"
            id="stableCoin"
            checked={showStable}
            onChange={() => setShowStable(!showStable)}
          />
          <label htmlFor="stableCoin">
            {showStable ? 'Avec stable coin' : 'Sans stable coin'}
          </label>
        </div>

        {/* Toggle for No List */}
        <div
          className={showFavList ? 'no-list-btn' : 'no-list-btn active'}
          onClick={() => setShowFavList(false)}
        >
          <p>Aucune liste</p>
        </div>

        {/* Toggle for Favorite List */}
        <div
          className={showFavList ? 'fav-list active' : 'fav-list'}
          onClick={() => setShowFavList(true)}
        >
          <p>Liste des favoris</p>
          <img src="/assets/star-full.svg" alt="icon star" />
        </div>
      </div>
    </div>
  );
};

export default TableFilters;
