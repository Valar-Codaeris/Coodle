import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

export const Header = () => {
	return (
		<Segment attached style={boxStyle}>
			<div style={brandStyle}>
				<img src='/assets/monkey.png' style={imageStyle}></img>
				<h2 style={headingStyle}><span style={spanStyle}>C</span>OODLE</h2>
			</div>
		</Segment>
	);
};

const boxStyle = {
	background: 'rgb(102, 145, 255)',
	boxShadow: '0px 4px 9px 2px rgba(0, 0, 0, 0.09)',
	display: 'flex',
	border: 'none',
	alignItems: 'center',
    justifyContent: 'space-between',
    height: '7vh',
};

const brandStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	// paddingLeft: 10,
	color: 'white',
    width: '13vw',
    minWidth: '160px'
};

const imageStyle = {
	height: '3.5vh',
};

const headingStyle = {
	padding: 0,
	margin: '10px',
	fontFamily: 'Raleway',
};

const spanStyle ={
	fontSize: '36px',
}