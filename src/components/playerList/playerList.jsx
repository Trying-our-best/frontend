import React from "react"
import "./playerList.scss"

const PlayerList = props => {
  if (props.players) {
    return (
      <React.Fragment className="parent">
        <div className="player-container">
          <h3>Player List</h3>
          {props.players.map(player => {
            return <div>{player}</div>
          })}
        </div>
      </React.Fragment>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default PlayerList
