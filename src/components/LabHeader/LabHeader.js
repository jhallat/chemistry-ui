import React, { useState } from 'react';
import './LabHeader.css';
import LineOperations from '../LabContents/LabOperations/LabOperations';

const LabHeader = (props) => {
  const [displayState, setDisplayState] = useState({
    displayCalculation: false,
  });

  const toggleMenuDisplay = () => {
    setDisplayState({ displayCalculation: !displayState.displayCalculation });
  };

  const toggleMenuDisplayOff = () => {
    setDisplayState({ displayCalculation: false });
  };

  const handleMenuItemClick = (operation) => {
    setDisplayState({ displayCalculation: false });
    props.handleMenuItemClick(operation);
  };

  let calculationMenu = null;

  if (displayState.displayCalculation) {
    calculationMenu = (
      <div className='menu-contents' onMouseLeave={toggleMenuDisplayOff}>
        <div
          className='menu-item'
          onClick={() => handleMenuItemClick(LineOperations.MOLAR_MASS)}
        >
          Molar Mass
        </div>
      </div>
    );
  }

  return (
    <div className='row lab-header'>
      <div className='col-10 offset-1'>
        <h2>Chemistry Lab</h2>
        <div className='main-menu'>
          <div className='menu-header' onClick={toggleMenuDisplay}>
            Calculations
          </div>
          {calculationMenu}
        </div>
      </div>
    </div>
  );
};

export default LabHeader;
