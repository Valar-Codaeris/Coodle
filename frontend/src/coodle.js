const {Interpreter} = require('../interpreter/interpreter');
const {Parser} = require('../interpreter/parser');

// Get the sample tokens
const sample = require('../interpreter/sample');

// Create a parser for the given set of tokens
const parser = new Parser(sample);

// Create an interpreter for the Abstract Syntax Tree returned by the parser
const interpreter = new Interpreter(parser);

// Analyse the code and produce visual output
interpreter.analyse();