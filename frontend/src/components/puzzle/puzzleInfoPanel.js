import React from 'react';
import { Card, CardContent, CardDescription, CardMeta } from 'semantic-ui-react';
const { cardStyle } = require('../../styles/styles');

export const InfoPanel = () => {
	return (
		<Card style={cardStyle}>
			<CardContent>
				<CardDescription>
					<h1 style={headingStyle}>Puzzle Mode</h1>
				</CardDescription>
				<CardMeta>
					Get ready to be challenged in the <strong>Puzzle mode</strong>. Solve
					puzzle based problems using the programming knowledge that you have
					gained so far. Choose any level from the dropdown below and get
					started!
				</CardMeta>
			</CardContent>
		</Card>
	);
};

const headingStyle = {
	fontSize: 36,
};

const imageStyle = {
	display: 'flex',
	justifyContent: 'space-around',
	flexWrap: 'wrap',
};
