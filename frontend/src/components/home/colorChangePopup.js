import React from 'react';
import {PhotoshopPicker} from 'react-color';
import './popup.css';

/*
Class for the adjustment of the colors for the system
*/
class ColorChangePopup extends React.Component{

  //constructor that establishes the state of the system
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

  //Handles changes to the background color (updates state)
  onBackgroundChange = (color, event) => {
    this.setState({background: color.hex})
  }

  //Handles the popup for changning the background color (updates state)
  onControlBackgroundPopup = (event) => {
    this.setState({backgroundPopup: event})
  }

  //Handles changes to the correct circle color (updates state)
  onCorrectColorChange = (color, event) => {
    this.setState({correctColor: color.hex})
  }

  //Handles the popup for changning the correct circle color (updates state)
  onControlCorrectPopup = (event) => {
    this.setState({correctColorPopup: event})
  }

  //Handles changes to the first incorrect circle color (updates state)
  onIncorrectColorOne = (color, event) => {
    console.log('setting incorrect color one')
    this.setState({incorrectColorOne: color.hex})
  }

  //Handles the popup for changning the first incorrect circle color (updates state)
  onControlIncorrectPopupOne = (event) => {
    this.setState({incorrectColorOnePopup: event})
  }

  //Handles changes to the second incorrect circle color (updates state)
  onIncorrectColorTwo = (color, event) => {
    this.setState({incorrectColorTwo: color.hex})
  }

  //Handles the popup for changning second incorrect circle color (updates state)
  onControlIncorrectPopupTwo = (event) => {
    this.setState({incorrectColorTwoPopup: event})
  }

  //Ensures none of the values entered are equal to one another
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

  checkAlert = () => {
    const {background, correctColor, incorrectColorOne, incorrectColorTwo} = this.state;
    let changed = 0;
    if (background !== this.props.colors[0]) {
      changed++;
    }
    if (correctColor !== this.props.colors[1]) {
      changed++;
    }
    if (incorrectColorOne !== this.props.colors[2]) {
      changed++;
    }
    if (incorrectColorTwo !== this.props.colors[3]) {
      changed++;
    }
    if (changed != 4) {
      return window.confirm(`You have only changed ${changed} of the four colors.
        Are you sure you would like to submit?`)
    }
    else {
      return true;
    }
  }

  // //Ensures all of the formats of the colors are in proper hex format
  // ensureProperHex = () => {
  //   var {background, correctColor, incorrectColorOne, incorrectColorTwo} = this.state;
  //   var check = [background, correctColor, incorrectColorOne, incorrectColorTwo];
  //   console.log(check)
  //   for (var i = 0; i < check.length; i++) {
  //     var color = check[i];
  //     if (color[0] === "#") {
  //       color = color.slice(1,8)
  //       if (color.replace(/[^a-f0-9]+$/i, '@') !== color) {
  //         return false;
  //       }
  //     } else {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  //Ensures none of the colors entered are black to too close to black
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

  //Verifies the input by the user
  verifyInput = () => {
    var {background, correctColor, incorrectColorOne, incorrectColorTwo} = this.state;

    // if (background.length !== 7) {
    //   this.setState({background: this.props.colors[0]})
    // } if (correctColor.length !== 7) {
    //   this.setState({correctColor: this.props.colors[1]})
    // } if (incorrectColorOne.length !== 7) {
    //   this.setState({incorrectColorOne: this.props.colors[2]})
    // } if (incorrectColorTwo.length !== 7) {
    //   this.setState({incorrectColorTwo: this.props.colors[3]})
    // }

    if (!this.ensureNotEqual()) {
      this.setState({errorEqual: true})
      return false;
    }

    // if (!this.ensureProperHex()) {
    //   this.setState({errorHex: true})
    //   return false;
    // }

    if (!this.ensureNotBlack()) {
      this.setState({errorDarkBackground: true})
      return false;
    }

    return this.checkAlert();
  }

  //Submits the colors for the system
  onButtonSubmit = () => {
    var colors = [this.state.background, this.state.correctColor,
      this.state.incorrectColorOne, this.state.incorrectColorTwo];
    this.setState({errorLength: false})
    this.setState({errorEqual: false})
    this.setState({errorHex: false})
    this.setState({errorDarkBackground: false})
    if (this.verifyInput()) {
      colors = [this.state.background, this.state.correctColor,
        this.state.incorrectColorOne, this.state.incorrectColorTwo];
      console.log(colors);
      this.props.changeDefaultColors(colors);
      this.props.changeGameColors(colors);
      this.props.closeColorChange();
    } else {
      this.errorInInput = true;
    }
  }

  //Renderer for the system
  render() {

    if (this.props.background !== 'rgba(38,38,38,1)') {
      this.props.toGreyBackground();
    }

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

    //Opens the background color change popup
    const changeBackground = () => {
      this.onControlBackgroundPopup(true);
    }

    //Closes the background color change popup
    const closeBackground = () => {
      this.onControlBackgroundPopup(false);
    }

    ///Revers the background color to the default color
    const revertBackground = () => {
      this.setState({background: '#00CC00'});
      this.onControlBackgroundPopup(false);
    }

    //Opens the correct circle color change popup
    const changeCorrectColor = () => {
      this.onControlCorrectPopup(true);
    }

    //Closes the correct circle color change popup
    const closeCorrectColor = () => {
      this.onControlCorrectPopup(false);
    }

    ///Revers the correct circle color to the default color
    const revertCorrectColor = () => {
      this.setState({correctColor: '#0000E6'});
      this.onControlCorrectPopup(false);
    }

    //Opens the first incorrect circle color change popup
    const changeIncorrectColorOne = () => {
      this.onControlIncorrectPopupOne(true);
    }

    //Closes the first incorrect color change popup
    const closeIncorrectColorOne = () => {
      this.onControlIncorrectPopupOne(false);
    }

    ///Revers the first incorrect circle color to the default color
    const revertIncorrectColorOne = () => {
      this.setState({incorrectColorOne: '#0000CC'});
      this.onControlIncorrectPopupOne(false);
    }

    //Opens the second incorrect circle color change popup
    const changeIncorrectColorTwo = () => {
      this.onControlIncorrectPopupTwo(true);
    }

    //Closes the second incorrect color change popup
    const closeIncorrectColorTwo = () => {
      this.onControlIncorrectPopupTwo(false);
    }

    ///Revers the second incorrect circle color to the default color
    const revertIncorrectColorTwo = () => {
      this.setState({incorrectColorTwo: '#0000FF'});
      this.onControlIncorrectPopupTwo(false);
    }

    if (this.state.background == '') {
      this.setState({background: this.props.colors[0],
        correctColor: this.props.colors[1], incorrectColorOne: this.props.colors[2],
        incorrectColorTwo: this.props.colors[3]
      })
    }

    return (
      <div>
        <div>
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
                  style={{backgroundColor: this.state.background}}
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
                  style={{backgroundColor: this.state.correctColor}}
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
                  style={{backgroundColor:this.state.incorrectColorOne}}
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
                  style={{backgroundColor:this.state.incorrectColorTwo}}
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
