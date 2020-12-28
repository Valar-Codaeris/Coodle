const { Lexer, types } = require('./lexer');
const { Command, Start, Block, Stop, Repeat } = require('./ast');

export class Parser {
	constructor(text) {
		this.lexer = new Lexer(text);
		this.currToken = this.lexer.getNextToken();
	}

	/**
	 * Check if the current token type matches the expected token type.
	 * If it matches, set current token to the next token.
	 * Else, throw a parsing error.
	 * @param {string} token_type expected token type
	 */
	eat(token_type) {
		if (this.currToken.type === token_type) {
			this.currToken = this.lexer.getNextToken();
		} else {
			console.log(this.currToken.type, token_type);
			this.error('Invalid character detected while eating');
		}
	}
		
	/**
	 * Eat the start token
	 */
	start() {
		this.eat(types.START);
		return new Start(); // returns the start node where we can attach all the statements
	}
	
	/**
	 * Eat the stop token
	 */
	stop() {
		this.eat(types.STOP);
		return new Stop();
	}

	/**
	 * Parses a single command, like 'ROTATE 90'
	 */
	command() {
		let node;
		let value = 0;
		switch (this.currToken.type) {
			case types.FRONT: {
				const token = this.currToken; // save the current token
				this.eat(types.FRONT); // eat the front token
				if (this.currToken) value = this.currToken.value; // get the value from the next token
				this.eat(types.NUMBER); // eat the number token
				node = new Command(types.FRONT, value, token); // create a new node on the ast
				break;
			}

			case types.BACK: {
				const token = this.currToken;
				this.eat(types.FRONT);
				if (this.currToken) value = this.currToken.value;
				this.eat(types.NUMBER);
				node = new Command(types.BACK, value, token);
				break;
			}

			case types.ROTCW: {
				const token = this.currToken;
				this.eat(types.ROTCW);
				if (this.currToken) value = this.currToken.value;
				this.eat(types.ANGLE);
				node = new Command(types.ROTCW, value, token);
				break;
			}

			case types.ROTACW: {
				const token = this.currToken;
				this.eat(types.ROTACW);
				if (this.currToken) value = this.currToken.value;
				this.eat(types.ANGLE);
				node = new Command(types.ROTACW, value, token);
				break;
			}

			case types.BREAK: {
				const token = this.currToken;
				this.eat(types.BREAK);
				node = new Command(types.BREAK, null, token);
				break;
			}

			default: {
				const token = this.currToken;
				this.error('Invalid token detected in place of statement: ' + token);
			}
		}
		return node;
	}

	/**
	 * Similar to a section of code inside {}
	 * Can contain list of commands, repeat blocks, for now
	 * Need to add if blocks in future
	 */
	block() {
		const node = new Block();
		// Check if it has something similar to a left bracket
		while (
			this.currToken.type != types.ENDREP &&
			this.currToken.type != types.STOP
		) {

			// If the token is a block
			if (this.isCommand(this.currToken)) {
				let command = this.command();
				node.commands.push(command);
			} else if (this.currToken.type == types.REP) {
				let repeatBlock = this.repeatBlock();
				node.commands.push(repeatBlock);
			} else {
				this.error('Invalid token detected');
			}
		}
		return node;
	}

	/**
	 * Utility function to check whether current function is a token
	 * @param {object} token
	 */
	isCommand(token) {
		return [
			types.FRONT,
			types.BACK,
			types.ROTCW,
			types.ROTACW,
			types.BREAK,
		].includes(token.type);
	}

	/**
	 * Eats a section of code, which need to be looped
	 * Contains a single block { } of code
	 */
	repeatBlock() {
		this.eat(types.REP); // Eat the repeat token
		const numToken = this.currToken; // Get the number value
		let repeatTimes;
		if (numToken.type == types.NUMBER) {
			this.eat(types.NUMBER); // Eat the number token
			repeatTimes = numToken.value;
		} else {
			repeatTimes = -1; // Assume infinite loop condition
		}

		const block = this.block(); // Get the block code using block()
		this.eat(types.ENDREP);

		const node = new Repeat(block, repeatTimes);
		return node;
	}

	/**
	 * Main function, which starts the parsing
	 */
	expression() {
		this.start(); // Eat the start token
		let node = this.block(); // The basic block
		this.stop(); // Eat the stop token
		return node;
	}

	/**
	 * Throw an error with a message
	 * @param {string} text
	 */
	error(text) {
		console.log(text, this.currChar, this.pos);
		throw new Error(text, this.currChar);
	}
}