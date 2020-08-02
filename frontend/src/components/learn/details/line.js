import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

const Line = () => {
	return (
		<Segment className="descriptionStyle">
			<h2>Welcome to the most basic 2D shape, the most powerful Line!</h2>
		</Segment>
	);
};

export default Line;
