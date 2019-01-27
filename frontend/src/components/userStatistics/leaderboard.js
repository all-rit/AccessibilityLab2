import React, {Component} from 'react';

class Leaderboard extends Component {

  constructor(props) {
    super(props);
    this.state ={
      retrievedData: false,
      scores: null,
    }
  }


  render() {

    const handleData = (data) => {
      this.setState({scores: data.scores})
    }

    const fetchData = () => {
      fetch('http://localhost:5000/leaderboard', {
        method: 'GET',
      })
      .then(res => res.json())
      .then(data => handleData(data))
      .catch(err => console.log(err))
      this.setState({retrievedData:true})
    }

    if (!this.state.retrievedData) {
      fetchData();
    }

    const headers = ['Score', 'Mode']

    const createTable = () => {
      let table = []
      let length = 0;
      if (this.state.scores !== null) {
        if (this.state.scores.length >= 20) {
          length = 20;
        } else {
          length = this.state.scores.length
        }
      }
      for (let i = -1; i < length; i ++) {
        let children = []
        let data = null;
        if (i === -1) {
          data = headers;
        } else {
          data = this.state.scores[i]
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

    return (
      <div>
        <p>Super awesome Leaderboard here!</p>
        <table style={{marginLeft: '20px', marginRight: '20px', marginTop:'30px'}}>
          <tbody>
            {createTable()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Leaderboard;
