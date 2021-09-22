import React, {useState, useEffect} from 'react'
import GameRow from '../Components/GameRow';

function GamesOverview() {

    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('http://snooker/games')
        .then(response => response.json())
        .then(data => setGames(data));
    }, [])

    return (
        <section className="gamesOverview">
            <div className="container">
                {games.map( (game) => (<GameRow key={game.id} game={game} />))}
            </div>
        </section>
    )
}

export default GamesOverview
