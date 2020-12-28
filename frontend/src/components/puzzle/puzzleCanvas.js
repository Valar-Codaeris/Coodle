import React from 'react';
const { PuzzleInterpreter } = require('../../../interpreter/puzzleInterpreter');
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
		this.setupInterpreter();
	}
	
	setupInterpreter() {
		this.interpreter = new PuzzleInterpreter(this.myRef.current, this.props.level);
	}

	//If the state of the draw component is updated
	componentDidUpdate(prevProps, prevState) {
		console.log('canvas state updated', this.props.state, this.props.level);
		if (prevProps.state != this.props.state || prevProps.level != this.props.level) {
			console.log(prevProps.level, this.props.level);
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

				//Create a new canvas if the canvas is inactive
				else if (this.state.state == states.INACTIVE) {
					if(this.interpreter) this.interpreter.deleteSketch();
					this.setupInterpreter();
				}
			});
		}
	}

	render() {
		return <div className='puzzleCanvasStyle' ref={this.myRef} />;
	}
}

export const states = {
	READY: 'ready',
	RESET: 'reset',
	ERROR: 'error',
	INACTIVE: 'inactive',
	PLAY: 'play',
};
