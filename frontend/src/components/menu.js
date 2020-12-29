import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
const { cardStyle, headingStyle, spanStyle, metaStyle } = require('../styles/styles');

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

export const buttonListStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	flexDirection: 'column',
	width: '100%',
};

export const buttonStyle = {
	width: 150,
	boxShadow: '1px 2px 9px rgba(0, 0, 0, 0.12)',
	borderRadius: 4,
	fontFamily: 'Nunito',
	fontWeight: 800,
	textTransform: 'uppercase',
	fontSize: 14,
	height: 45,
	marginTop: 20,
};