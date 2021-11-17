import React, {useState, useEffect} from 'react'
import GameRow from '../Components/GameRow';
import Pending from '../Components/Pending';
import strings from '../strings.CZ'
import {Link} from "react-router-dom";

function GamesOverview() {

    const [games, setGames] = useState([]);
    const [pageId, setPageId] = useState(0);
    const [pending, setPending] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const [totalRows, setTotalRows] = useState(null);

    useEffect(() => {
        if(!totalRows){
            fetch('/games/totalrows')
            .then(response => response.json())
            .then(data => {
                setTotalRows(data)
            })
            .catch((error) => {
                // TODO Handle Error
                console.error('Error:', error);
            });
        }
    }, [])

    useEffect(() => {
        fetch(`/games/overview/${pageId}`)
        .then(response => response.json())
        .then(data => {
            setGames(games.concat(data));
            setPending(false);
            setDisabled(false);
        })
        .catch((error) => {
            // TODO Handle Error
            console.error('Error:', error);
        });
    }, [pageId])

    return (
        pending
        ? <Pending />
        : <section className="gamesOverview">
            <div className="container">
                <div className="gamesOverview__button">
                    <Link to={`/game`} className="button">{strings.gamesOverview.newGame}</Link>
                </div>
                {games.length
                    ? games.map( game => <GameRow key={game.id} game={game} />)
                    : <div className="row">
                        <div className="col-12">
                            <div className="gamesOverview__noResult">
                                {strings.gamesOverview.noResult}
                            </div>
                        </div>
                    </div>
                }
            </div>
            {games.length
            ? <div className="container">
                {disabled && <div className="gamesOverview__pending"></div>}
                {!disabled && (games.length < totalRows) &&
                    <div className="gamesOverview__button">
                        <div className={`button${disabled ? " button--disabled" : ""}`} onClick={() => {setPageId(pageId + 1); setDisabled(true)}}>
                            {disabled ? strings.pending : strings.gamesOverview.loadMore}
                        </div>
                    </div>
                }
            </div>
            : null}
        </section>
    )
}

export default GamesOverview
