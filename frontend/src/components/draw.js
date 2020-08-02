import React from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import { Canvas, states } from './canvas';
import UploadImage from './uploadImage';
import axios from 'axios';
import { Form } from 'semantic-ui-react';

// Get the sample tokens
const sample = require('../../interpreter/sample');

console.log(FACING_MODES);
export class Draw extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			photo: false,
			play: false,
			photoData: null,
			canvasState: states.INACTIVE,
			inputState: inputStates.INPUT,
		};
	}

	handleTakePhotos(dataUri) {
		console.log('photo captured');
		// window.location = dataUri;
		this.setState(
			{
				photo: true,
				photoData: dataUri,
				inputState: inputStates.LOADING,
				// canvasState: states.READY,
			},
			(state) => {
				this.getTokens();
			}
		);
	}

	handleImageUpload(event, file, value) {
		console.log(file);
		const reader = new FileReader();

		reader.addEventListener(
			'load',
			() => {
				// convert image file to base64 string
				this.setState(
					{
						photoData: reader.result,
						photo: true,
						inputState: inputStates.LOADING,
						//   canvasState: states.READY
					},
					(state) => {
						this.getTokens();
					}
				);
			},
			false
		);

		if (file) {
			reader.readAsDataURL(file);
		}
	}

	resetState() {
		this.setState({
			photo: false,
			play: false,
			photoData: null,
			canvasState: states.INACTIVE,
			inputState: inputStates.INPUT,
		});
	}

	getTokens() {
		// axios.get()
		axios
			.post('/api/lexer/', {
				data: this.state.photoData,
			})
			.then((response) => {
				console.log(response);
				this.setState({
					tokens: sample, 
					canvasState: states.READY,
					inputState: inputStates.READY
				})
			})
			.catch((error) => {
				console.error(error);
				this.resetState();
			});

		// setTimeout(() => {
		// 	this.setState({
		// 		tokens: sample,
		// 		canvasState: states.READY,
		// 		inputState: inputStates.READY,
		// 	});
		// }, 3000);
	}

	render() {
		const photo = <img className='imageStyle' src={this.state.photoData} />;
		const controlPanel = (
			<div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		);
		return (
			<div className='drawContentStyle'>
				{this.state.photo ? (
					photo
				) : (
					<div className='cameraStyle'>
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
				<Canvas state={this.state.canvasState} tokens={sample} />
			</div>
		);
	}
}

const inputStates = {
	INPUT: 'input',
	LOADING: 'loading',
	READY: 'ready',
};
