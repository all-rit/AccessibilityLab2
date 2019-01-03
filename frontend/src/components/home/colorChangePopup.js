import React from 'react';
import {PhotoshopPicker} from 'react-color';
import './popup.css';

class ColorChangePopup extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      background: '',
      correctColor: '',
      incorrectColorOne: '',
      incorrectColorTwo: '',
      message: '',
      errorEqual: false,
      errorHex: false,
      errorLength: false,
      errorDarkBackground: false,
      backgroundPopup: false,
      correctColorPopup: false,
      incorrectColorOnePopup: false,
      incorrectColorTwoPopup: false
    }
  }

  onBackgroundChange = (color, event) => {
    this.setState({background: color.hex})
  }

  onControlBackgroundPopup = (event) => {
    this.setState({backgroundPopup: event})
  }

  onCorrectColorChange = (color, event) => {
    this.setState({correctColor: color.hex})
  }

  onControlCorrectPopup = (event) => {
    this.setState({correctColorPopup: event})
  }

  onIncorrectColorOne = (color, event) => {
    console.log('setting incorrect color one')
    this.setState({incorrectColorOne: color.hex})
  }

  onControlIncorrectPopupOne = (event) => {
    this.setState({incorrectColorOnePopup: event})
  }

  onIncorrectColorTwo = (color, event) => {
    this.setState({incorrectColorTwo: color.hex})
  }

  onControlIncorrectPopupTwo = (event) => {
    this.setState({incorrectColorTwoPopup: event})
  }

  ensureNotEqual = () => {
    const {background, correctColor, incorrectColorOne, incorrectColorTwo} = this.state;
    if (background !== correctColor || background !== incorrectColorOne ||
      background !== incorrectColorTwo) {
      if (correctColor !== incorrectColorOne || correctColor !== incorrectColorTwo) {
        if (incorrectColorOne !== incorrectColorTwo) {
          return true;
        }
      }
    }
    return false;
  }

  ensureProperHex = () => {
    var {background, correctColor, incorrectColorOne, incorrectColorTwo} = this.state;
    var check = [background, correctColor, incorrectColorOne, incorrectColorTwo];
    console.log(check)
    for (var i = 0; i < check.length; i++) {
      var color = check[i];
      if (color[0] === "#") {
        color = color.slice(1,8)
        if (color.replace(/[^a-f0-9]+$/i, '@') !== color) {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }

  ensureNotBlack = () => {
    const {background, correctColor, incorrectColorOne, incorrectColorTwo} = this.state;
    var check = [background, correctColor, incorrectColorOne, incorrectColorTwo];
    for (var i = 0; i < check.length; i++) {
      var color = check[i];
      color = color.slice(1,8).toLowerCase();
      var total = 0;
      var conversion = []
      for (var j = 0; j < color.length; j++) {
        if (48 <= color.charCodeAt(j) && color.charCodeAt(j) <= 57) {
          conversion.push(Number(color[j]))
        } else if (color.charCodeAt(j) === 97) {
          conversion.push(10)
        } else if (color.charCodeAt(j) === 98) {
          conversion.push(11)
        } else if (color.charCodeAt(j) === 99) {
          conversion.push(12)
        } else if (color.charCodeAt(j) === 100) {
          conversion.push(13)
        } else if (color.charCodeAt(j) === 101) {
          conversion.push(14)
        } else {
          conversion.push(15)
        }
      }
      var values = []
      values.push((conversion[0] + (conversion[1]/16))*16)
      values.push((conversion[2] + (conversion[3]/16))*16)
      values.push((conversion[4] + (conversion[5]/16))*16)
      total = values[0] + values[1] + values[2]
      if (total < 30) {
        return false;
      }
    }
    return true;
  }

  verifyInput = () => {
    var {background, correctColor, incorrectColorOne, incorrectColorTwo} = this.state;

    if (background.length !== 7 || correctColor.length !== 7 ||
      incorrectColorOne.length !== 7 || incorrectColorTwo.length !== 7) {
      this.setState({errorLength: true})
      return false;
    }

    if (!this.ensureNotEqual()) {
      this.setState({errorEqual: true})
      return false;
    }

    if (!this.ensureProperHex()) {
      this.setState({errorHex: true})
      return false;
    }

    if (!this.ensureNotBlack()) {
      this.setState({errorDarkBackground: true})
      return false;
    }

    return true;
  }

  onButtonSubmit = () => {
    var colors = [this.state.background, this.state.correctColor,
      this.state.incorrectColorOne, this.state.incorrectColorTwo];
    this.setState({errorLength: false})
    this.setState({errorEqual: false})
    this.setState({errorHex: false})
    this.setState({errorDarkBackground: false})
    if (this.verifyInput()) {
      this.props.changeDefaultColors(colors);
      this.props.changeGameColors(colors);
      this.props.popupController(false);
    } else {
      this.errorInInput = true;
    }
  }

  render() {

    const {popupController} = this.props;

    const handleBounds = (e) => {
      if(!this.node.contains(e.target)) {
        popupController(false);
      }
    }

    const whiteColor = {
      color: 'white',
      paddingLeft: '5px',
    }

    const changeBackground = () => {
      this.onControlBackgroundPopup(true);
    }

    const closeBackground = () => {
      this.onControlBackgroundPopup(false);
    }

    const revertBackground = () => {
      this.setState({background: '#00CC00'});
      this.onControlBackgroundPopup(false);
    }

    const changeCorrectColor = () => {
      this.onControlCorrectPopup(true);
    }

    const closeCorrectColor = () => {
      this.onControlCorrectPopup(false);
    }

    const revertCorrectColor = () => {
      this.setState({correctColor: '#0000E6'});
      this.onControlCorrectPopup(false);
    }

    const changeIncorrectColorOne = () => {
      this.onControlIncorrectPopupOne(true);
    }

    const closeIncorrectColorOne = () => {
      this.onControlIncorrectPopupOne(false);
    }

    const revertIncorrectColorOne = () => {
      this.setState({incorrectColorOne: '#0000CC'});
      this.onControlIncorrectPopupOne(false);
    }

    const changeIncorrectColorTwo = () => {
      this.onControlIncorrectPopupTwo(true);
    }

    const closeIncorrectColorTwo = () => {
      this.onControlIncorrectPopupTwo(false);
    }

    const revertIncorrectColorTwo = () => {
      this.setState({incorrectColorTwo: '#0000FF'});
      this.onControlIncorrectPopupTwo(false);
    }

    return (
      <div className='popup' onClick={handleBounds}>
        <div className='popup_inner' ref={node => {this.node = node;}}>
          {this.state.errorLength ?
            <p className='error'>Error in the length of the string entered</p>
                : null
          }
          {this.state.errorEqual ?
            <p className='error'>
              Two or more of the values entered were equal to one another
            </p>
              : null
          }
          {this.state.errorHex ?
            <p className='error'>
              Hex information entered was incorrect. Please make sure to have
              '#' in the hex string
            </p>
              : null
          }
          {this.state.errorDarkBackground ?
              <p className='error'>
                Background elements were too close to or were black.
                This is not allowed.
              </p>
              : null
          }
          <div className='mainColor tab'>
            <p className='boarder'>.home &#123;</p>
            <div className='inlineForm'>
              <p className='tab boarder'>background: </p>
              {this.state.backgroundPopup?
                <div className='colorSelector'>
                  <PhotoshopPicker
                    onChangeComplete={this.onBackgroundChange}
                    onAccept={closeBackground}
                    onCancel={revertBackground}
                    color={this.state.background}
                  />
                </div>
                :
                <button
                  onClick={changeBackground}
                  style={{backgroundColor:`${this.state.background}`}}
                  className='form'
                >
                </button>
              }
              <p className='popupArrow'>&#8690;</p>
              <p className='boarder'>
                ; &#47;&#47;Adjust this to change the background of the page
              </p>
            </div>
            <p className='boarder'> &#125;</p>
            <p className='boarder'>.correctCircle &#123;</p>
            <div className='inlineForm'>
              <p className='tab boarder'>color: </p>
              {this.state.correctColorPopup?
                <div className='colorSelector'>
                  <PhotoshopPicker
                    onChangeComplete={this.onCorrectColorChange}
                    onAccept={closeCorrectColor}
                    onCancel={revertCorrectColor}
                    color={this.state.correctColor}
                  />
                </div>
                :
                <button
                  onClick={changeCorrectColor}
                  style={{backgroundColor:`${this.state.correctColor}`}}
                  className='form'
                >
                </button>
              }
              <p className='popupArrow'>&#8690;</p>
              <p className='boarder'>
                ; &#47;&#47;Adjust this to change the correct color option
              </p>
            </div>
            <p className='boarder'> &#125;</p>
            <p className='boarder'>.incorrectCircleOne &#123;</p>
            <div className='inlineForm'>
              <p className='tab boarder'>color: </p>
              {this.state.incorrectColorOnePopup?
                <div className='colorSelector'>
                  <PhotoshopPicker
                    onChangeComplete={this.onIncorrectColorOne}
                    onAccept={closeIncorrectColorOne}
                    onCancel={revertIncorrectColorOne}
                    color={this.state.incorrectColorOne}
                  />
                </div>
                :
                <button
                  onClick={changeIncorrectColorOne}
                  style={{backgroundColor:`${this.state.incorrectColorOne}`}}
                  className='form'
                >
                </button>
              }
              <p className='popupArrow'>&#8690;</p>
              <p className='boarder'>
                ; &#47;&#47;Adjust this to change the first incorrect color option
              </p>
            </div>
            <p className='boarder'> &#125;</p>
            <p className='boarder'>.incorrectCircleTwo &#123;</p>
            <div className='inlineForm'>
              <p className='tab boarder'>color: </p>
              {this.state.incorrectColorTwoPopup?
                <div className='colorSelector'>
                  <PhotoshopPicker
                    onChangeComplete={this.onIncorrectColorTwo}
                    onAccept={closeIncorrectColorTwo}
                    onCancel={revertIncorrectColorTwo}
                    color={this.state.incorrectColorTwo}
                  />
                </div>
                :
                <button
                  onClick={changeIncorrectColorTwo}
                  style={{backgroundColor:`${this.state.incorrectColorTwo}`}}
                  className='form'
                >
                </button>
              }
              <p className='popupArrow'>&#8690;</p>
              <p className='boarder'>
                ; &#47;&#47;Adjust this to change the other incorrect color option
              </p>
            </div>
            <p className='boarder'> &#125;</p>
            <p className='boarder'> .center &#123;</p>
            <p className='tab boarder inlineForm'>
              display: <span style={whiteColor}> flex; </span>
            </p>
            <p className='tab boarder inlineForm'>
              <span style={whiteColor}>justify-</span>content: center;
            </p>
            <p className='boarder'> &#125;</p>
            <p className='boarder'> .header &#123;</p>
            <p className='tab boarder inlineForm'> font-size: 30px;</p>
            <p className='tab boarder inlineForm'>
              display: <span style={whiteColor}> flex; </span>
            </p>
            <p className='tab boarder inlineForm'>
              <span style={whiteColor}>justify-</span>content: center;
            </p>
            <p className='boarder'> &#125;</p>
            <button
              type='submit'
              name='submitButton'
              className='submitColorPopup'
              onClick={this.onButtonSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ColorChangePopup;
