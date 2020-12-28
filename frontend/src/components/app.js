import React from 'react';
import { Header } from './header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Menu } from './menu';
import { Draw } from './draw/draw';
import { LearnSection } from './learn/learnSection';
import { PuzzleSection } from './puzzle/puzzleSection';

export class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				{/* Components to render depending upon the current url of the application */}
				<Router>
					<Header />
					<div id='content'>
						<Switch>
							<Route path='/draw'>
								<Draw />
							</Route>
							<Route path='/learn'>
								<LearnSection />
							</Route>
							<Route path='/puzzle'>
								<PuzzleSection />
							</Route>
							<Route path='/'>
								<Menu />
							</Route>
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}
