(
	{
		type: 'BREAK',
		value: null,
	}
);

export const learnSolution1 = [
	[
		{
			type: 'START',
			value: null,
		},
	],
	[
		{
			type: 'FRONT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 100,
		}
	],
	[
		{
			type: 'STOP',
			value: null,
		}
	]
];

export const learnSolution2 = [
	[
		{
			type: 'START',
			value: null,
		},
	],
	[
		{
			type: 'FRONT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 100,
		},
	],
	[
		{
			type: 'ROTATE_CLOCKWISE',
			value: null,
		},
		{
			type: 'ANGLE',
			value: 90,
		},
	],
	[
		{
			type: 'FRONT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 100,
		},
	],
	[
		{
			type: 'STOP',
			value: null,
		},
	],
];

export const learnSolution3 = [
	[
		{
			type: 'START',
			value: null
		},
	],
	[
		{
			type: 'REPEAT',
			value: null,
		},
	],
	[
		{
			type: 'ROTATE_CLOCWISE',
			value: null,
		},
		{
			type: 'ANGLE',
			value: 60,
		},
	],
	[
		{
			type: 'FRONT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 100,
		},
	],
	[
		{
			type: 'END_REPEAT',
			value: null,
		},
	],
	[
		{
			type: 'STOP',
			value: null,
		},
	],
];

export const learnSolution4 = [
	[
		{
			type: 'START',
			value: null,
		},
	],
	[
		{
			type: 'REPEAT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 4,
		},
	],
	[
		{
			type: 'FRONT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 100,
		},
	],
	[
		{
			type: 'ROTATE_CLOCKWISE',
			value: 100,
		},
		{
			type: 'ANGLE',
			value: 90,
		},
	],
	[
		{
			type: 'END_REPEAT',
			value: null,
		},
	],
	[
		{
			type: 'STOP',
			value: null,
		},
	],
];

export const puzzleSolution1 = [
	[
		{
			type: 'START',
			value: null,
		},
	],
	[ 
		{
			type: 'FRONT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 100,
		},
	],
	[
		{
			type: 'ROTATE_CLOCKWISE',
			value: null,
		},
		{
			type: 'ANGLE',
			value: 270,
		},
	],
	[
		{
			type: 'FRONT',
			valule: null
		},
		{
			type: 'NUMBER',
			value: 200,
		},
	],
	[
		{
			type: 'ROTATE_CLOCKWISE',
			value: null,
		},
		{
			type: 'ANGLE',
			value: 90,
		},
	],
	[
		{
			type: 'FRONT',
			valule: null
		},
		{
			type: 'NUMBER',
			value: 100,
		},
	],
	[
		{
			type: 'ROTATE_CLOCKWISE',
			value: null,
		},
		{
			type: 'ANGLE',
			value: 90,
		},
	],
	[
		{
			type: 'FRONT',
			valule: null
		},
		{
			type: 'NUMBER',
			value: 200,
		},
	],
	[
		{
			type: 'ROTATE_CLOCKWISE',
			value: null,
		},
		{
			type: 'ANGLE',
			value: 270,
		},
	],
	[
		{
			type: 'FRONT',
			valule: null
		},
		{
			type: 'NUMBER',
			value: 100,
		},
	],
	[
		{
			type: 'STOP',
			value: null,
		},
	],
];

export const square = [
	[
		{
			type: 'START',
			value: null,
		},
	],
	[
		{
			type: 'REPEAT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 4,
		},
	],
	[
		{
			type: 'FRONT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 100,
		},
	],
	[
		{
			type: 'ROTATE_CLOCKWISE',
			value: null,
		},
		{
			type: 'ANGLE',
			value: 90,
		},
	],
	[
		{
			type: 'END_REPEAT',
			value: null,
		},
	],
	[
		{
			type: 'STOP',
			value: null,
		},
	],
];

export const star = [
	[
		{
			type: 'START',
			value: null,
		},
	],
	[
		{
			type: 'REPEAT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 5,
		},
	],
	[
		{
			type: 'FRONT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 100,
		},
	],
	[
		{
			type: 'ROTATE_CLOCKWISE',
			value: null,
		},
		{
			type: 'ANGLE',
			value: 144,
		},
	],
	// [
	// 	{
	// 		type: 'BREAK',
	// 		value: null,
	// 	},
	// ],
	[
		{
			type: 'END_REPEAT',
			value: null,
		},
	],
	[
		{
			type: 'STOP',
			value: null,
		},
	],
];

export const nestedLoop = [
	[
		{
			type: 'START',
			value: null,
		},
	],
	[
		{
			type: 'REPEAT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 2,
		},
	],
	[
		{
			type: 'REPEAT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 4,
		},
	],
	[
		{
			type: 'FRONT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 100,
		},
	],
	[
		{
			type: 'ROTATE_CLOCKWISE',
			value: null,
		},
		{
			type: 'ANGLE',
			value: 144,
		},
	],

	[
		{
			type: 'END_REPEAT',
			value: null,
		},
	],
	[
		{
			type: 'BREAK',
			value: null,
		},
	],
	[
		{
			type: 'END_REPEAT',
			value: null,
		},
	],
	[
		{
			type: 'STOP',
			value: null,
		},
	],
];


const infiniteLoop = [
	[
		{
			type: 'START',
			value: null,
		},
	],
	[
		{
			type: 'REPEAT',
			value: null,
		},
		// {
		// 	type: 'NUMBER',
		// 	value: 2,
		// },
	],
	[
		{
			type: 'FRONT',
			value: null,
		},
		{
			type: 'NUMBER',
			value: 100,
		},
	],
	[
		{
			type: 'ROTATE_CLOCKWISE',
			value: null,
		},
		{
			type: 'ANGLE',
			value: 144,
		},
	],

	[
		{
			type: 'END_REPEAT',
			value: null,
		},
	],
	// [
	// 	{
	// 		type: 'BREAK',
	// 		value: null,
	// 	},
	// ],
	// [
	// 	{
	// 		type: 'END_REPEAT',
	// 		value: null,
	// 	},
	// ],
	[
		{
			type: 'STOP',
			value: null,
		},
	],
];
