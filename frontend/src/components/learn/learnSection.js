import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Learn } from './learn';
import { LearnList } from './learnList';
import { LearnDescription } from './learnDescription';

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
			<div style={sectionStyle}>				
				<Grid columns='equal'>
					
					{/* First column */}
					<Grid.Column style={studyStyle}>
						<LearnList list={this.state.learnList} onChoose={this.chooseLevel.bind(this)} />
						<LearnDescription/>
					</Grid.Column>

					{/* Second column  */}
					<Grid.Column style={executeStyle}>
						<Learn level={this.state.level} />
					</Grid.Column>

				</Grid>
			</div>
		);
	}
}

const executeStyle = {
	width: '48vw',
	overflowY: 'scroll',
	height: '80vh',
	padding: 0,
	margin: 0,
	background: 'white',
};

const studyStyle = {
	width: '48vw',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-around',
	alignItems: 'space-around',
	padding: 0,
	margin: 0,
};

const sectionStyle = {
	height: '80vh',
};