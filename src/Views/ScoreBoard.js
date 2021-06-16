import React, {useState, useEffect} from 'react'
import Points from '../Components/Points';
import PlayerPanel from "../Components/PlayerPanel";
import PlayerBreaks from '../Components/PlayerBreaks';

function ScoreBoard() {
	
	const [playerOne, setPlayerOne] = useState({header: "Player 1", active: true, frames: 0, score: 0, break: "", breaks: []});
	const [playerTwo, setPlayerTwo] = useState({header: "Player 2", active: false, frames: 0, score: 0, break: "", breaks: []});
	const [correct, setCorrect] = useState(false);
	
	let breakString = "";
/*
	useEffect(() => {
		if(playerOne.break){
			const timer = setTimeout(() => {

				if(correct && playerOne.score > 0){
					console.log(playerOne.breaks)
					setPlayerOne({...playerOne, score: playerOne.score - parseInt(playerOne.break)})
					setCorrect(false)
					return;
				}

				let getBreaks = playerOne.breaks;
				if(parseInt(playerOne.break) >= 20){
					getBreaks.push(parseInt(playerOne.break));
				}

				setPlayerOne({...playerOne, score: playerOne.score + parseInt(playerOne.break), break: ""})
			  }, 3000);
			  return () => clearTimeout(timer);
		}
    }, [playerOne]);

	useEffect(() => {
		if(playerTwo.break){
			const timer = setTimeout(() => {

				if(correct && playerTwo.score > 0){
					setPlayerTwo({...playerTwo, score: playerTwo.score - parseInt(playerTwo.break)})
					setCorrect(false)
					return;
				}				

				let getBreaks = playerTwo.breaks;
				if(parseInt(playerTwo.break) >= 20){
					getBreaks.push(parseInt(playerTwo.break));
				}

				setPlayerTwo({...playerTwo, score: playerTwo.score + parseInt(playerTwo.break), break: ""})
			  }, 3000);
			  return () => clearTimeout(timer);
		}
    }, [playerTwo]);
*/	
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
		if(playerOne.active){

			if(parseInt(playerOne.break) > 147){
				setPlayerOne({...playerOne, break: ""});
				return;
			}

			if(correct && playerOne.score > 0 && playerOne.score){
				setPlayerOne({...playerOne, score: playerOne.score - parseInt(playerOne.break), break: ""})
				if(parseInt(playerOne.break) === playerOne.breaks[playerOne.breaks.length-1]){
					playerOne.breaks.pop();
				}
				setCorrect(false)
				return;
			}			

			let getBreak = parseInt(playerOne.break) ? parseInt(playerOne.break) : 0;
			let getBreaks = playerOne.breaks;
			
			if(getBreak >= 20){
				getBreaks.push(getBreak);
			}

			setPlayerOne({...playerOne, active: false, break: "", score: playerOne.score + getBreak, breaks: getBreaks})
			setPlayerTwo({...playerTwo, active: true})
		}
		
		if(playerTwo.active){

			if(parseInt(playerTwo.break) > 147){
				setPlayerTwo({...playerTwo, break: ""});
				return;
			}			

			if(correct && playerTwo.score > 0 && playerTwo.score){
				setPlayerTwo({...playerTwo, score: playerTwo.score - parseInt(playerTwo.break), break: ""})
				if(parseInt(playerTwo.break) === playerTwo.breaks[playerTwo.breaks.length-1]){
					playerTwo.breaks.pop();
				}
				setCorrect(false)
				return;
			}			

			let getBreak = parseInt(playerTwo.break) ? parseInt(playerTwo.break) : 0;
			let getBreaks = playerTwo.breaks;

			if(getBreak >= 20){
				getBreaks.push(getBreak);
			}

			setPlayerTwo({...playerTwo, active: false, break: "", score: playerTwo.score + getBreak, breaks: getBreaks})
			setPlayerOne({...playerOne, active: true})
		}		
	}

	const setFrame = () => {

		if(correct){
			if(playerOne.active && playerOne.frames > 0){
				setPlayerOne({...playerOne, frames: playerOne.frames - 1})
			}
			if(playerTwo.active && playerTwo.frames > 0){
				setPlayerTwo({...playerTwo, frames: playerTwo.frames - 1})
			}

			setCorrect(false)

			return;
		}

		if(playerOne.score > playerTwo.score){
			setPlayerOne({...playerOne, frames: playerOne.frames + 1, score: 0, breaks: []})
			setPlayerTwo({...playerTwo, score: 0, breaks: []})
		}

		if(playerOne.score < playerTwo.score){
			setPlayerOne({...playerOne, score: 0, breaks: []})
			setPlayerTwo({...playerTwo, frames: playerTwo.frames + 1, score: 0, breaks: []})
		}

	}

	const setCorrectHandle = () => {
		setCorrect(!correct);
	}

	const reset = () => {
		setPlayerOne({header: "Player 1", active: true, frames: 0, score: 0, break: "", breaks: []});
		setPlayerTwo({header: "Player 2", active: false, frames: 0, score: 0, break: "", breaks: []});
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

export default ScoreBoard
