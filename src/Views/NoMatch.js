import React from 'react'
import {Link} from "react-router-dom";
import strings from '../strings.CZ'

function NoMatch() {
    return (
        <section className="gamesOverview">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="gamesOverview__e404">
                            <h1>{strings.e404.title}</h1>
                            <p>Error 404 - {strings.e404.text}</p>
                        </div>
                        <div className="gamesOverview__button">
                            <Link to={`/game`} className="button">{strings.gamesOverview.newGame}</Link>
                        </div>                        
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NoMatch
