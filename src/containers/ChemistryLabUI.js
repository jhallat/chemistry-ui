import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import LabHeader from '../components/LabHeader/LabHeader';
import LabContents from '../components/LabContents/LabContents';
import LabToolbar from '../components/LabToolbar/LabToolbar';
import axios from 'axios';

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
    onRunClick: (lines) => {
      const commands = [];
      for (let line of lines) {
        commands.push(line.model.command);
      }
      dispatch((dispatch) => {
        return axios({
          method: 'post',
          url: 'http://localhost:5000/run-commands',
          data: { commands: commands },
        }).then((response) => {
          dispatch({ type: 'RUN', data: response.data });
        });
      });
    },
  };
}

const ChemistryLabUI = connect(
  mapStateToProps,
  mapDispatchToProps
)(function ({
  lines,
  onLineChanged,
  onMenuItemClick,
  onItemSelected,
  onRunClick,
}) {
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
      <LabToolbar handleRunClick={() => onRunClick(lines)} />
      {contents}
    </div>
  );
});

export default ChemistryLabUI;
