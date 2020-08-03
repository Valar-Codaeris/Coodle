import React from 'react';
const { PuzzleInterpreter } = require('../../../interpreter/puzzleInterpreter');
const { Parser } = require('../../../interpreter/parser');

export class PuzzleCanvas extends React.Component {
	constructor(props) {
		super(props);
		this.tokens = props.tokens;
		this.myRef = React.createRef();
		this.state = {
			state: states.INACTIVE,
		};
	}

	componentDidMount() {
		this.setupInterpreter();
	}

	setupInterpreter() {
		this.parser = new Parser(this.tokens);
		this.interpreter = new PuzzleInterpreter(this.parser, this.myRef.current);
	}
	componentDidUpdate(prevProps, prevState) {
		console.log('canvas state updated', this.props.state);
		if (prevProps.state != this.props.state) {
			this.setState({ state: this.props.state }, (state) => {
				if (this.state.state == states.PLAY) {
					this.interpreter.analyse();
				} else if (this.state.state == states.RESET) {
					this.interpreter.deleteSketch();
					this.setupInterpreter();
				}
			});
		}
		// this.interpreter.analyse();
	}

	render() {
		return <div className='canvasStyle' ref={this.myRef} />;
	}
}

export const states = {
	READY: 'ready',
	RESET: 'reset',
	ERROR: 'error',
	INACTIVE: 'inactive',
	PLAY: 'play',
};