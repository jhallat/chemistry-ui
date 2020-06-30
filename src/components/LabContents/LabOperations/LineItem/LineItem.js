import React from 'react';
import classes from './LineItem.module.css';
import { LineModelType, StatusType } from '../LineModel';
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

  let result = null;
  let resultClass = classes['result-ok'];
  if (props.model.result) {
    if (props.model.status === StatusType.ERR) {
      resultClass = classes['result-error'];
      result = (
        <React.Fragment>
          <div className='col-1 offset-1'>ERROR</div>
          <div className='col-10'>{props.model.result}</div>
        </React.Fragment>
      );
    } else {
      result = (
        <div
          className='col-10 offset-2'
          dangerouslySetInnerHTML={{ __html: props.model.result }}
        />
      );
      //result = <div className='col-10 offset-2'>{props.model.result}</div>;
    }
  }

  let lineClass = [];
  lineClass.push(classes['line'], 'row');
  if (props.model.selected) {
    lineClass.push(classes['line-selected']);
  }
  return (
    <React.Fragment>
      <div className={lineClass.join(' ')}>
        <div
          className={'col-1 ' + classes['line-number']}
          onClick={(event) =>
            props.handleItemSelected(props.model.number, !props.model.selected)
          }
        >
          {props.model.number}
        </div>
        <div className='col-11'>{lineModel}</div>
      </div>
      <div className={'row ' + resultClass}>{result}</div>
    </React.Fragment>
  );
};

export default lineItem;
