import React from 'react';
import { types } from '../../interpreter/lexer';

export const CodeDisplay = ({ tokens, activeLine = 0 }) => {

	//Go through each line of the Coodle Code
	const commands = tokens.map((tokenList, index) => {
		
		//Go through each token within a Coodle code's line
		const command = tokenList.map((token, index) => {

			//If its a command, use its corresponding image otherwise,..
			const imageSource = `/assets/cards/${token.type}.png`;
			let component = <img style={tokenStyle} src={imageSource} />;

			//..use a number in its place
			if (token.type == types.NUMBER || token.type == types.ANGLE) {
				let value = token.value;
				if(token.type == types.NUMBER && token.value >= 100) value = Math.ceil(value/100);
				component = <h1 style={numberStyle}>{value}</h1>;
			}
			return component;
		});
		return (
			
			//The current line is active, highlight it
			<div style={activeLine == index ? activeCommandStyle: commandStyle }>
				{command}
			</div>
		);
	});
	return <div style={codeStyle}>{commands}</div>;
};

const numberStyle = { 
    display: 'flex',
    margin: 0,
    padding: 10,
    height: '10vh',
    alignItems: 'center'

};

const commandStyle = {
	display: 'flex',
	justifyContent: 'start',
	textAlign: 'center',
	alignItems: 'center',
    width: '10vw',
    minWidth: '200px'
};

const activeCommandStyle = {
	display: 'flex',
	justifyContent: 'start',
	textAlign: 'center',
    alignItems: 'center',
    border: '2px solid green',
    minWidth: '200px'
};

const tokenStyle = {
	height: '10vh',
};

const codeStyle = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'start',
    alignItems: 'start',
    background: 'white',
    height: '400px',
    width: '400px',
    overflowY:'scroll',
    border: '1px solid grey',
    padding: 10
};