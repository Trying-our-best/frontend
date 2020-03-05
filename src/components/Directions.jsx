import React, { useState, useEffect } from "react"
import { axiosWithAuth } from "../utils/axiosWithAuth"
import { createGlobalStyle } from "styled-components"
import PlayerList from "./playerList/playerList"

const Directions = props => {
  const [location, setLocation] = useState({
    direction: ""
  })

  // const [roomInfo, setRoomInfo] = useState({
  //   name: "",
  //   title: "",
  //   description: "",
  //   players: "",
  //   error_msg: "",
  //   isError: false
  // })

  const [room, setRoom] = useState({
    currentRoom: '',
    roomDescription: '',
    name: '',
    players: '',
  })

  useEffect(() => {
    axiosWithAuth()
    .get("/api/adv/init/")
    .then(res => {
      console.log(res)
      setRoom({
        currentRoom: res.data.title,
        roomDescription: res.data.description,
        name: res.data.name,
        players: res.data.players
      })
    })
    .catch(err => err.err) 
  }, [])

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
      // setRoomInfo({ ...location, isError: false })
      setLocation({ direction: String.fromCharCode(e.keyCode).toLowerCase() })

      axiosWithAuth()
        .post("api/adv/move/", location)
        .then(res => {
          setRoom({
            name: res.data.name,
            currentRoom: res.data.title,
            roomDescription: res.data.description,
            players: res.data.players
          })
          console.log("moveNorth Res: ", res.data)
        })
        .catch(err => {
          console.log("North Error: ", err.res)
        })
    } else {
      // setRoomInfo({
      //   ...roomInfo,
      //   isError: true
      // })
    }
  }

// axiosWithAuth()
// .get("/api/adv/init/")
// .then(res => {
// console.log(res)
// setRoom({
// currentRoom: res.data.title,
// roomDescription: res.data.description,
// name: res.data.name,
// players: res.data.players
// })
// })
// .catch(err => err.err) 

  return (
    <div>
      {room ? (
      <div className="Direction-Buttons">
        <label htmlFor="direction">Direction</label>
        <input
          className="direction"
          onKeyDown={moveDirection}
          value={location.direction}
          onChange={moveDirection}
        />
        {/* {roomInfo.isError ? <p>That isn't a valid direction.</p> : null} */}
        
        <div style={{backgroundColor: "white"}}>
          {location.direction ? <p>Last Move: {location.direction}</p> : null}
          <p>{room.currentRoom}</p>
          <p>{room.roomDescription}</p>
        </div>
        {/* {roomInfo.error_msg ? <p>{roomInfo.error_msg}</p> : null} */}
        <PlayerList players={room.players} current={room.name} />

      </div>
    ) : (
      <div>
        <PlayerList
          players={room.players}
          current={room.name}
        />
        <p>{room.currentRoom}</p>
        <p>{room.roomDescription}</p>
      </div>
    )}
    </div>
)}



export default Directions
