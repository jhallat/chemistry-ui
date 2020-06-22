import React from 'react';
import './LineItem.css';
import { LineModelType } from '../LineModel';
import MolarMassLineItem from '../MolarMass/MolarMassLineItem';

//TODO this can be a function now !!!
const lineItem = (props) => {
  let lineModel = null;
  switch (props.model.lineModelType) {
    case LineModelType.MOLAR_MASS:
      lineModel = (
        <MolarMassLineItem
          model={props.model}
          handleLineChanged={props.onLineChanged}
        />
      );
      break;
    default:
      lineModel = <div>Undefined Operation</div>;
  }

  let lineClass = [];
  lineClass.push('line', 'row');
  if (props.model.selected) {
    lineClass.push('line-selected');
  }
  return (
    <div className={lineClass.join(' ')}>
      <div
        className='col-1 line-number'
        onClick={(event) =>
          props.handleItemSelected(props.model.number, !props.model.selected)
        }
      >
        {props.model.number}
      </div>
      <div className='col-11'>{lineModel}</div>
    </div>
  );
};

export default lineItem;
