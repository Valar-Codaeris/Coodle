import React from 'react';
import { Puzzle } from './puzzle';
import { InfoPanel } from './puzzleInfoPanel';

export class PuzzleSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			level: 1,
			puzzleList: ['Level 1', 'Level 2', 'Level 3'],
		};
	}

	onChoose(level) {
		this.setState({
			level: level + 1,
		});
	}

	render() {
		return (
			<div style={sectionStyle}>
				<InfoPanel list={this.state.puzzleList} onChoose={this.onChoose.bind(this)} />
				<Puzzle level={this.state.level} />
			</div>
		);
	}
}

const sectionStyle = {
	width: '100vw',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
};