import React, {Component} from 'react';

//Component for the display of previous games played
class PreviousGames extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fetchedData: false,
      scores: null,
      numberOfGames: 1,
    }
  }

  onAddScores = (data) => {
    this.setState({scores: data.gameHistory, fetchedData: true})
  }

  render() {

    const fetchGames = () => {
      fetch('http://localhost:5000/previousGames', {
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
