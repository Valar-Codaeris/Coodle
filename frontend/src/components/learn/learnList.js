import React from 'react';
import { Dropdown } from 'semantic-ui-react';
import { useRouteMatch, Link } from 'react-router-dom';

export const LearnList = ({ list, onChoose }) => {
	
	//React state hook
	const [state, setState] = React.useState({ value: null });
	
	//useRouteMatch hook returns the current match object
	let match = useRouteMatch();

	//Elements of the dropdown list 
	const options = list.map((topic, index) => {
		return {
			key: topic,
			text: topic[0].toUpperCase() + topic.slice(1),
			value: topic,
			as: Link,
			to: `${match.url}/${topic}`,
			onClick: () => onChoose(index),
		};
	});

	//Renders a dropdown for lesson selection
	return (
		<Dropdown
			className='dropdownStyle'
			fluid
			placeholder='Select lesson'
			selection
			options={options}
			value={state}
		/>
	);
};