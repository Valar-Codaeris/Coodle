import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

export const Triangle = () => {
	const { path, url } = useRouteMatch();
	return (
        <Segment className="descriptionStyle">

				<h2>I am a 'tri' angle and I have three angles !!</h2>
				<p2>

				</p2>
				<p2>
					
				</p2>
        </Segment>
	);
};

export default Triangle;
