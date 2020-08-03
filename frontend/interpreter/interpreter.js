/**
 * This class implements the interpreter and draws the output on the screen
 */

// const readline = require('readline');
import { types } from './lexer';
const { p5Wrapper } = require('./p5Wrapper');

export class NodeVisitor {
	constructor() {}

	async visit(node) {
		// A generic node visitor function
		const methodName = `visit${node.constructor.name}`;

		if (this[methodName]) {
			return this[methodName](node);
		}
		throw new Error(`No method found for type ${node.constructor.name}`);
	}
}

export class Interpreter extends NodeVisitor {
	// The most important class
	constructor(htmlElement) {
		super();
		// this.parser = parser;
		this.environment = {}; // declare an environment, in case we are addig global variables in the future
		this.htmlElement = htmlElement;
		// this.node = this.parser.expression(); // Get the Abstract Syntax Tree from the Parser
		this.graphic = new p5Wrapper(this.htmlElement);
	}


	attachParser(parser) {
		this.parser = parser;
		this.node = this.parser.expression(); // Get the abstract syntax tree from the parser
	}

	async visitStart(node) {
		console.log('Starting program execution');
	}

	async visitBlock(node) {
		const statements = node.statements;
		for (let command of node.commands) {
			await this.visit(command); // just visit each statement for now
		}
	}
	async visitStop(node) {
		console.log('Program executed successfully');
	}

	async visitCommand(node) {
		console.log('Executing command', node);
		console.log(types);
		console.log(node.token.line);
		this.updateActiveLine(node.token.line);
		switch (node.type) {
			case types.FRONT: {
				if(node.value < 100) node.value = node.value * 100;
				await this.graphic.move(node.value);
				break;
			}
			case types.BACK: {
				if(node.value < 100) node.value = node.value * 100;
				await this.graphic.move(-node.value);
				break;
			}
			case types.ROTCW: {
				await this.graphic.rotate(node.value);
				break;
			}
			case types.ROTACW: {
				await this.graphic.rotate(-node.value);
				break;
			}
			case types.BREAK: {
				console.log('Going to break here');
				throw new BreakError();
			}
			default: {
				break;
			}
		}
	}

	async visitRepeat(node) {
		console.log(`Repeat ${node.times} times`);
		let times = node.times;
		let infiniteLoop = false;
		if (times == -1) infiniteLoop = true;
		if (infiniteLoop) {
			console.log('Started infinite loop, only break can save you :D');
		}
		while (times > 0 || infiniteLoop) {
			console.log(times);
			try {
				await this.visit(node.block);
			} catch (error) {
				// Catch the break error only inside a loop, in case it is thrown somewhere outside a loop, it is an error
				if (error instanceof BreakError) {
					console.log('Break statement detected'); // Time to stop the inner most loop, which caught the break statement
					return;
				}
			}
			times = times - 1;
		}
	}

	// reset() {
	// 	// Just create a new p5 instance for now
	// 	this.graphic.deleteSketch();
	// 	this.graphic = new p5Wrapper(this.htmlElement);
	// }

	deleteSketch() {
		this.graphic.deleteSketch();
	}

	async analyse(updateActiveLine) {
		console.log('Starting the analysis');
		this.updateActiveLine = updateActiveLine;
		try {
			const result = await this.visit(this.node);
		} catch (error) {
			console.log('An error occurred while running the code');
			console.error(error);
			if (error instanceof BreakError) {
				console.log('Break statement used outside a loop');
			}
		}
		console.log('Ended execution');
	}
}

class BreakError extends Error {
	constructor() {
		super();
		this.name = 'Error for catching break statements';
	}
}
