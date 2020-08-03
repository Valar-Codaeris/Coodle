import React from 'react';
import { Segment, Icon } from 'semantic-ui-react';

export const Header = () => {
	return (
		<Segment attached style={boxStyle}>
			<div style={brandStyle}>
				<img src='/assets/monkey.png' style={imageStyle}></img>
				<h2 style={headingStyle}>COODLE</h2>
			</div>
			<Icon name='setting' size='large' inverted />
		</Segment>
	);
};

const boxStyle = {
	background: 'rgb(102, 145, 255)',
	display: 'flex',
	border: 'none',
	alignItems: 'center',
    justifyContent: 'space-between',
    height: '7vh',
};

const brandStyle = {
	display: 'flex',
	justifyContent: 'space-around',
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
	margin: 0,
};
