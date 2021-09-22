import React from 'react'
import {Link} from "react-router-dom";

function GameRow({game}) {

    let date = new Date(game.date);
    date = date.toLocaleDateString();

    return (
        <div className="gamesOverview__content">
            <div className="gamesOverview__number">
                {game.id}
            </div>
            <div className="gamesOverview__center">
                <div className="gamesOverview__center-row">
                    <div className="gamesOverview__player">{game.player1}</div>
                    <div className="gamesOverview__frames">{game.frames1}</div>
                    <div className="gamesOverview__score">{game.score1}</div>
                    <div className="gamesOverview__breaks">{JSON.stringify(game.breaks1)}</div>
                </div>
                <div className="gamesOverview__center-row">
                    <div className="gamesOverview__player">{game.player2}</div>
                    <div className="gamesOverview__frames">{game.frames2}</div>
                    <div className="gamesOverview__score">{game.score2}</div>
                    <div className="gamesOverview__breaks">{JSON.stringify(game.breaks1)}</div>
                </div>
            </div>
            <div className="gamesOverview__date">
                {date}
            </div>
            <div className="gamesOverview__continue">
                <Link to={`/game/${game.id}`} className="button button--small">Pokracovat</Link>
            </div>
        </div>
    )
}

export default GameRow
