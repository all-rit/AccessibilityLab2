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

    const handleData = (data) => {
      console.log(data);
      let defaultTotal = 0;
      let defaultAmount = 0;
      let gameModeTotal = 0;
      let gameModeAmount = 0;
      data.scoreHistory.forEach((element) => {
        if (element.Mode === "DEFAULT") {
          defaultTotal += element.Score;
          defaultAmount ++;
        } else if (element.Mode === this.props.mode.toUpperCase()) {
          gameModeTotal += element.Score;
          gameModeAmount ++;
        }
      });
      console.log(defaultTotal);
      defaultTotal = defaultTotal/defaultAmount;
      gameModeTotal = gameModeTotal/gameModeAmount;
      if (!isNaN(gameModeTotal)) {
        this.setState({scoreData:[this.props.score, gameModeTotal, defaultTotal]})
      } else {
        this.setState({scoreData:[this.props.score, defaultTotal, defaultTotal]})
      }
      console.log(this.state.scoreData)
    }

    const data = {
      labels: ['Your Last Score', `${this.props.mode} Mode Average`, 'Default Mode Average'],
      datasets: [{
        label: 'Average Scores For Game Modes',
        borderColor: 'black',
        backgroundColor: ['red', 'blue', 'green'],
        data: this.state.scoreData,
      }]
    }

    const options = {
      maintainAspectRatio: false,
      scales : {
        xAxes : [{
          ticks: {
            display: false
          }
        }]
      }
    }

    const fetchData = () => {
      fetch('http://localhost:5000/scoreComparison', {
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

    return (
      <div className='chart'>
        <Bar
          data={data}
          options={options}
          height={100}
          width={300}
        />
      </div>
    );
  }
}

export default ScoreComparison;
