import React from 'react';
import { Card, CardContent, CardDescription, CardMeta } from 'semantic-ui-react';
import { PuzzleList } from './puzzleList';
const { cardStyle } = require('../../styles/styles');

export const InfoPanel = (props) => {
	return (
		<Card style={cardStyle}>
			<CardContent>
				<CardDescription>
					<h1 style={headingStyle}>Puzzle Mode</h1>
				</CardDescription>
				<CardMeta style={metaStyle}>
					Get ready to be challenged in the <strong>Puzzle mode</strong>. Solve
					puzzle based problems using the programming knowledge that you have
					gained so far. Choose any level from the dropdown below and get
					started!
				</CardMeta>
				<CardMeta>
					<PuzzleList list={props.list} onChoose={props.onChoose} />
				</CardMeta>
			</CardContent>
		</Card>
	);
};

const headingStyle = {
	fontSize: 36,
};

const metaStyle = {
	marginBottom: 14,
}