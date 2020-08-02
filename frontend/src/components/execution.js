import React from 'react';

import {Icon} from 'semantic-ui-react';

export class ExecutionWindow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
        const { start, stop, reset, photoData } = this.props;
        console.log(photoData)
		const photo = <img className='imageStyle' src={photoData} />;
		const controlPanel = (
			<div className='controlPanel'>
				<Icon name='repeat' circular link size="big" color="blue" onClick={reset}/>
				<Icon name='play' circular link size= "big" color="green" onClick={start}  />
				<Icon name='stop' circular link  size="big" color="red" onClick={stop} />
			</div>
		);
		return (
			<div>
				{photo}
				{controlPanel}
			</div>
		);
	}
}



