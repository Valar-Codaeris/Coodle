const {Interpreter} = require('../interpreter/interpreter');
const {Parser} = require('../interpreter/parser');
const { p5WrapperLearn } = require('../interpreter/p5WrapperLearn');

// Get the sample tokens
const {lessonSolution} = require('../interpreter/sample');
const { learnInterpreter } = require('../interpreter/learnInterpreter');

// Create a parser for the given set of tokens
const parser = new Parser(lessonSolution);

// Create an interpreter for the Abstract Syntax Tree returned by the parser
const interpreter = new learnInterpreter(parser, document.getElementById('app'));

// Analyse the code and produce visual output
interpreter.analyse();

// const learn = new p5WrapperLearn(document.getElementById('app'));