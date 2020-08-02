import React from 'react';

import { Dropdown } from 'semantic-ui-react';
import { useRouteMatch, Link } from 'react-router-dom';

export const LearnList = ({ list }) => {
	let match = useRouteMatch();
	const options = list.map((topic) => {
		console.log(topic);
		return {
			key: topic,
			text: topic[0].toUpperCase() + topic.slice(1),
			value: topic,
            as: Link,
            to: `${match.url}/${topic}`,
			href: `${match.url}/${topic}`,
		};
	});
	return <Dropdown className="dropdownStyle" fluid placeholder='Select lesson' selection options={options} />;
};
