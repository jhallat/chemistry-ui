import React from 'react';
import LineItem from './LabOperations/LineItem/LineItem';

const labContents = ({ lines, onLineChanged, onItemSelected }) => {
  return (
    <div className='row'>
      <div className='col-10 offset-1'>
        {lines.map((line, index) => (
          <LineItem
            {...line}
            index={index}
            key={line.model.number}
            onLineChanged={onLineChanged}
            handleItemSelected={onItemSelected}
          />
        ))}
      </div>
    </div>
  );
};

export default labContents;
