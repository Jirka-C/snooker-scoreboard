import React from 'react'

function PlayerPanel({data}) {
	return (
	<div className={`playerPanel ${data.active && "playerPanel--active"}`}>
		<div className="playerPanel__header">
			{data.header}
		</div>

		<input className="playerPanel__name" name="player-name" placeholder="Jméno hráče"  />

		<div className="playerPanel__score">
			<div className="playerPanel__score-header">
				Frames
			</div>
			<div className="playerPanel__score-value">
				{data.frames}
			</div>
		</div>

		<div className="playerPanel__score playerPanel__score--big">
			<div className="playerPanel__score-header">
				Score
			</div>
			<div className="playerPanel__score-value">
				{data.score}
			</div>
		</div>

		<div className="playerPanel__score">
			<div className="playerPanel__score-header">
				Break
			</div>
			<div className="playerPanel__score-value">
				{data.break ? data.break : 0}
			</div>
		</div>
	</div>
	)
}

export default PlayerPanel
