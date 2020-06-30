import LineModel, { LineModelType, StatusType } from '../LineModel';

class MolarMassModel extends LineModel {
  constructor(
    number,
    label = '',
    result = '',
    status = StatusType.OK,
    selected = false,
    formula = ''
  ) {
    super(number, label, result, status, selected, LineModelType.MOLAR_MASS);
    this.formula = formula;
  }

  get formatted() {
    return (
      this.label + ' = molar_mass(' + this.formatFormula(this.formula) + ')'
    );
  }

  get command() {
    return {
      number: this.number,
      command: 'molar_mass',
      parameters: {
        formula: this.formula,
      },
    };
  }
}
Object.defineProperty(LineModel.prototype, 'formatted', { enumerable: true });

export default MolarMassModel;
