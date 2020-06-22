export const LineModelType = Object.freeze({
  NONE: 0,
  MOLAR_MASS: 1,
});

class LineModel {
  constructor(
    number,
    label = '',
    selected = false,
    lineModelType = LineModelType.NONE
  ) {
    this.lineModelType = lineModelType;
    this.number = number;
    this.selected = selected;
    this.label = label;
  }

  formatFormula = (value) => {
    let char;
    let output = '';
    for (char of value) {
      if (!isNaN(char)) {
        output += '<sub>' + char + '</sub>';
      } else {
        output += char;
      }
    }
    return output;
  };
}

export default LineModel;
