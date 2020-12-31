import React from 'react';
import { ChoiceBar } from './choiceBar';
import { Puzzle } from './puzzle';
import { InfoPanel } from './puzzleInfoPanel';

export class PuzzleSection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			level: 1,
		};
	}

	onChoose(level) {
		this.setState({
			level: level,
		});
	}

	render() {
		return (
			<div style={sectionStyle}>
				<InfoPanel/>
				<ChoiceBar onChoose={this.onChoose.bind(this)} />
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