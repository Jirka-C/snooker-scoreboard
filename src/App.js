import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import GamesOverview from "./Views/GamesOverview";
import ScoreBoard from "./Views/ScoreBoard";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/">
					<ScoreBoard />
				</Route>
				<Route path="/game/:id?" children={<ScoreBoard />} />
				<Route path="/games">
					<GamesOverview />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
