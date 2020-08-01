import React from 'react';
const { Interpreter } = require('../../interpreter/interpreter');
const { Parser } = require('../../interpreter/parser');

// Get the sample tokens
const sample = require('../../interpreter/sample');

export class Canvas extends React.Component {
	constructor(props) {
        super(props);
		this.myRef = React.createRef();
	}

	componentDidMount() {
		this.parser = new Parser(sample);
		this.interpreter = new Interpreter(this.parser, this.myRef.current);
		this.interpreter.analyse();
    }
    
	render() {
		return <div ref={this.myRef} />;
	}
}
