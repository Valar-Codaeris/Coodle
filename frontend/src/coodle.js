const {Interpreter} = require('../interpreter/interpreter');
const {Parser} = require('../interpreter/parser');
const { p5WrapperLearn } = require('../interpreter/p5WrapperLearn');

// // Get the sample tokens
// const sample = require('../interpreter/sample');
// const { PuzzleInterpreter } = require('../interpreter/puzzleInterpreter');

// // Create a parser for the given set of tokens
// const parser = new Parser(sample);

// // Create an interpreter for the Abstract Syntax Tree returned by the parser
// const interpreter = new PuzzleInterpreter(parser);

// // Analyse the code and produce visual output
// interpreter.analyse();

const learn = new p5WrapperLearn(document.getElementById('app'));