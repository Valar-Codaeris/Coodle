import React from 'react';
import Angle from './details/angle';
import Line from './details/line';
import Triangle from './details/triangle';
import Square from './details/square';
import { Switch, Route } from 'react-router-dom';

export const LearnDescription = () => {
	return (
		<div>
			<Switch>
				<Route path='/learn/rotate'>
					<Angle />
				</Route>
				<Route path='/learn/line'>
					<Line />
				</Route>
				<Route path='/learn/triangle'>
					<Triangle />
				</Route>
				<Route path='/learn/square'>
					<Square />
				</Route>
			</Switch>
		</div>
	);
};