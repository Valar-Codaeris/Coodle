const { Lexer, types } = require('./lexer');
const { Command, Start, Block, Stop, Repeat } = require('./ast');

export class Parser {
	constructor(text) {
		this.lexer = new Lexer(text);
		this.currToken = this.lexer.getNextToken();
	}

	/**
	 * Check if the current token type matches the expected token type
	 * If it matches, set current token to the next token
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
	 * Parses a single command, like 'ROTATE 90'
	 */
	command() {
		let node;
		let value = 0;
		switch (this.currToken.type) {
			case types.FRONT: {
				this.eat(types.FRONT); // eat the front token
				if (this.currToken) value = this.currToken.value; // get the value from the next token
				this.eat(types.NUMBER);

				node = new Command(types.FRONT, value);
				break;
			}

			case types.BACK: {
				this.eat(types.FRONT); // eat the front token
				if (this.currToken) value = this.currToken.value; // get the value from the next token
				this.eat(types.NUMBER);

				node = new Command(types.BACK, value);
				break;
			}

			case types.ROTCW: {
				this.eat(types.ROTCW);
				if (this.currToken) value = this.currToken.value;
				this.eat(types.ANGLE);

				node = new Command(types.ROTCW, value);
				break;
			}

			case types.ROTACW: {
				this.eat(types.ROTACW);
				if (this.currToken) value = this.currToken.value;
				this.eat(types.ANGLE);

				node = new Command(types.ROTACW, value);
				break;
			}

			case types.BREAK: {
				this.eat(types.BREAK);
				node = new Command(types.BREAK);
				break;
			}

			default: {
				this.error('Invalid token detected in place of statement');
			}
		}
		return node;
	}

	/**
	 * Eat the start token
	 */
	start() {
		this.eat(types.START);
		return new Start(); // returns the start node where we can attach all the statements
	}

	/**
	 * Similar to a section of code inside {}
	 * Can contain list of commands, repeat blocks, for now
	 * Need to add if blocks here
	 */
	block() {
		const node = new Block();
		while (
			this.currToken.type != types.ENDREP &&
			this.currToken.type != types.STOP
		) {
			// Check if has something similar to a left bracket

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
	 * Eat the start token
	 */
	stop() {
		this.eat(types.STOP);
		return new Stop();
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
			// assume infinite loop condition
			repeatTimes = -1;
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
		// console.log(arguments);
		console.log(text, this.currChar, this.pos);
		throw new Error(text, this.currChar);
	}
}
