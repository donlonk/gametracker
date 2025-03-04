import React from 'react';

const HomeButton = ({ onReturnHome }) => {
  return (
    <button onClick={onReturnHome}>Return to Home</button>
  );
};

export default HomeButton;