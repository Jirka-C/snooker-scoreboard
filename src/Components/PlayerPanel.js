import React from 'react'
import strings from '../strings.CZ'

function PlayerPanel({data, onNameChange, playerId}) {
	return (
	<div className={`playerPanel ${data.active && "playerPanel--active"}`}>
		<div className="playerPanel__header">
			{strings.ScoreBoard.player}
		</div>

		<div className="playerPanel__name" placeholder="Jméno hráče" onChange={e =>onNameChange(e.target.value, playerId)} contentEditable={true} suppressContentEditableWarning={true}>{data.name}</div>

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
