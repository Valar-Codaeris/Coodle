import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Learn } from './learn';
import { InfoPanel } from './learnInfoPanel';

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
					<Grid.Row style={studyStyle}>
						<Grid.Column style={studyStyle}>
							<InfoPanel list={this.state.learnList} onChoose={this.chooseLevel.bind(this)}/>
						</Grid.Column>
					</Grid.Row>
					
					{/* Second Row */}
					<Grid.Row style={executionStyle}>
						<Grid.Column style={executionStyle}>
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
	paddingBottom: 0,
};

const executionStyle = {
	display: 'flex',
	justifyContent: 'center',
	flexWrap: 'wrap',
	padding: 0,
}