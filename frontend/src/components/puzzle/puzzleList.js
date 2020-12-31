import React from 'react';
import { Dropdown } from 'semantic-ui-react';

export const PuzzleList = ({ list, onChoose }) => {
	
	//React state hook
	const [state, setState] = React.useState({ value: null });

	//Elements of the dropdown list 
	const options = list.map((topic, index) => {
		return {
			key: topic,
			text: topic,
			value: topic,
			onClick: () => onChoose(index),
		};
	});

	//Renders a dropdown for lesson selection
	return (
		<Dropdown
			className='dropdownStyle'
			fluid
			placeholder='Select Level'
			selection
			options={options}
			value={state}
		/>
	);
};