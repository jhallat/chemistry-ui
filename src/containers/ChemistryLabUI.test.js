import React from 'react';
import ReactDOM from 'react-dom';
import ChemistryLabUI from './ChemistryLabUI';

describe('Chemistry Lab UI', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ChemistryLabUI />, div);
  });
});
