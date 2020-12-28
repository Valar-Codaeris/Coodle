import React from 'react';
import { Segment } from 'semantic-ui-react';

const Line = () => {
	return (
		<Segment className='descriptionStyle'>
			<h2>Welcome to the most basic 2D shape, the most powerful Line!</h2>
			<p>
				Hey little fellow! Let's begin your journey of exploring computer
				science in the most intuitive and fun way. So firstly a computer program
				is basically a step by step instructions that tells computer what to do.
				So why not we start by telling :dog2: to move in a straight line five
				steps.
			</p>
			<p>
				Hint: you need to use the programming blocks to make the sequence of
				step that dog needs to perform. All the instructions blocks needs to be
				present between start and stop block . Forward block followed by times
				block of value 5 can be used to move the character forward by 5 step.
				Forward block tell the character to move forward , and now by what
				amount that's specified by times block that will be added beside the
				forward block This two blocks combined gives our dog a single
				instruction to move forward by 5 steps.
			</p>
			<img  style={{height: '15vh'}} src='/assets/gifs/line.gif'/>
		</Segment>
	);
};

export default Line;