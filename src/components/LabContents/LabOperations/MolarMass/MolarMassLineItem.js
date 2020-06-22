import React from 'react';
import classes from './MolarMassLineItem.module.css';

const MolarMassLineItem = (props) => {
  let display = null;
  if (props.model.selected) {
    display = (
      <React.Fragment>
        <input
          type='text'
          name='label'
          size='20'
          autoComplete='off'
          value={props.model.label}
          spellCheck='false'
          placeholder='label'
          onChange={(event) =>
            props.handleLineChanged(
              props.model.number,
              'label',
              event.target.value
            )
          }
        />
        <div className={classes['operation-label']}>{' = molar_mass('}</div>
        <input
          type='text'
          name='lineInput'
          size='50'
          className={classes['line-value']}
          placeholder='formula'
          autoComplete='off'
          spellCheck='false'
          value={props.model.formula}
          onChange={(event) =>
            props.handleLineChanged(
              props.model.number,
              'formula',
              event.target.value
            )
          }
        />
        <div className={classes['operation-label']}>{')'}</div>
      </React.Fragment>
    );
  } else {
    display = (
      <div dangerouslySetInnerHTML={{ __html: props.model.formatted }} />
    );
  }

  return <div className={classes['input-line']}>{display}</div>;
};

export default MolarMassLineItem;
