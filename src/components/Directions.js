import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Directions = props => {
   const [location, setLocation] = useState({ direction: '' });

   const moveNorth = e => {
      e.preventDefault();
      setLocation({ direction: 'n' });
      axiosWithAuth()
         .post('api/adv/move/', location)
         .then(res => {
            console.log('moveNorth Res: ', res.data);
         })
         .catch(err => {
            console.log('North Error: ', err.res);
         });
   };

   const moveSouth = e => {
      e.preventDefault();
      setLocation({ direction: 's' });
      axiosWithAuth()
         .post('api/adv/move/', location)
         .then(res => {
            console.log('moveNorth Res: ', res.data);
         })
         .catch(err => {
            console.log('North Error: ', err.res);
         });
   };

   const moveEast = e => {
      e.preventDefault();
      setLocation({ direction: 'e' });
      axiosWithAuth()
         .post('api/adv/move/', location)
         .then(res => {
            console.log('moveNorth Res: ', res.data);
         })
         .catch(err => {
            console.log('North Error: ', err.res);
         });
   };

   const moveWest = e => {
      e.preventDefault();
      setLocation({ direction: 'w' });
      axiosWithAuth()
         .post('api/adv/move/', location)
         .then(res => {
            console.log('moveNorth Res: ', res.data);
         })
         .catch(err => {
            console.log('North Error: ', err.res);
         });
   };

   return (
      <div className="Direction-Buttons">
         <button className="North" onClick={moveNorth}>
            North
         </button>
         <button className="South" onClick={moveSouth}>
            South
         </button>
         <button className="East" onClick={moveEast}>
            East
         </button>
         <button className="West" onClick={moveWest}>
            West
         </button>
      </div>
   );
};

export default Directions;
