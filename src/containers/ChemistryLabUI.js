import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import LabHeader from '../components/LabHeader/LabHeader';
import LabContents from '../components/LabContents/LabContents';

function mapStateToProps(state) {
  return {
    lines: state.lines,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onLineChanged: (number, field, value) => {
      dispatch({ type: 'LINE_CHANGED', data: { number, field, value } });
    },
    onMenuItemClick: (operation) => {
      dispatch({ type: 'MENU_ITEM', operation });
    },
    onItemSelected: (number, selected) => {
      dispatch({ type: 'ITEM_SELECTED', number, selected });
    },
  };
}

const ChemistryLabUI = connect(
  mapStateToProps,
  mapDispatchToProps
)(function ({ lines, onLineChanged, onMenuItemClick, onItemSelected }) {
  let contents = 'null';
  if (lines.length === 0) {
    contents = (
      <div className='col-11 offset-1'>
        <h6>Select an operation from the menu above.</h6>
      </div>
    );
  } else {
    contents = (
      <LabContents
        lines={lines}
        onLineChanged={onLineChanged}
        onItemSelected={onItemSelected}
      />
    );
  }

  return (
    <div className='container=fluid'>
      <LabHeader handleMenuItemClick={onMenuItemClick} />
      {contents}
    </div>
  );
});

export default ChemistryLabUI;
