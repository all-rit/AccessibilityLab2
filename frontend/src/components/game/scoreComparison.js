import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2'

class ScoreComparison extends Component {

  constructor(props) {
    super(props)
    this.state={
      scoreData: null,
      retrievedData: false
    }
  }

  render() {

    const data = {

    }

    const fetchData = () => {
      fetch('http://localhost:5000/scoreComparison', {
        method: 'GET',
      })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
      this.setState({retrievedData:true})
    }

    if (!this.state.retrievedData) {
      fetchData();
    }

    return (
      <p>Work in progress</p>
    );
  }
}

export default ScoreComparison;
