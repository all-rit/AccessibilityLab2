import React, {Component} from 'react';

/*
Component for the display of previous games played
*/
class PreviousGames extends Component {

  //constructor for holding state
  constructor(props) {
    super(props)
    this.state = {
      fetchedData: false,
      scores: null,
      numberOfGames: 1,
    }
  }

  //Adds scores to the game history (updates state)
  onAddScores = (data) => {
    this.setState({scores: data.gameHistory, fetchedData: true})
  }

  //renderer for component's display information
  render() {

    //Fetches the previously completed games by the user
    const fetchGames = () => {
      fetch('http://all.rit.edu:5000/previousGames', {
        method: 'GET'
      })
      .then(res => res.json())
      .then(data => this.onAddScores(data))
      .catch(err => console.log(err))
    }

    if (!this.state.fetchedData) {
      fetchGames();
    }

    const headers = ['Score', 'Mode']

    //Creates the tabe to be displayed to the user
    const createTable = () => {
      let table = []
      table.push(<tr><th colSpan='2' key={5000}>Previous Games</th></tr>)
      let length = 0;
      if (this.state.scores !== null) {
        if (this.state.scores.length <= 3) {
          length = this.state.scores.length
        } else {
          length = 4;
        }
      }
      for (let i = -2; i < length; i ++) {
        let children = []
        let data = null;
        if (i === -2) {
          data = headers;
        } else if (i === -1) {
          data = [this.props.score, this.props.mode]
        } else {
          if (this.state.scores.length >= 5) {
            data = this.state.scores[length - i]
          } else {
            data = this.state.scores[length - i - 1]
          }
        }
        for (var key in data) {
          if (key === 'Score' || key === 'Mode' || key === '0' || key === '1') {
            children.push(<td key={key}>{data[key]}</td>)
          }
        }
        table.push(<tr key={i}>{children}</tr>)
      }
      return table;
    }

    return(
      <table>
        <tbody>
          {createTable()}
        </tbody>
      </table>
    );
  }
}

export default PreviousGames;
