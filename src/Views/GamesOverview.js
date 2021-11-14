import React, {useState, useEffect} from 'react'
import GameRow from '../Components/GameRow';
import Pending from '../Components/Pending';
import strings from '../strings.CZ'
import {Link} from "react-router-dom";

function GamesOverview() {

    const [games, setGames] = useState([]);
    const [offset, setOffset] = useState(0);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetch(`/games/overview/${offset}`)
        .then(response => response.json())
        .then(data => {
            setGames(games.concat(data));
            setPending(false);
        })
		.catch((error) => {
			// TODO Handle Error
			console.error('Error:', error);
		});
    }, [offset])

    return (
        pending ? 
        <Pending /> :
        <section className="gamesOverview">
            <div className="container">
                <div className="gamesOverview__button">
                    <Link to={`/game`} className="button">{strings.gamesOverview.newGame}</Link>
                </div>
                {games.length ?
                    games.map( game => <GameRow key={game.id} game={game} />) :
                    <div className="row">
                        <div className="col-12">
                            {strings.gamesOverview.noResult}
                        </div>
                    </div>
                }
            </div>
            <div className="container">
                <div className="gamesOverview__button">
                    <div className="button" onClick={() => setOffset(offset + 1)}>{strings.gamesOverview.loadMore}</div>
                </div>
            </div>
        </section>

        //TODO Paginator
    )
}

export default GamesOverview
