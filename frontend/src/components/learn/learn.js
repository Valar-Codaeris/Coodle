import React from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Icon } from 'semantic-ui-react';

import { Canvas, states } from './learnCanvas';
import UploadImage from '../uploadImage';
import axios from 'axios';
import { ExecutionWindow } from '../execution';
import { CodeDisplay } from '../codeDisplay';

import { Loader } from 'semantic-ui-react';
// Get the sample tokens
const { nestedLoop, square } = require('../../../interpreter/sample');

console.log(FACING_MODES);
export class Learn extends React.Component {
	constructor(props) {
		super(props);
		this.level = props.level;
		this.state = {
			photo: false,
			play: false,
			photoData: null,
			canvasState: states.INACTIVE,
			inputState: inputStates.INPUT,
			activeLine: 0,
		};
	}

	handleTakePhotos(dataUri) {
		console.log('photo captured');
		this.setState({
			photo: true,
			photoData: dataUri,
			inputState: inputStates.IMAGE,
		});
	}

	handleImageUpload(event, file, value) {
		console.log(file);
		const reader = new FileReader();

		reader.addEventListener(
			'load',
			() => {
				// convert image file to base64 string
				this.setState({
					photoData: reader.result,
					photo: true,
					inputState: inputStates.IMAGE,
				});
			},
			false
		);

		if (file) {
			reader.readAsDataURL(file);
		}
	}

	getTokens() {
		// axios.get()
		this.setState({
			inputState: inputStates.LOADING,
		});
		axios
			.post('/api/lexer/', {
				data: this.state.photoData,
			})
			.then((response) => {
				console.log(response);
				setTimeout(() => {
					this.setState({
						tokens: square,
						canvasState: states.READY,
						inputState: inputStates.READY,
					});
				}, 3000);
			})
			.catch((error) => {
				this.setState({
					tokens: nestedLoop,
					canvasState: states.READY,
					inputState: inputStates.READY,
				});
			});
	}

	stop() {
		this.setState({
			canvasState: states.RESET,
			activeLine: 0,
		});
	}

	start() {
		this.setState({
			canvasState: states.PLAY,
		});
	}

	reset() {
		this.setState({
			photo: false,
			play: false,
			photoData: null,
			canvasState: states.RESET,
			inputState: inputStates.INPUT,
			activeLine: 0,
		});
	}

	updateActiveLine(activeLine) {
		this.setState({
			activeLine,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.level != this.props.level) {
			console.log('Changed the level');
			if (prevProps.level) this.reset();
			else {
				this.setState({
					canvasState: states.INACTIVE, // set as inactive
					inputState: inputStates.INPUT, // set as input
					photo: false,
					play: false,
					photoData: null,
					activeLine: 0,
				});
			}
		}
	}
	render() {
		let component;
		if (this.state.inputState == inputStates.LOADING) {
			component = (
				<div style={loaderStyle}>
					<div className='ui active inline loader'></div>
					<div>Compiling ...</div>
				</div>
			);
		} else if (this.state.inputState == inputStates.IMAGE) {
			component = (
				<div style={imageStyle}>
					<img className='imageStyle' src={this.state.photoData} />
					<Icon
						style={compileStyle}
						link
						size='huge'
						name='cogs'
						onClick={this.getTokens.bind(this)}
					/>
				</div>
			);
		} else if (
			this.state.canvasState == states.READY ||
			this.state.canvasState == states.PLAY ||
			this.state.canvasState == states.RESET
		) {
			component = (
				<CodeDisplay
					state={this.state.canvasState}
					tokens={square}
					activeLine={this.state.activeLine}
				/>
			);
		} else if (this.state.canvasState == states.INACTIVE) {
			component = (
				<div className='cameraStyle'>
					<Camera
						isImageMirror={false}
						idealResolution={{ width: 640, height: 480 }}
						onTakePhoto={(dataUri) => {
							this.handleTakePhotos(dataUri);
						}}
					/>
					<UploadImage handleImageUpload={this.handleImageUpload.bind(this)} />
				</div>
			);
		}

		return (
			<div className='learnContentStyle'>
				<Canvas
					state={this.state.canvasState}
					tokens={this.state.tokens}
					level={this.props.level}
					updateActiveLine={this.updateActiveLine.bind(this)}
				/>
				{this.state.photoData ? (
					<ExecutionWindow
						start={this.start.bind(this)}
						stop={this.stop.bind(this)}
						reset={this.reset.bind(this)}
						photoData={this.state.photoData}
						ready={
							this.state.inputState == inputStates.LOADING ||
							this.state.inputState == inputStates.IMAGE
						}
					>
						{' '}
						{component}{' '}
					</ExecutionWindow>
				) : (
					<div className='learnCameraStyle'>
						<Camera
							isImageMirror={false}
							idealResolution={{ width: 640, height: 480 }}
							onTakePhoto={(dataUri) => {
								this.handleTakePhotos(dataUri);
							}}
						/>
						<UploadImage
							handleImageUpload={this.handleImageUpload.bind(this)}
						/>
					</div>
				)}
			</div>
		);
	}
}

const inputStates = {
	INPUT: 'input',
	LOADING: 'loading',
	READY: 'ready',
	IMAGE: 'image',
};

const loaderStyle = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	width: '400px',
	height: '400px',
	background: 'white',
	border: '2px solid grey',
};

const imageStyle = {
	position: 'relative',
	height: '400px',
	width: '400px',
	background: 'white',
};

const compileStyle = {
	position: 'absolute',
	top: '200px',
	left: '200px',
};
