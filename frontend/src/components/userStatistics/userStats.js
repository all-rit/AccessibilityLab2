import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2'
import './userStats.css';

class UserStats extends Component {

  constructor(props) {
    super(props);
    this.state = {
      totalUsers: 0,
      totalLogins: 0,
      totalGamesPlayed: 0,
      scores: null,
      userScores: null,
      retrievedUsers: false,
      retrievedScores: false,
    }
  }

  setFirstData = (data) => {
    this.setState({totalUsers:`${data.totalUsers}`,
      totalLogins:`${data.totalLogins}`})
  }

  setSecondData = (data) => {
    console.log(data)
    this.setState({totalGamesPlayed:`${data.gamesPlayed}`,
      scores: data.scores, userScores:data.usrScores})
  }

  render() {

    const {totalUsers, totalLogins, totalGamesPlayed, scores, userScores} = this.state;

    const getDataUsers = () => {
      fetch('http://localhost:5000/data_totals', {
        method: 'GET',
      })
      .then(res => res.json())
      .then(data => this.setFirstData(data))
      .catch(err => console.log(err))
      this.setState({retrievedUsers:true})
    }

    const getDataScores = () => {
      fetch('http://localhost:5000/data_scores', {
        method: 'GET',
      })
      .then(res => res.json())
      .then(data => {
        this.setSecondData(data)}
      )
      .catch(err => console.log(err))
      this.setState({retrievedScores:true})
    }

    if(!this.state.retrievedUsers){
      getDataUsers();
    }
    if(!this.state.retrievedScores){
      getDataScores();
    }

    const usersPie = {
      labels: ["Number of Users Connected", "Number of Logins"],
      datasets: [{
        label: 'Users connected compared to logged in',
        borderColor: 'black',
        backgroundColor: ['red', 'blue'],
        data: [totalUsers, totalLogins],
        borderWidth: '2',
      }]
    }

    const headers = ["Score", "CorrectOnClick", "IncorrectOnClick",
    "CorrectonNoClick", "IncorrectOnNoClick", "background", "CorrectCircle",
    "incorrectColorOne", "incorrectColorTwo", "Mode"]

    const scoreTable = () => {
      let scoreTable = [];
      console.log(scores)
      scoreTable.push(<tr><th colSpan='10' key='-21312312'>Game Scores</th></tr>);
      for (let i = -1; i < totalGamesPlayed; i++) {
        let children = [];
        let data = null;
        if (i === -1) {
          data = headers;
        } else {
          data = scores[i]
        }
        for (var key in data) {
          if (key === 'GameStatsID' || key === 'UserID') {
            continue;
          } else {
            children.push(<td key={key}>{data[key]}</td>)
          }
        }
        scoreTable.push(<tr key={i}>{children}</tr>)
      }
      return scoreTable;
    }

    const userTable = () => {
      let userTable = [];
      let userID = -50;
      console.log(userScores)
      userTable.push(<tr><th colSpan='10' key='-3213'>User Scores</th></tr>);
      for (let i = -1; i < totalGamesPlayed; i++) {
        let userChildren = [];
        let data = null;
        if (i === -1) {
          data = headers;
        } else {
          data = userScores[i]
          if (data.UserID !== userID) {
            userID = data.UserID;
            userTable.push(<tr><td colSpan='10' key={-5000-userID}>User: {userID}</td></tr>);
          }
        }
        for (var key in data) {
          if (key === 'GameStatsID' || key === 'UserID') {
            continue;
          } else {
            userChildren.push(<td key={key}>{data[key]}</td>)
          }
        }
        userTable.push(<tr key={i}>{userChildren}</tr>);
      }
      return userTable;
    }

    return (
      <div>
        <p className='mainTitle'>User Statistics</p>
        <div>
          <p className='fourthTitle center'>Number of Users</p>
          <div>
            <div className='sameLine'>
              <p className='center'>
                Number of Users Connected: {totalUsers}
              </p>
              <p className='center'>
                Number of Logins: {totalLogins}
              </p>
            </div>
            <Pie data={usersPie} height={50}/>
          </div>
        </div>
        <div>
          <p className='fourthTitle center'>All Scores in System</p>
          <p className='center'>
            Number of Games Completed: {totalGamesPlayed}
          </p>
          <div className='center scoreTable'>
            <table>
              <tbody>
                {scoreTable()}
              </tbody>
            </table>
          </div>
          <div className='center scoreTable'>
            <table>
              <tbody>
                {userTable()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default UserStats;
