class Formatter {
  static formatMeasurement = (measurement) => {
    let output = '';
    let exponent = false;
    for (const char of measurement) {
      if (char === '^') {
        exponent = true;
        output += '<sup>';
        continue;
      }
      if (char === ' ' && exponent) {
        exponent = true;
        output += '</sup> ';
        continue;
      }
      output += char;
    }
    return output;
  };
}

export default Formatter;
