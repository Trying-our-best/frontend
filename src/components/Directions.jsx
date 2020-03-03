import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const Directions = props => {

	const [location, setLocation] = useState({
		direction: ''
	});

	const [roomInfo, setRoomInfo] = useState({
		title: '',
		description: '',
		players: '',
		error_msg: '',	
	})

	const moveDirection = e => {
		e.preventDefault();

		setLocation({ direction: String.fromCharCode(e.keyCode).toLowerCase() });
		console.log(location)
		axiosWithAuth()
		.post('api/adv/move/', location)
		.then(res => {
			setRoomInfo({
				title: res.data.title,
				description: res.data.description,
				players: res.data.player,
				error_msg: res.data.error_msg,
			})
			console.log('moveNorth Res: ', res.data);
		})
		.catch(err => {
			console.log('North Error: ', err.res);
		});
	};

	return (
		<div className="Direction-Buttons">
			<label htmlFor="direction">Direction</label>
			<input 
			className="direction" 
			onKeyDown={moveDirection} 
			value={location.direction}
			onChange={moveDirection} />
			{location.direction ? <p>Last Move: {location.direction}</p> : null }
			<p>{roomInfo.title}</p>
			<p>{roomInfo.description}</p>
			<p>{roomInfo.error_msg}</p>
		</div>
	);
};

export default Directions;
