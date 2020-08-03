import React from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import { LearnCanvas, states } from './learnCanvas';
import UploadImage from '../uploadImage';
import axios from 'axios';
import { ExecutionWindow } from '../execution';

// Get the sample tokens
const {learnSolution1} = require('../../../interpreter/sample');

console.log(FACING_MODES);
export class Learn extends React.Component {
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


	getTokens() {
		axios
			.post('/api/lexer/', {
				data: this.state.photoData,
			})
			.then((response) => {
				console.log(response);
				this.setState({
					tokens: learnSolution1, 
					canvasState: states.READY,
					inputState: inputStates.READY
				})
			})
			.catch((error) => {
				// console.error(error);
				// this.reset();
				this.setState({
					tokens: learnSolution1, 
					canvasState: states.READY,
					inputState: inputStates.READY
				})
			});
	}

	stop() {
		this.setState({
			canvasState: states.RESET
		});
	}

	start() {
		this.setState({
			canvasState: states.PLAY
		});
	}


	reset() {
		this.setState({
			photo: false,
			play: false,
			photoData: null,
			canvasState: states.RESET,
			inputState: inputStates.INPUT,
		});
	}

	render() {
		return (
			<div className='drawContentStyle'>
				{this.state.photoData ? (	
					<ExecutionWindow start={this.start.bind(this)} stop={this.stop.bind(this)} reset={this.reset.bind(this)} photoData={this.state.photoData}/>
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
				<LearnCanvas state={this.state.canvasState} tokens={learnSolution1} />
			</div>
		);
	}
}

const inputStates = {
	INPUT: 'input',
	LOADING: 'loading',
	READY: 'ready',
};
