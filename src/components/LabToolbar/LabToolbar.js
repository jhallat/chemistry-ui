import React from 'react';
import classes from './LabToolbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LabToolbar = (props) => {
  return (
    <div className='row'>
      <div className={'col-11 offset-1 ' + classes['toolbar-container']}>
        <button
          className={classes['toolbar-button']}
          onClick={() => props.handleRunClick()}
        >
          <div className={classes['button-contents']}>
            <div className={classes['button-label']}>Run</div>
            <div>
              <FontAwesomeIcon icon={['fas', 'play']} />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default LabToolbar;
