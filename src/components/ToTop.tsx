import React from 'react';

const ToTop: React.FC = () => {
  return (
    <div className="top" onClick={() => window.scrollTo(0, 0)}>
      <img src="./assets/arrow-icon.svg" alt="arrow" />
    </div>
  );
};

export default ToTop;
