import Protanopia from './protanopia';
import Deuteranopia from './deuteranopia';
import Tritanomaly from './tritanomaly';
import hexRgb from 'hex-rgb';

const calculateHue = (red, green, blue) => {
  let hue, delta, luminosity;
  if (red > green && red > blue) {
    if (green > blue) {
      delta = green - blue;
      luminosity = calculateLuminosity(red, blue);
    } else {
      delta = blue - green;
      luminosity = calculateLuminosity(red, green);
    }
    if (delta !== 0) {
      hue = 60 * (((green - blue) / delta) % 6);
    } else {
      hue = 0;
    }
  } else if (green > red && green > blue) {
    if (red > blue) {
      delta = red - blue;
      luminosity = calculateLuminosity(green, blue);
    } else {
      delta = blue - red;
      luminosity = calculateLuminosity(green, red);
    }
    if (delta !== 0) {
      hue = 60 * (((blue - red) / delta) + 2);
    } else {
      hue = 0;
    }
  } else {
    if (red > green) {
      delta = red - green;
      luminosity = calculateLuminosity(blue, green);
    } else {
      delta = green - red;
      luminosity = calculateLuminosity(blue, red);
    } 
    if (delta !== 0) {
      hue = 60 * (((red - green) / delta) + 4);
    } else {
      hue = 0;
    }
  }
  return [hue, Math.abs(luminosity)];
}

const calculateLuminosity = (max, min) => {
  return (max - min) / 2;
}

const ColorVision = (changeColors, gameOption, colors) => {
  let correctedColors = [];
  for (let counter = 0; counter < colors.length; counter++) {
    let hexResults = hexRgb(colors[counter]);
    const results = calculateHue(hexResults.red, hexResults.green, hexResults.blue);
    correctedColors[counter] = results;
  }
  if (gameOption === 'Protanopia') {
    console.log(correctedColors);
    Protanopia(changeColors, correctedColors);
  } else if (gameOption === 'Deuteranopia') {
    Deuteranopia(changeColors, correctedColors);
  } else {
    Tritanomaly(changeColors, correctedColors);
  }
}

export default ColorVision;
