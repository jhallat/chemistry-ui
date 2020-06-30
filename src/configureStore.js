import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import LineOperations from './components/LabContents/LabOperations/LabOperations';
import MolarMassModel from './components/LabContents/LabOperations/MolarMass/MolarMassModel';
import LineModel, {
  StatusType,
} from './components/LabContents/LabOperations/LineModel';
import Formatter from './formatter';

//TODO Handle model functions in a separate module
const copyModel = (model) => {
  switch (model.lineModelType) {
    case LineOperations.MOLAR_MASS:
      return new MolarMassModel(
        model.number,
        model.label,
        model.result,
        model.status,
        model.selected,
        model.formula
      );
    default:
      return new LineModel(model.number);
  }
};

function reducer(state = { lines: [] }, action) {
  switch (action.type) {
    case 'LINE_CHANGED':
      let linesChanged = [...state.lines];
      let lineChanged = Object.assign({}, linesChanged[action.data.number - 1]);
      let modelChanged = copyModel(lineChanged.model);
      modelChanged[action.data.field] = action.data.value;
      lineChanged.model = modelChanged;
      linesChanged[action.data.number - 1] = lineChanged;
      return { lines: linesChanged };
    case 'MENU_ITEM':
      let updatedLines = [...state.lines];
      const nextLine = updatedLines.length + 1;
      //TODO Handle model functions in a separate module
      switch (action.operation) {
        case LineOperations.MOLAR_MASS:
          updatedLines.push({ model: new MolarMassModel(nextLine) });
          break;
        default:
          updatedLines.push({ model: new LineModel(nextLine) });
      }
      return { lines: updatedLines };
    case 'ITEM_SELECTED':
      let selectedLines = [];
      for (let line of state.lines) {
        const selectLine = Object.assign({}, line);
        selectLine.model.selected = false;
        selectedLines.push(selectLine);
      }
      if (action.selected) {
        selectedLines[action.number - 1].model.selected = true;
      }
      return { lines: selectedLines };
    case 'RUN':
      let runLines = [];
      let results = action.data.results;
      for (let [index, line] of state.lines.entries()) {
        const runLine = Object.assign({}, line);
        if (results[index].status === 'ERR') {
          runLine.model.status = StatusType.ERR;
        } else {
          runLine.model.status = StatusType.OK;
        }
        runLine.model.result = Formatter.formatMeasurement(
          results[index].result
        );
        runLines.push(runLine);
      }
      return { lines: runLines };
    default:
      return state;
  }
}

const logger = createLogger({
  collapsed: true,
});

let store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
