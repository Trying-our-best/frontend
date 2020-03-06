import React from "react"
import "./RoomInfo.scss"

const RoomInfo = props => {

  // console.log(props)
  if (props.room) {
    return (
      <div className="room-wrapper">
        <div className="room-container">
          <h3>Room Info</h3>
            <div className="room-name">{props.room.currentRoom}</div>
            <div className="room-description">{props.room.roomDescription}</div>
        </div>
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

export default RoomInfo
