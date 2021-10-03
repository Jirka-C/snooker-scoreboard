import React from 'react'
import strings from '../strings.CZ'

function PlayerBreaks({data}) {

    return (
        <div className="playerPanel__breaks">
            {strings.ScoreBoard.breaks}: {JSON.stringify(data)}
        </div>
    )
}

export default PlayerBreaks
