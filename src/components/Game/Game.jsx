import React, { useEffect, useState } from 'react';
import Directions from '../Directions';
import Canvas from '../Canvas/Canvas';
import { axiosWithAuth } from '../../utils/axiosWithAuth'

const Game = props => {

   // const [ room, setRoom ] = useState({
   //    name: '',
   //    currentRoom: '',
   //    roomDescription: '',
   //    players: '',
   // })

   // useEffect(() => {
   //    axiosWithAuth()
   //    .get("/api/adv/init/")
   //    .then(res => {
   //      console.log(res)
   //      setRoom({
   //        currentRoom: res.data.title,
   //        roomDescription: res.data.description,
   //        name: res.data.name,
   //        players: res.data.players
   //      })
   //    })
   //    .catch(err => err.err) 
   //  }, [])

   return (
      <>
         {/* <Directions /> */}
         <Canvas />
      </>
   );
};

export default Game;
