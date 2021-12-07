import React from 'react'
import strings from '../strings.CZ'

function Pending({text = strings.pending}) {
    return (
        <div className="pending">
            <div className="pending__text">{text}</div>
            <div className="pending__wrapper">
                <div className="pending__inner"></div>
            </div>
        </div>
    )
}

export default Pending
