import React from 'react'

function PlayerBreaks({data}) {

    return (
        <div className="playerPanel__breaks">
            Breaks: {JSON.stringify(data)}
        </div>
    )
}

export default PlayerBreaks
