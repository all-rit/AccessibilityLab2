import React from 'react';

const createTable = (gameHistory) => {
  if (gameHistory === null || gameHistory === undefined) {
    return <tr>Component failed to load</tr>
  }
  let table = []
  for (let i = 0; i < gameHistory.length; i ++) {
    let children = []
    for (let j = 0; j < 2; j++) {
      children.push(<td>{`Column ${j + 1}`}</td>)
    }
    table.push(<tr>{children}</tr>)
  }
  return table;
}

//Component for the display of previous games played
const PreviousGames = ({gameHistory}) => {
  return(
    <table>
      {createTable(gameHistory)}
    </table>
  );
}

export default PreviousGames;
