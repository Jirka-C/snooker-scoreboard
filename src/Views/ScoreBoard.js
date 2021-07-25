import React, {useState} from 'react'
import Points from '../Components/Points';
import PlayerPanel from "../Components/PlayerPanel";
import PlayerBreaks from '../Components/PlayerBreaks';

function ScoreBoard() {
	
	const [playerOne, setPlayerOne] = useState({id: 1, header: "Player 1", active: true, frames: 0, score: 0, break: 0, breaks: []});
	const [playerTwo, setPlayerTwo] = useState({id: 2, header: "Player 2", active: false, frames: 0, score: 0, break: 0, breaks: []});
	const [correct, setCorrect] = useState(false);
	
	let activePlayer = playerOne;
	let setActivePlayer = setPlayerOne;
	
	if(playerTwo.active){
		activePlayer = playerTwo;
		setActivePlayer = setPlayerTwo;
	}

	let breakString = "";
	let breakValue = 0;

	const setBreak = (value) => {

		breakString = activePlayer.break.toString() + value.toString();
		breakValue = parseInt(breakString);

		if(breakValue > 147){
			breakValue = 0
		}
		
		setData({break: breakValue});
	}

	const changePlayer = () => {
		if(correct){			
			if(activePlayer.break === activePlayer.breaks[[activePlayer.breaks.length-1]]){
				activePlayer.breaks.pop();
			}

			activePlayer.break = activePlayer.break * -1;
		}

		if(activePlayer.break >= 20){
			activePlayer.breaks.push(activePlayer.break);
		}

		setData({score: activePlayer.score + activePlayer.break, break: 0, breaks: activePlayer.breaks, active: false});
		setCorrect(false);
		
		if(activePlayer.id === 1){
			setPlayerTwo({...playerTwo, active: true});
		}
		
		if(activePlayer.id === 2){
			setPlayerOne({...playerOne, active: true});
		}
	}

	const setFrame = () => {
		if(correct && activePlayer.frames > 0){
			setData({frames: activePlayer.frames - 1})
		}

		if(playerOne.score > playerTwo.score){
			setPlayerOne({...playerOne, frames: playerOne.frames + 1, score: 0, breaks: []})
			setPlayerTwo({...playerTwo, score: 0, breaks: []})
		}

		if(playerOne.score < playerTwo.score){
			setPlayerOne({...playerOne, score: 0, breaks: []})
			setPlayerTwo({...playerTwo, frames: playerTwo.frames + 1, score: 0, breaks: []})
		}

		setCorrect(false);
	}

	const setCorrectHandle = () => {
		setCorrect(!correct);
	}

	const setBackSpacetHandle = () => {
		let breakString = activePlayer.break.toString();
		if(breakString.length > 1){
			breakString = breakString.slice(0,-1)
		} else {
			breakString = "0"
		}

		let breakValue = parseInt(breakString);
		setData({break: breakValue})
	}

	const reset = () => {
		setPlayerOne({id: 1, header: "Player 1", active: true, frames: 0, score: 0, break: 0, breaks: []});
		setPlayerTwo({id: 2, header: "Player 2", active: false, frames: 0, score: 0, break: 0, breaks: []});
	}

	const setData = (data) => {
		setActivePlayer({...activePlayer, ...data});
	}

	const pointsArray = [];
	for (let index = 1; index < 10; index++) {
		pointsArray.push(index);
	}
	pointsArray.push(0);
	const points = pointsArray.map(point => <Points key={point} value={point} setBreak={setBreak} />);

    return (
		<section className="scoreBoard">
			<div className="container">
				<div className="row no-gutters">
					<div className="col-6">
						<PlayerPanel data={playerOne} />
						<PlayerBreaks data={playerOne.breaks} />
					</div>
					<div className="col-6">
						<PlayerPanel data={playerTwo} />
						<PlayerBreaks data={playerTwo.breaks} />
					</div>
				</div>
			</div>

			<div className="container">
				<div className="row no-gutters">
					<div className="col-12">
						<div className="points">
							{points}
							<div className={"points__item" + (correct ? " points__item--active" : "")} onClick={setCorrectHandle}>C</div>
							<div className={"points__item"} onClick={setBackSpacetHandle}>&larr;</div>
						</div>
					</div>
				</div>
			</div>

			<div className="">
				<div className="container">
					<div className="row no-gutters">
						<div className="col-4">
							<div className="button" onClick={reset}>Reset</div>
						</div>
						<div className="col-4">
							<div className="button" onClick={changePlayer}>Enter</div>
						</div>
						<div className="col-4">
							<div className="button" onClick={setFrame}>Frame</div>
						</div>
					</div>
				</div>
			</div>
		</section>
    )
}

export default ScoreBoard
