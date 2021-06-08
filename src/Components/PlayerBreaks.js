import React from 'react'

function PlayerBreaks({data}) {

    const breaks = data.map((breakItem, index) => {
        return <span key={index}>{breakItem}, </span>
    });

    return (
        <div className="playerPanel__breaks">
            Breaks: {breaks}
        </div>
    )
}

export default PlayerBreaks
