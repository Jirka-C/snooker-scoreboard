import React, {useState} from 'react'
import Points from '../Components/Points';
import PlayerPanel from "../Components/PlayerPanel";
import PlayerBreaks from '../Components/PlayerBreaks';

function ScoreBoardNew() {
	
	const [playerOne, setPlayerOne] = useState({header: "Player 1", active: true, frames: 0, score: 0, break: 0, breaks: []});
	const [playerTwo, setPlayerTwo] = useState({header: "Player 2", active: false, frames: 0, score: 0, break: 0, breaks: []});
	const [correct, setCorrect] = useState(false);
	let breakString = "";

	const setBreak = (value) => {

		if(playerOne.active){
			breakString = playerOne.break + value;
			setPlayerOne({...playerOne, break: breakString})
		}
		
		if(playerTwo.active){
			breakString = playerTwo.break + value;
			setPlayerTwo({...playerTwo, break: breakString})
		}

	}

	const changePlayer = () => {
		console.log("change player");
	}

	const setFrame = () => {
		console.log("set frame");
	}

	const setCorrectHandle = () => {
		setCorrect(!correct);
	}

	const reset = () => {
		setPlayerOne({header: "Player 1", active: true, frames: 0, score: 0, break: 0, breaks: []});
		setPlayerTwo({header: "Player 2", active: false, frames: 0, score: 0, break: 0, breaks: []});
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

export default ScoreBoardNew
