import React from 'react';
import { Card, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

export const Menu = () => {
	return (
		<Card style={cardStyle}>
			<Card.Content>
				<Card.Description style={headingStyle}>
					<h1>COODLE</h1>
				</Card.Description>
				<Card.Meta>
					<div style={metaStyle}>
						Coodle is digital workspace for your kids to learn, doodle and play
						with code
					</div>
				</Card.Meta>
				<Card.Description>
					<div style={buttonListStyle}>
						<Link to='/learn'>
							<Button style={buttonStyle} inverted color='red' lin>
								Learn
							</Button>
						</Link>

						<Link to='/draw'>
							<Button style={buttonStyle} inverted color='blue'>
								Draw
							</Button>
						</Link>

						<Link to='/puzzle'>
							<Button style={buttonStyle} inverted color='green'>
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
};

const metaStyle = {
	textAlign: 'center',
	fontSize: '1em',
};

const buttonListStyle = {
	display: 'flex',
	justifyContent: 'space-around',
	alignItems: 'center',
	flexDirection: 'column',
	height: '25vh',
	width: '100%',
	padding: 10,
};

const cardStyle = {
	padding: 20,
	height: '50vh',
    width: '30vw',
    minWidth: '350px'
};

const buttonStyle = {
	width: '150px',
};
