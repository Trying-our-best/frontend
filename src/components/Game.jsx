import React, { useState } from "react"
import Directions from "./Directions"
import { axiosWithAuth } from "../utils/axiosWithAuth"

const Game = props => {
  //   const [room, setRoom] = useState({
  //     currentRoom: "",
  //     roomDescription: "",
  //     name: "",
  //     players: []
  //   })

  //   axiosWithAuth()
  //     .get("/api/adv/init/")
  //     .then(res => {
  //       console.log(res)
  //       setRoom({
  //         currentRoom: res.data.title,
  //         roomDescription: res.data.description,
  //         name: res.data.name,
  //         players: res.data.players
  //       })
  //     })
  //     .catch(err => err.err)

  return (
    <>
      <Directions />
    </>
  )
}

export default Game
