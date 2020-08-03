import React, { lazy } from 'react';

import Angle from './details/angle';
import Line from './details/line';
import Triangle from './details/triangle';

import { Switch, Route, Link } from 'react-router-dom';
import Square from './details/square';

export const LearnDescription = ({ list }) => {
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
