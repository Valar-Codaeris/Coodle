export class Lexer {
	constructor(tokens) {
		console.log(tokens)
		this.tokens = tokens;
		this.normalizeTokens();
		this.pos = 0;
	}

	/**
	 * Increment the position pointer and return the next token
	 */
	getNextToken() {
		if (this.pos > this.tokens.length - 1) {
			return new Token(types.EOC);
		}
		const token = this.tokens[this.pos];
		this.pos++;
		return token;
	}

	/**
	 * Take each array(a line in the coodle code)
	 * and add all of their tokens into a 
	 * single tokenList array
	 */
	normalizeTokens() {
		const tokenList = [];
		this.tokens.forEach((tokens, index) => {
			for (const token of tokens) {
				tokenList.push({
					...token,
					line: index,
				});
			}
		});
		this.tokens = tokenList;
	}
}

/**
 * Object which stores the type of token, and the value of the token
 * Value is null for tokens like ROTATE, IF, START, etc.
 * Value is defined for tokens like NUMBER, ANGLE, etc.
 */
export class Token {
	constructor(type, value) {
		this.type = type;
		this.value = value | null;
	}
}

export const types = {
	// Start, end of program
	START: 'START',
	STOP: 'STOP',

	// Basic atomic commands
	FRONT: 'FRONT',
	BACK: 'BACK',
	ROTCW: 'ROTATE_CLOCKWISE',
	ROTACW: 'ROTATE_ANTICLOCKWISE',

	// Loops statements
	REP: 'REPEAT',
	ENDREP: 'END_REPEAT',
	BREAK: 'BREAK',

	// Number arguments for the instructions
	NUMBER: 'NUMBER',
	ANGLE: 'ANGLE',

	// Token to denote end of the input token list
	EOC: 'END_OF_CODE'
};