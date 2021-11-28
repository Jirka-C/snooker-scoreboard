import React, {useState, useEffect} from 'react'
import Points from '../Components/Points';
import PlayerPanel from "../Components/PlayerPanel";
import PlayerBreaks from '../Components/PlayerBreaks';
import {Link, useParams} from "react-router-dom";
import Pending from '../Components/Pending';
import strings from '../strings.CZ';
import ToastAlert from '../Components/ToastAlert';

function ScoreBoard() {
	
	const [playerOne, setPlayerOne] = useState({id: 1, name: "Player 1", active: true, frames: 0, score: 0, break: 0, breaks: []});
	const [playerTwo, setPlayerTwo] = useState({id: 2, name: "Player 2", active: false, frames: 0, score: 0, break: 0, breaks: []});
	const [correct, setCorrect] = useState(false);
	const [pending, setPending] = useState(true);
	const [showToast, setShowToast] = useState(false);
	const [sidebarActive, setSidebarActive] = useState(false);

    let { id } = useParams();
	useEffect(() => {
		if(id){
			fetch(`/games/game/${id}`)
			.then(response => response.json())
			.then(game => {
				setPlayerOne({...playerOne, name: game.player1, frames: game.frames1, score: game.score1, breaks: game.breaks1});
				setPlayerTwo({...playerTwo, name: game.player2, frames: game.frames2, score: game.score2, breaks: game.breaks2});
				setPending(false);				
			})
			.catch((error) => {
				// TODO Handle Error
				console.error('Error:', error);
			});
		}
		setPending(false);
	}, [])
	
	let activePlayer = playerOne;
	let setActivePlayer = setPlayerOne;
	
	if(playerTwo.active){
		activePlayer = playerTwo;
		setActivePlayer = setPlayerTwo;
	}

	let breakString = "";
	let breakValue = 0;

	const onNameChange = (name, playerId) => {
		if(playerId === 1){
			setPlayerOne({...playerOne, name: name})
		}

		if(playerId === 2){
			setPlayerTwo({...playerTwo, name: name})
		}
	}

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

	const setBackSpaceHandle = () => {
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
		setPlayerOne({id: 1, name: "Player 1", active: true, frames: 0, score: 0, break: 0, breaks: []});
		setPlayerTwo({id: 2, name: "Player 2", active: false, frames: 0, score: 0, break: 0, breaks: []});
	}

	const setData = (data) => {
		setActivePlayer({...activePlayer, ...data});
	}

	const save = () => {
		setSidebarActive(false);
		fetch(`/games/game/${id ? id : ""}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({playerOne: playerOne, playerTwo: playerTwo}),
		})
		.then(response => {
			response.json()
			if(response.ok){
				setShowToast(true);
			}
		})
		.catch((error) => {
			// TODO Handle Error
			console.error('Error:', error);
		});
	}

	const pointsArray = [];
	for (let index = 1; index < 10; index++) {
		pointsArray.push(index);
	}
	pointsArray.push(0);
	const points = pointsArray.map(point => <Points key={point} value={point} setBreak={setBreak} />);

	const handleTogglerClick = () => {
		setSidebarActive(!sidebarActive);
	}

    return (
        pending ? 
		<Pending /> :
		<>
			{showToast && <ToastAlert text={strings.gameSaved} role={"success"} setToast={setShowToast} />}
			<div className={`navbar-toggler ${sidebarActive ? "navbar-toggler--close" : ""}`} onClick={handleTogglerClick}>
				<span></span>
			</div>

			<nav id="sidebar" className={`sidebar ${sidebarActive ? "sidebar--active" : ""}`}>
				<div className="sidebar__inner">
					<div className="sidebar__buttons">
						<div className="button" onClick={save}>{strings.ScoreBoard.save}</div>
						<Link to={`/games`} className="button">{strings.ScoreBoard.history}</Link>
					</div>
				</div>
			</nav>

			<section className="scoreBoard">
				<div className="container">
					<div className="row no-gutters">
						<div className="col-6">
							<PlayerPanel data={playerOne} onNameChange={onNameChange} playerId={playerOne.id} />
							<PlayerBreaks data={playerOne.breaks} />
						</div>
						<div className="col-6">
							<PlayerPanel data={playerTwo} onNameChange={onNameChange}  playerId={playerTwo.id} />
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
								<div className={"points__item"} onClick={setBackSpaceHandle}>&larr;</div>
							</div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="row no-gutters">
						<div className="col-4">
							<div className="button" onClick={reset}>{strings.ScoreBoard.reset}</div>
						</div>
						<div className="col-4">
							<div className="button" onClick={changePlayer}>{strings.ScoreBoard.enter}</div>
						</div>
						<div className="col-4">
							<div className="button" onClick={setFrame}>{strings.ScoreBoard.frame}</div>
						</div>
					</div>
				</div>
			</section>
		</>
    )
}

export default ScoreBoard
