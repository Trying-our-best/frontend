import React from "react"

const PlayerList = props => {
  if (props.players) {
    return (
      <div>
        {props.players.map(player => {
          return <div>{player}</div>
        })}
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default PlayerList
