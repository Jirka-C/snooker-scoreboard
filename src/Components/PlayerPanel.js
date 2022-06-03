import React, { useState, useEffect } from 'react'
import axios from 'axios';
import strings from '../strings.CZ'

function PlayerPanel({data, onNameChange, playerId}) {

	const [playersList, setPlayersList] = useState([]);

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_BASE_PATH}/players`)
		.then(response => {
			if(response.data){
				setPlayersList(response.data.players)
			}
		})
		.catch(error => {
			console.log(error)
		})
	}, [])

	return (
	<div className={`playerPanel ${data.active && "playerPanel--active"}`}>
		<div className="playerPanel__header">
			{strings.ScoreBoard.player}
		</div>

		{/* <input className="playerPanel__name" placeholder="Jméno hráče" onChange={e =>onNameChange(e.target.value, playerId)} value={data.name}/> */}
		<select className="playerPanel__name" onChange={e =>onNameChange(e.target.value, playerId)} defaultValue="---">
			<option disabled>---</option>
			{playersList.map(({id, player}) => 
				<option key={id} value={player}>{player}</option>
			)}
		</select>

		<div className="playerPanel__score">
			<div className="playerPanel__score-header">
				{strings.ScoreBoard.frames}
			</div>
			<div className="playerPanel__score-value">
				{data.frames}
			</div>
		</div>

		<div className="playerPanel__score playerPanel__score--big">
			<div className="playerPanel__score-header">
				{strings.ScoreBoard.score}
			</div>
			<div className="playerPanel__score-value">
				{data.score}
			</div>
		</div>

		<div className="playerPanel__score">
			<div className="playerPanel__score-header">
				{strings.ScoreBoard.break}
			</div>
			<div className="playerPanel__score-value">
				{data.break}
			</div>
		</div>
	</div>
	)
}

export default PlayerPanel
