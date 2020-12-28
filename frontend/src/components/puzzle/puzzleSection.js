import React from 'react';
import { ChoiceBar } from './choiceBar';
import { Puzzle } from './puzzle';

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
				<ChoiceBar onChoose={this.onChoose.bind(this)} />
				<Puzzle level={this.state.level} />
			</div>
		);
	}
}

const sectionStyle = {
	height: '60vh',
	width: '100vw',
	padding: 0,
	margin: 0,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
};