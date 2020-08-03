import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

export const Square = () => {
	const { path, url } = useRouteMatch();
	return (
		<Segment className='descriptionStyle'>
			<h2>The power of symmetry : )</h2>
			<p2></p2>
			<p2>
				Hint: As earlier our instruction blocks will go in between a start and
				stop block. Put a forward block and times value 4 block to make the dog
				move forward by 4 step . Now to make the dog turn clockwise we need to
				form sequence of instruction with forward instruction . This will be
				done by placing clockwise block after the forward block and also placing
				a rotate 90 degree block beside that to make a 90 degree turn . Now
				after this repeat same forward blocks after clockwise block
			</p2>
		</Segment>
	);
};

export default Square;
