import React from 'react';
import { Segment } from 'semantic-ui-react';
const { segmentStyle } = require('../../../styles/styles');

const Square = () => {
	return (
		<Segment basic style={segmentStyle}>
			<h2>Drawing a Square</h2>
			<hr/>
			<p>
				Now this level will be combination of all the techniques we learnt up
				till now. Try to make a straight line and rotated anticlockwise by 90
				degree at the end and repeat this in repeat block 4 times to get a
				square.
			</p>
		</Segment>
	);
};

export default Square;