import React from 'react';

import { Dropdown } from 'semantic-ui-react';
import { useRouteMatch, Link } from 'react-router-dom';

export const LearnList = ({ list, onChoose }) => {
	const [state, setState] = React.useState({ value: null });
	const handleChange = (e, { value }) => setState(value);
	let match = useRouteMatch();
	const options = list.map((topic, index) => {
		console.log(topic);
		return {
			key: topic,
			text: topic[0].toUpperCase() + topic.slice(1),
			value: topic,
			as: Link,
			to: `${match.url}/${topic}`,
			href: `${match.url}/${topic}`,
			onClick: () => onChoose(index),
		};
	});
	return (
		<Dropdown
			className='dropdownStyle'
			fluid
			placeholder='Select lesson'
			selection
            options={options}
            onChoose={handleChange}
            value={state}
		/>
	);
};
