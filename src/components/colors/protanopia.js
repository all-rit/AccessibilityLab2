const Protanopia = (changeColors, colors) => {
  console.log(colors);
  let changedColors = [];
  for (let i = 0; i < colors.length; i++) {
    console.log(colors[i]);
    console.log(colors[i][0]);
    console.log(colors[i][1]);
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
        changedColors[i] = '#997A00';
      } else if (colors[i][0] >= 50 && colors[i][0] <= 59) {
        changedColors[i] = '#997A00';
      } else if (colors[i][0] >= 60 && colors[i][0] <= 159) {
        changedColors[i] = '#B38F00';
      } else if (colors[i][0] >= 160 && colors[i][0] <= 199) {
        changedColors[i] = '#0000FF';
      } else if (colors[i][0] >= 200 && colors[i][0] <= 259) {
        changedColors[i] = '#0000B3';
      } else if (colors[i][0] >= 260 && colors[i][0] <= 321) {
        changedColors[i] = '#000080';
      } else if (colors[i][0] >= 322 && colors[i][0] <= 347) {
        changedColors[i] = '#FFFFFF';
      }
    }
  }
  console.log(changedColors);
  changeColors(changedColors);
}

export default Protanopia;
