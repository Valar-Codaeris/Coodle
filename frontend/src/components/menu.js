import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const Menu = () => {
	return (
		<Card style={cardStyle}>
			<Card.Content>
				<Card.Description style={headingStyle}>
					<h1><span style={spanStyle}>C</span>OODLE</h1>
				</Card.Description>

				<Card.Meta>
					<div style={metaStyle}>
						Coodle is digital workspace for your kids to learn, doodle and play
						with code. You can select any one of the modes below to get started.
					</div>
				</Card.Meta>

				<Card.Description>
					<div style={buttonListStyle}>
						<Link to='/learn'>
							<Button style={buttonStyle} color='yellow'>
								Learn
							</Button>
						</Link>
						<Link to='/draw'>
							<Button style={buttonStyle} color='green'>
								Draw
							</Button>
						</Link>
						<Link to='/puzzle'>
							<Button style={buttonStyle} color='blue'>
								Puzzles
							</Button>
						</Link>
					</div>
				</Card.Description>
			</Card.Content>
		</Card>
	);
};

const headingStyle = {
	textAlign: 'center',
	color: 'rgb(102, 145, 255)',
	padding: '3px',
	fontFamily: 'Raleway',
};

const metaStyle = {
	textAlign: 'center',
	fontSize: '1em',
	fontFamily: 'Nunito',
	color: '#979797',
};

const buttonListStyle = {
	marginTop: '30px',
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'center',
	flexDirection: 'column',
	height: '23vh',
	width: '100%',
};

const cardStyle = {
	padding: 20,
	height: 'auto',
	width: '40vw',
	minWidth: '350px',
	boxShadow: '2px 2px 45px 9px rgba(0, 0, 0, 0.05)',
	borderRadius: '5px',
};

const buttonStyle = {
	width: '150px',
	boxShadow: '1px 2px 9px rgba(0, 0, 0, 0.12)',
	borderRadius: '4px',
	fontFamily: 'Nunito',
	fontWeight: '800',
	textTransform: 'uppercase',
	fontSize: '14px',
	height: '115%',
};

const spanStyle ={
	fontSize: '72px',
};