import React from 'react';
import './popup.css';

class ColorChangePopup extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      background: '',
      correctColor: '',
      incorrectColorOne: '',
      incorrectColorTwo: ''
    }
  }

  onBackgroundChange = (event) => {
    this.setState({background: event.target.value})
  }

  onCorrectColorChange = (event) => {
    this.setState({correctColor: event.target.value})
  }

  onIncorrectColorOne = (event) => {
    this.setState({incorrectColorOne: event.target.value})
  }

  onIncorrectColorTwo = (event) => {
    this.setState({incorrectColorTwo: event.target.value})
  }

  onButtonSubmit = () => {
    var colors = [this.state.background, this.state.correctColor, this.state.incorrectColorOne, this.state.incorrectColorTwo];
    this.props.changeColors(colors); 
  }

  render() {

    const {popupController} = this.props;

    const handleBounds = (e) => {
      if(!this.node.contains(e.target)) {
        popupController(false);
      }
    }

    return (
      <div className='popup' onClick={handleBounds}>
        <div className='popup_inner' ref={node => {this.node = node;}}>
          <h1 className='mainTitle'>Colors for the game:</h1>
          <p className='thirdTitle center'>Please enter new colors to be used for the background and circles in the game!</p>
          <div className='inlineForm'>
            <p className='boarder'>Background Color:</p>
            <input
              type='text'
              name='background'
              className='form'
              onChange={this.onBackgroundChange}
            ></input>
          </div>

          <div className='inlineForm'>
            <p className='boarder'>Correct Circle:</p>
            <input
              type='text'
              name='correctColor'
              className='form'
              onChange={this.onCorrectColorChange}
            ></input>
          </div>

          <div className='inlineForm'>
            <p className='boarder'>Incorrect Circle One:</p>
            <input
              type='text'
              name='incorrectColorOne'
              className='form'
              onChange={this.onIncorrectColorOne}
            ></input>
          </div>

          <div className='inlineForm'>
            <p className='boarder'>Incorrect Circle Two:</p>
            <input
              type='text'
              name='incorrectColorTwo'
              className='form'
              onChange={this.onIncorrectColorTwo}
            ></input>
          </div>

          <button type='submit' name='submitButton' className='submitColorPopup'>Submit</button>

        </div>
      </div>
    );
  }
}

export default ColorChangePopup;
