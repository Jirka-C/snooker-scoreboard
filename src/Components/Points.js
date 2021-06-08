import React from 'react'

function Points({value, setBreak}) {
	return (
		<div className={"points__item"} data-value={value} onClick={() => setBreak(value)}>{value}</div>
	)
}

export default Points
