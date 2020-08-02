import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

export const Rotate = () => {
	const { path, url } = useRouteMatch();
	return (
		<Segment className="descriptionStyle">
			<h2>
				Hey! Everything in life's a circle, what goes up, comes down, and did
				you, what was down, goes up too?
			</h2>
		</Segment>
	);
};

export default Rotate;
