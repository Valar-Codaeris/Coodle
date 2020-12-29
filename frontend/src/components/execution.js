import React from 'react';
import {Icon} from 'semantic-ui-react';

export class ExecutionWindow extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
    const { start, stop, reset, photoData } = this.props;
		const controlPanel = (
			<div style={controlPanelStyle}>
				<Icon name='repeat' circular link inverted size="big" color="yellow" onClick={reset}/>
				<Icon name='play' circular link inverted size= "big" color="green" onClick={start}  />
				<Icon name='stop' circular link inverted size="big" color="red" onClick={stop} />
			</div>
		);
		return (
			<div style={executionStyle}>
				{/* Controls will only been shown once the image has been compiled by the user */}
				{this.props.children}
				{!this.props.ready && controlPanel}
			</div>
		);
	}
}

const executionStyle = {
	width: 350,
	height: 350,
}

const controlPanelStyle = {
	display: 'flex',
	justifyContent: 'center',
	marginTop: 10,
	marginBottom: 10,
}