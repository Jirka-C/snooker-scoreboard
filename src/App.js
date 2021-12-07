import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import GamesOverview from "./Views/GamesOverview";
import ScoreBoard from "./Views/ScoreBoard";
import NoMatch from "./Views/NoMatch";

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
				<Route path="*">
					<NoMatch />
				</Route>				
			</Switch>
		</Router>
	);
}

export default App;
