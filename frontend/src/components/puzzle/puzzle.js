import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Icon } from 'semantic-ui-react';
import { Canvas, states } from './puzzleCanvas';
import UploadImage from '../uploadImage';
import axios from 'axios';
import { ExecutionWindow } from '../execution';
import { CodeDisplay } from '../codeDisplay';
const {
	puzzleSolution1,
	puzzleSolution2,
	puzzleSolution3,
} = require('../../../interpreter/sample');

export class Puzzle extends React.Component {
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
			tokens: null,
			level: props.level | 1,
		};
	}

	//Handler function to handle the component's state once the photo has been taken
	handleTakePhotos(dataUri) {
		console.log('photo captured');
		this.setState({
			photo: true,
			photoData: dataUri,
			inputState: inputStates.IMAGE,
		});
	}

	//Handler function to handle the component's state once the image is uploaded
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
		let tokens;
		switch (this.props.level) {
			case 1:
				tokens = puzzleSolution1;
				break;
			case 2:
				tokens = puzzleSolution2;
				break;
			case 3:
				tokens = puzzleSolution3;
				break;
			default:
				tokens = puzzleSolution3;
				break;
		}
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
						tokens: tokens,
						canvasState: states.READY,
						inputState: inputStates.READY,
					});
				}, 3000);
			})
			.catch((error) => {
				this.setState({
					tokens: tokens,
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

	//If new puzzle is loaded
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
		//Show this when the image is being compiled
		if (this.state.inputState == inputStates.LOADING) {
			component = (
				<div style={loaderStyle}>
					<div className='ui active inline loader'></div>
					<div>Compiling ...</div>
				</div>
			);
		}
		//If the image has been taken, user may choose to compile
		else if (this.state.inputState == inputStates.IMAGE) {
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
		}
		//If the image has been taken and compiled
		else if (
			this.state.canvasState == states.READY ||
			this.state.canvasState == states.PLAY ||
			this.state.canvasState == states.RESET
		) {
			component = (
				<CodeDisplay
					state={this.state.canvasState}
					tokens={this.state.tokens}
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
			<div className='puzzleContentStyle'>
				{/* If image has been taken, then show program controls once the image has been compiled */}
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
					// If you haven't taken the image yet, then either click a picture or, upload an image
					<div className='puzzleCameraStyle'>
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
				{/* p5.js Canvas is displayed here */}
				<Canvas
					state={this.state.canvasState}
					tokens={this.state.tokens}
					level={this.props.level}
					updateActiveLine={this.updateActiveLine.bind(this)}
				/>
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
