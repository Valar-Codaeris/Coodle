const { types } = require('./lexer');

export class AST {
	constructor() {}
}



/**
 * Class which represents the Repeat Node in the AST
 */
export class Repeat {
	constructor(block, times) {
		this.block = block;
		this.times = times;
	}
}

/**
 * Class which represents the start node in the AST 
 */
export class Start {
	constructor() {
		this.type = types.START;
	}
}

/**
 * Class which represents the basic block in the AST
 * A block contains a list of commands, which can each be a command, repeat block or a conditional block
 */
export class Block {
	constructor() {
		this.commands = [];  // To hold a block of statements
	}
}

/**
 * Class which represents the stop node in the AST
 */
export class Stop {
	constructor() {
		this.type = types.STOP;
	}
}

/**
 * Class which represents the basic command, such as MOVE, ROTATE, etc in the AST. 
 * Contains the command type, and the number value
 */
export class Command {
	constructor(type, value, token) {
		console.log(value)
		this.type = type;
		this.value = value;
		this.token = token;
	}
}

/**
 * Class which represents the IF condition in the AST
 * Has a condition (structure to be decided), a success element, which is an AST block
 * and a failure element, which is an optional AST block
 */
export class IfStatement {
	constructor(condition, success, failure) { 
		this.condition = condition; // The condition
		this.success = success; // Node to visit, if the condition passes
		this.failure = failure; // Node to visit, if the condition fails
	}
}
