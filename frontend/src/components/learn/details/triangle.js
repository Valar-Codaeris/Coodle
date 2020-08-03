import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';
import { Segment } from 'semantic-ui-react';

export const Triangle = () => {
	const { path, url } = useRouteMatch();
	return (
        <Segment className="descriptionStyle">

				<h2>I am a 'tri' angle and I have three angles !!</h2>
				<p>Now after executing basic sequential operation let's now try to make a triangle by our dog's trajectory. You will have to create a equilateral traingle. For creating a equilateral traingle we need to create three same lines of equal length and angle w.r.t to each other. We can do these by writing instructions for each line manually or by using what we call looping construct which executes instructions within it a definite no times. For creating a looping construct in our language we will use repeat and end repeat blocks, instructions inside it will be repeated.</p>
				<p>Hint:create a straight line of lenght five and rotate by 60 degree at the end by method we covered earlier.Now place those instuction blocks within a repeat and end repeat blocks with 3 times as value for repeat block.</p>
        
        </Segment>
	);
};

export default Triangle;
