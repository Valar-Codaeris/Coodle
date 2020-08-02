import React from 'react';
const { LearnInterpreter } = require('../../../interpreter/learnInterpreter');
const { Parser } = require('../../../interpreter/parser');

export class Canvas extends React.Component {
	constructor(props) {
		super(props);
		this.tokens = props.tokens;
		this.myRef = React.createRef();
		this.state = {
			state: states.INACTIVE,
		};
	}

	componentDidMount() {
		// this.setupInterpreter();
	}

	setupInterpreter() {
		this.interpreter = new LearnInterpreter(this.myRef.current, this.props.level);
	}

	componentDidUpdate(prevProps, prevState) {
		console.log('canvas state updated', this.props.state);
		if (prevProps.state != this.props.state || prevProps.level != this.props.level) {
			console.log(prevProps.level, this.props.level);
			this.setState({ state: this.props.state }, (state) => {
				if (this.state.state == states.PLAY) {
					this.parser = new Parser(this.props.tokens);
					this.interpreter.attachParser(this.parser);
					this.interpreter.analyse(this.props.updateActiveLine);

				} else if (this.state.state == states.RESET) {
					this.interpreter.deleteSketch();
					this.setupInterpreter();
				}
				else if(prevProps.level != this.props.level) {
					if(this.interpreter) this.interpreter.deleteSketch();
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
