import React, { useState, useEffect } from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth"
import { createGlobalStyle } from "styled-components"
import PlayerList from "./playerList/playerList"

const Directions = props => {
  const [location, setLocation] = useState({
    direction: ""
  })

  const [roomInfo, setRoomInfo] = useState({
    name: "",
    title: "",
    description: "",
    players: "",
    error_msg: "",
    isError: false
  })

  const moveDirection = e => {
    e.preventDefault()
    console.log(e.keyCode)
    if (
      e.keyCode === 78 ||
      e.keyCode === 69 ||
      e.keyCode === 83 ||
      e.keyCode === 87
    ) {
      console.log("pass")
      setRoomInfo({ ...location, isError: false })
      setLocation({ direction: String.fromCharCode(e.keyCode).toLowerCase() })

      axiosWithAuth()
        .post("api/adv/move/", location)
        .then(res => {
          setRoomInfo({
            name: res.data.name,
            title: res.data.title,
            description: res.data.description,
            players: res.data.players,
            error_msg: res.data.error_msg
          })
          console.log("moveNorth Res: ", res.data)
        })
        .catch(err => {
          console.log("North Error: ", err.res)
        })
    } else {
      setRoomInfo({
        ...roomInfo,
        isError: true
      })
    }
  }

  return (
    <div className="Direction-Buttons">
      <label htmlFor="direction">Direction</label>
      <input
        className="direction"
        onKeyDown={moveDirection}
        value={location.direction}
        onChange={moveDirection}
      />
      {roomInfo.isError ? <p>That isn't a valid direction.</p> : null}
      {location.direction ? <p>Last Move: {location.direction}</p> : null}
      {roomInfo.error_msg ? <p>{roomInfo.error_msg}</p> : null}
      <PlayerList players={roomInfo.players} current={roomInfo.name} />
      <p>{roomInfo.title}</p>
      <p>{roomInfo.description}</p>
    </div>
  )
}

export default Directions
