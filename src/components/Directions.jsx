// import React, { useState, useEffect } from "react"
// import { axiosWithAuth } from "../utils/axiosWithAuth"
// import { createGlobalStyle } from "styled-components"
// import PlayerList from "./playerList/playerList"

// const Directions = props => {

//   // useEffect(() => {
//   //   axiosWithAuth()
//   //   .get("/api/adv/init/")
//   //   .then(res => {
//   //     console.log(res)
//   //     // setRoom({
//   //     //   currentRoom: res.data.title,
//   //     //   roomDescription: res.data.description,
//   //     //   name: res.data.name,
//   //     //   players: res.data.players
//   //     // })
//   //   })
//   //   .catch(err => err.err) 
//   // }, [])

//   // window.addEventListener('keydown', (e) => {
//   //   if (e.key === "w") {
//   //     setLocation({ direction: 'n' })
//   //   } else if (e.key === 'a') {
//   //     setLocation({ direction: 'w' })
//   //   } else if (e.key === 's') {
//   //     setLocation({ direction: 's' })
//   //   } else if (e.key === 'd') {
//   //     setLocation({ direction: 'e' })
//   //   }

//   //   console.log('check')
//   //   axiosWithAuth()
//   //     .post("api/adv/move/", location)
//   //     .then(res => {
//   //       setRoom({
//   //         name: res.data.name,
//   //         currentRoom: res.data.title,
//   //         roomDescription: res.data.description,
//   //         players: res.data.players
//   //       })
//   //       console.log("moveNorth Res: ", res.data)
//   //     })
//   //     .catch(err => {
//   //       console.log("North Error: ", err.res)
//   //     })
//   // })
//   // const moveDirection = e => {
//   //   e.preventDefault()

//   //   if (e.key === "w") {
//   //     setLocation({ direction: 'n' })
//   //   } else if (e.key === 'a') {
//   //     setLocation({ direction: 'w' })
//   //   } else if (e.key === 's') {
//   //     setLocation({ direction: 's' })
//   //   } else if (e.key === 'd') {
//   //     setLocation({ direction: 'e' })
//   //   }

//   //   console.log('check')
//   //   axiosWithAuth()
//   //     .post("api/adv/move/", location)
//   //     .then(res => {
//   //       setRoom({
//   //         name: res.data.name,
//   //         currentRoom: res.data.title,
//   //         roomDescription: res.data.description,
//   //         players: res.data.players
//   //       })
//   //       console.log("moveNorth Res: ", res.data)
//   //     })
//   //     .catch(err => {
//   //       console.log("North Error: ", err.res)
//   //     })
//   //   // } else {
//   //   //   // setRoomInfo({
//   //   //   //   ...roomInfo,
//   //   //   //   isError: true
//   //   //   // })
//   //   // }
//   // }
//   console.log(props)

//   return (
//     <div>
//       {props.room ? (
//       <div className="Direction-Buttons">
//         <label htmlFor="direction">Direction</label>
//         <input
//           className="direction"
//           // value={location.direction}
//         />
//         {/* {roomInfo.isError ? <p>That isn't a valid direction.</p> : null} */}
        
//         <div style={{backgroundColor: "white"}}>
//           {/* {location.direction ? <p>Last Move: {location.direction}</p> : null} */}
//           <p>{room.currentRoom}</p>
//           <p>{room.roomDescription}</p>
//         </div>
//         {/* {roomInfo.error_msg ? <p>{roomInfo.error_msg}</p> : null} */}
//         <PlayerList players={room.players} current={room.name} />

//       </div>
//     ) : (
//       <div>
//         <PlayerList
//           players={room.players}
//           current={room.name}
//         />
//         <p>{room.currentRoom}</p>
//         <p>{room.roomDescription}</p>
//       </div>
//     )}
//     </div>
// )}



// export default Directions
