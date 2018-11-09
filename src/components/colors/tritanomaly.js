const Tritanomaly = (changeColors, colors) => {
  let changedColors = [];
  for (let i = 0; i < colors.length; i++) {
    if (colors[i][1] < 20 && colors[i][1] > 0) {
      changedColors[i] = '#FFFFFF';
    } else if (colors[i][1] < 35 && colors[i][1] > 20) {
      changedColors[i] = '#FFCCFF';
    } else if (colors[i][1] < 105 && colors[i][1] > 90) {
      changedColors[i] = '#CCCCFF';
    } else if (colors[i][1] > 105) {
      changedColors[i] = '#B3FFFF';
    } else {
      if (colors[i][0] >= 0 && colors[i][0] <= 14) {
        changedColors[i] = '#660000';
      } else if (colors[i][0] >= 348 && colors[i][0] <= 360) {
        changedColors[i] = '#FF0000';
      } else if (colors[i][0] >= 15 && colors[i][0] <= 49) {
        changedColors[i] = '#FF9999';
      } else if (colors[i][0] >= 50 && colors[i][0] <= 59) {
        changedColors[i] = '#FF9999';
      } else if (colors[i][0] >= 60 && colors[i][0] <= 159) {
        changedColors[i] = '#FF9999';
      } else if (colors[i][0] >= 100 && colors[i][0] <= 159) {
        changeColors[i] = '#99FFFF';
      } else if (colors[i][0] >= 160 && colors[i][0] <= 199) {
        changedColors[i] = '#00CCCC';
      } else if (colors[i][0] >= 200 && colors[i][0] <= 259) {
        changedColors[i] = '#00334D';
      } else if (colors[i][0] >= 260 && colors[i][0] <= 321) {
        changedColors[i] = '#391313';
      } else if (colors[i][0] >= 322 && colors[i][0] <= 347) {
        changedColors[i] = '#391313';
      }
    }
  }
  changeColors(changedColors);
}

export default Tritanomaly;
