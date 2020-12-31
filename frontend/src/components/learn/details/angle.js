import React from 'react';
import { Segment } from 'semantic-ui-react';
const { segmentStyle } = require('../../../styles/styles');

const Rotate = () => {
	return (
		<Segment basic style={segmentStyle}>
			<h2>Taking a turn</h2>
			<hr/>
			<p>
				Now as you have written your first computer program and have decided to
				become one of us (Nerds), let's make our dog do little more than just
				walkingin straight line and make it move in other direction. So write
				the visual program to Make the dog walk forward for 4 steps and the make
				90 degree clockwise turn and walk forward another 4 steps.
			</p>
			<p>
				<strong>Hint:</strong> As earlier our instruction blocks will go in between a start and
				stop block. Put a forward block and times value 4 block to make the dog
				move forward by 4 step. Now to make the dog turn clockwise we need to
				form sequence of instruction with forward instruction. This will be
				done by placing clockwise block after the forward block and also placing
				a rotate 90 degree block beside that to make a 90 degree turn. Now
				after this repeat same forward blocks after clockwise block
			</p>
			<img style={{ height: '15vh' }} src='/assets/gifs/rotate.gif' />
		</Segment>
	);
};

export default Rotate;