import React from 'react';
import { Card, CardContent, CardDescription, CardMeta, Grid } from 'semantic-ui-react';
import { Learn } from './learn';
import { LearnList } from './learnList';
import { LearnDescription } from './learnDescription';
const { cardStyle } = require('../../styles/styles');

export class LearnSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			level: null,
			learnList: ['line', 'rotate', 'triangle', 'square'],
		};
	}

	chooseLevel(level) {
		this.setState({
			level: level + 1,
		});
	}

	render() {
		return (
			//Create a grid of equal columns
			<div>		
				<Grid columns={1}>
					
					{/* First Row */}
					<Grid.Row>
						<Grid.Column style={studyStyle}>
							<Card style={cardStyle}>
								<CardContent>
									<CardDescription>
										<h1 style={headingStyle}>Learn Mode</h1>
									</CardDescription>
									<CardMeta style={metaStyle}>
										Learn mode contains a variety of lessons to get you started with programming in Coodle.
										We will begin with the simple concept of drawing a line and will slowly progress to
										advanced topics lesson by lesson. To get started, begin by choosing a lesson from below.
									</CardMeta>
									<CardMeta>
										<LearnList list={this.state.learnList} onChoose={this.chooseLevel.bind(this)} />
										<LearnDescription/>
									</CardMeta>
								</CardContent>
							</Card>
						</Grid.Column>
					</Grid.Row>
					
					{/* Second Row */}
					<Grid.Row>
						<Grid.Column style={executeStyle}>
							<Learn level={this.state.level} />
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</div>
		);
	}
}

const headingStyle = {
	fontSize: 36,
};

const metaStyle = {
	marginBottom: 14,
}

const studyStyle = {
	display: 'flex',
	justifyContent: 'center',
	padding: 0,
	margin: 0,
};

const executeStyle = {
	display: 'flex',
	justifyContent: 'center',
	flexWrap: 'wrap',
}