import React from "react"
import "./playerList.scss"

const PlayerList = props => {

  // console.log(props)
  if (props.players) {
    return (
      <div className="parent">
        <div className="player-container">
          <h3>Player List</h3>
          <b>
            <i>{props.current} (You)</i>
          </b>
          {props.players.map(player => {
            return <div>{player}</div>
          })}
        </div>
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default PlayerList
