import React from 'react';
import { Segment } from 'semantic-ui-react';
const { segmentStyle } = require('../../../styles/styles');

const Triangle = () => {
	return (
		<Segment basic style={segmentStyle}>
			<h2>Drawing a Triangle</h2>
			<hr/>
			<p>
				Now after executing basic sequential operation let's now try to make a
				triangle by our dog's trajectory. You will have to create a equilateral
				traingle. For creating a equilateral traingle we need to create three
				same lines of equal length and angle w.r.t to each other. We can do
				these by writing instructions for each line manually or by using what we
				call looping construct which executes instructions within it a definite
				no times. For creating a looping construct in our language we will use
				repeat and end repeat blocks, instructions inside it will be repeated.
			</p>
			<p>
				<strong>Hint:</strong>create a straight line of lenght five and rotate
				by 60 degree at the end by method we covered earlier. Now place those
				instuction blocks within a repeat and end repeat blocks with 3 times as
				value for repeat block.
			</p>
		</Segment>
	);
};

export default Triangle;
