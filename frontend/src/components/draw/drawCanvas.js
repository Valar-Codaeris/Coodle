import React from 'react';
const { Interpreter } = require('../../../interpreter/interpreter');
const { Parser } = require('../../../interpreter/parser');
const { canvasStyle } = require('../../styles/styles')

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
		this.setupInterpreter();
	}

	setupInterpreter() {
		this.interpreter = new Interpreter(this.myRef.current);
	}

	//If the state of the draw component is updated
	componentDidUpdate(prevProps, prevState) {
		console.log('canvas state updated', this.props.state);
		if (prevProps.state != this.props.state) {
			this.setState({ state: this.props.state }, (state) => {
				
				//Run the program when user clicks on play button
				if (this.state.state == states.PLAY) {
					this.parser = new Parser(this.props.tokens);
					this.interpreter.attachParser(this.parser);
					this.interpreter.analyse(this.props.updateActiveLine);
				}

				//Create a new sketch if the user clicks on reset button 
				else if (this.state.state == states.RESET) {
					this.interpreter.deleteSketch();
					this.setupInterpreter();
				}
			});
		}
	}

	render() {
		return <div style={canvasStyle} ref={this.myRef} />;
	}
}

export const states = {
	READY: 'ready',
	RESET: 'reset',
	ERROR: 'error',
	INACTIVE: 'inactive',
	PLAY: 'play',
};