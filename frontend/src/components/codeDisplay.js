import React from 'react';
import { Breakpoint } from 'react-socks';
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
				if (token.type == types.NUMBER && token.value >= 100) value = Math.ceil(value / 100);
				component = <h1 style={numberStyle}>{value}</h1>;
			}
			return component;
		});
		return (
			//The current line is active, highlight it
			<div style={activeLine == index ? activeCommandStyle : commandStyle}>
				{command}
			</div>
		);
	});
	return (
		<div>
			<Breakpoint small down>
				<div style={codeStyleMobile}>{commands}</div>
			</Breakpoint>
			<Breakpoint large up>
				<div style={codeStyleDesktop}>{commands}</div>
			</Breakpoint>
		</div>
	)
};

const numberStyle = {
	display: 'flex',
	margin: 0,
	padding: 10,
	fontSize: 42,
	fontFamily: 'Nunito',
	alignItems: 'center',
};

const commandStyle = {
	display: 'flex',
	justifyContent: 'start',
	textAlign: 'center',
	alignItems: 'center',
	width: '10vw',
	minWidth: 200,
};

const activeCommandStyle = {
	display: 'flex',
	justifyContent: 'start',
	textAlign: 'center',
	alignItems: 'center',
	color: 'rgb(255, 255, 255)',
	background: 'rgb(200, 230, 252)',
	borderRadius: 5,
	minWidth: 200,
};

const tokenStyle = {
	marginTop: 5,
	height: 100,
};

const codeStyleDesktop = {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'start',
	alignItems: 'start',
	background: 'white',
	height: 350,
	width: 350,
	overflowY: 'scroll',
	boxShadow: '2px 2px 45px 9px rgba(5, 66, 252, 0.1)',
	borderRadius: 5,
	padding: 10,
};

const codeStyleMobile = {
	...codeStyleDesktop,
	height: 230,
}