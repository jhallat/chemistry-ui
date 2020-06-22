import LineModel, { LineModelType } from '../LineModel';

class MolarMassModel extends LineModel {
  constructor(number, label = '', selected = false, formula = '') {
    super(number, label, selected, LineModelType.MOLAR_MASS);
    this.formula = formula;
  }

  get formatted() {
    return (
      this.label + ' = molar_mass(' + this.formatFormula(this.formula) + ')'
    );
  }
}
Object.defineProperty(LineModel.prototype, 'formatted', { enumerable: true });

export default MolarMassModel;
