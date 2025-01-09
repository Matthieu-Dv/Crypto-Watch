import React, { useEffect, useState } from 'react';
// Définition des props du composant
interface PercentChangeProps {
  percent: number | null;
}

const PercentChange: React.FC<PercentChangeProps> = ({ percent }) => {
  const [color, setColor] = useState('');

  const rootStyles = getComputedStyle(document.documentElement);

  const green1 = rootStyles.getPropertyValue('--green1').trim();
  const red1 = rootStyles.getPropertyValue('--red1').trim();
  const white1 = rootStyles.getPropertyValue('--white1').trim();

  useEffect(() => {
    if (percent) {
      if (percent >= 0) {
        setColor(green1);
      } else {
        setColor(red1);
      }
    } else {
      setColor(white1);
    }
  }, [percent]);
  return (
    <p className="percent-change-container" style={{ color }}>
      {percent ? percent.toFixed(1) + '%' : '-'}
    </p>
  );
};

export default PercentChange;
