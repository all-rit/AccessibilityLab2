const Deuteranopia = (changeColors, colors) => {
  let changedColors = [];
  for (let i = 0; i < colors.length; i++) {
    if (colors[i][1] < 20 && colors[i][1] > 0) {
      changedColors[i] = '#FFFFFF';
    } else if (colors[i][1] > 90) {
      changedColors[i] = '#4D3D00';
    } else {
      if (colors[i][0] >= 0 && colors[i][0] <= 14) {
        changedColors[i] = '#332900';
      } else if (colors[i][0] >= 348 && colors[i][0] <= 360) {
        changedColors[i] = '#332900';
      } else if (colors[i][0] >= 15 && colors[i][0] <= 49) {
        changedColors[i] = '#806600';
      } else if (colors[i][0] >= 50 && colors[i][0] <= 59) {
        changedColors[i] = '#FFE6CC';
      } else if (colors[i][0] >= 60 && colors[i][0] <= 159) {
        changedColors[i] = '#FFE6CC';
      } else if (colors[i][0] >= 160 && colors[i][0] <= 199) {
        changedColors[i] = '#0000E6';
      } else if (colors[i][0] >= 200 && colors[i][0] <= 259) {
        changedColors[i] = '#000033';
      } else if (colors[i][0] >= 260 && colors[i][0] <= 321) {
        changedColors[i] = '#000033';
      } else if (colors[i][0] >= 322 && colors[i][0] <= 347) {
        changedColors[i] = '#FFFFFF';
      }
    }
  }
  changeColors(changedColors);
}

export default Deuteranopia;
