import React from 'react';
import { types } from '../../interpreter/lexer';

export const CodeDisplay = ({ tokens, activeLine = 0 }) => {
	const commands = tokens.map((tokenList, index) => {
		const command = tokenList.map((token, index) => {
			const imageSource = `/assets/cards/${token.type}.png`;
			let component = <img style={tokenStyle} src={imageSource} />;
			if (token.type == types.NUMBER || token.type == types.ANGLE) {
				component = <h1 style={numberStyle}>{token.value}</h1>;
			}
			return component;
		});
		return (
			<div style={activeLine == index ? commandStyle : activeCommandStyle}>
				{command}
			</div>
		);
	});
	return <div style={codeStyle}>{commands}</div>;
};

const numberStyle = { 
    display: 'inline',
    // paddingLeft: 10,
    margin: 0,
    // background: 'grey',
    // color: 'white',
    height: '10vh',
};
const commandStyle = {
	display: 'flex',
	justifyContent: 'start',
	textAlign: 'center',
	alignItems: 'center',
	width: '10vw',
};
const activeCommandStyle = {
	display: 'flex',
	justifyContent: 'center',
	textAlign: 'center',
    alignItems: 'center',
    border: '1px solid grey'
};
const tokenStyle = {
	height: '10vh',
};
const codeStyle = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'start',
	alignItems: 'start',
};
