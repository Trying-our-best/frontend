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

   return (
      <div className="Direction-Buttons">
         <button className="North" onClick={moveNorth}>
            North
         </button>
      </div>
   );
};

export default Directions;
