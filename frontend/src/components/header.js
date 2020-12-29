import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Icon } from 'semantic-ui-react';

export const Header = () => {
	return (
		<Segment attached style={boxStyle}>
			<Link to="/" style={brandStyle}>
				<img src='/assets/monkey.png' style={imageStyle}></img>
				<h2 style={headingStyle}><span style={spanStyle}>C</span>OODLE</h2>
			</Link>
		</Segment>
	);
};

const boxStyle = {
	position: 'sticky',
	background: 'rgb(102, 145, 255)',
	boxShadow: '0px 4px 9px 2px rgba(0, 0, 0, 0.09)',
	display: 'flex',
	border: 'none',
	alignItems: 'center',
	justifyContent: 'space-between',
	height: 60,
	zIndex: 1,
};

const brandStyle = {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	color: 'white',
	width: '13vw',
	minWidth: '160px'
};

const imageStyle = {
	height: 30,
	marginTop: 0,
};

const headingStyle = {
	padding: 0,
	margin: '10px',
	fontFamily: 'Raleway',
};

const spanStyle = {
	fontSize: '36px',
}