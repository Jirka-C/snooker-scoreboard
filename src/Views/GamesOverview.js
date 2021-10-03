import React, {useState, useEffect} from 'react'
import GameRow from '../Components/GameRow';
import Pending from '../Components/Pending';
import strings from '../strings.CZ'

function GamesOverview() {

    const [games, setGames] = useState([]);
    const [pending, setPending] = useState(true);

    useEffect(() => {
        fetch('/games')
        .then(response => response.json())
        .then(data => {
            setGames(data);
            setPending(false);
        })
		.catch((error) => {
			// TODO Handle Error
			console.error('Error:', error);
		});
    }, [])

    return (
        pending ? 
        <Pending /> :
        <section className="gamesOverview">
            <div className="container">
                {games.length ?
                    games.map( game => <GameRow key={game.id} game={game} />) :
                    <div className="row">
                        <div className="col-12">
                            {strings.gamesOverview.noResult}
                        </div>
                    </div>
                }
            </div>
        </section>

        //TODO Paginator
    )
}

export default GamesOverview
