import React from 'react';
import { Header } from './header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {Menu} from './menu';
import {Draw} from './draw/draw';
import { LearnSection } from './learn/learnSection';
import { PuzzleSection } from './puzzle/puzzleSection';

export class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div style={mainStyle}>

				{/* Images are needed to be changed */}
				<Header />
				<div style={backgroundStyle}>
					<img src="/assets/background1.png" style={backgroundImageStyle1}/>
					<img src="/assets/background2.png" style={backgroundImageStyle2}/>
				</div>

				{/* Components to render depending upon the current url of the application */}
				<div id="content">
					<Router>
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
								<Menu/>
							</Route>
						</Switch>
					</Router>
				</div>
			</div>
		);
	}
}

const backgroundStyle = {
    position: 'absolute',
    display:'flex',
    height:'90vh',
    width: '80%',
    justifyContent: 'space-around',
    alignItems: 'center',
    left: 0,
    right: 0,
    marginLeft: 'auto',
	marginRight: 'auto',
	zIndex: -100
}

const backgroundImageStyle1 = {
    position:'absolute',
    height: '60vh',
    top: 20,
	left: 100,
	zIndex: -100
}

const backgroundImageStyle2 = {
    position: 'absolute',
    height: '60vh',
    bottom: 10,
	right: 170,
	zIndex: -100
}

const mainStyle = {
	height: '100vh',
	width: '100vw',
	overflowY: 'hidden',
	overflowX: 'hidden',
	padding: 0,
	margin: 0
}