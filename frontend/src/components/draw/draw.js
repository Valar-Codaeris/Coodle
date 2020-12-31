import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import { Icon } from 'semantic-ui-react';
import { Canvas, states } from './drawCanvas';
import UploadImage from '../uploadImage';
import axios from 'axios';
import { ExecutionWindow } from '../execution';
import { CodeDisplay } from '../codeDisplay';
import { InfoPanel } from './drawInfoPanel';
import { Breakpoint } from 'react-socks';
const { square } = require('../../../interpreter/sample');
const { loaderStyle, imageBoxStyle, imageStyle, compileStyle, uploadStyle, executionStyle, contentStyle} = require('../../styles/styles');

export class Draw extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			photoData: null,
			canvasState: states.INACTIVE,
			inputState: inputStates.INPUT,
			activeLine: 0,
			tokens: null,
		};
	}

	//Handler function to handle the component's state once the photo has been taken
	handleTakePhotos(dataUri) {
		console.log('photo captured');
		this.setState({
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
		this.setState({
			inputState: inputStates.LOADING,
		});
		axios
			.post('/api/lexer/', {
				data: this.state.photoData,
			})
			.then((response) => {
				const tokens = response.data;
				let tokenArray = [];
				for (let key in Object.keys(tokens)) {
					tokenArray[Number(key)] = tokens[key];
				}
				console.log(tokenArray);
				const tokenList = tokenArray.map((tokenList) => {
					const command = tokenList.map((token) => {
						if (token.indexOf('|') != -1) {
							// It is an angle or number
							const number = token.split('|');
							if (number.length == 2) {
								if (number[0] == 'TIMES') {
									return {
										type: 'NUMBER',
										value: Number(number[1]),
									};
								} else if (number[0] == 'ROTATE') {
									if (number[1] > 360) {
										number[1] = number[1] / 10;
									}
									return {
										type: 'ANGLE',
										value: Number(number[1]),
									};
								}
							} else {
								if (number[0] == 'TIMES') {
									return {
										type: 'NUMBER',
										value: 0,
									};
								} else if (number[0] == 'ROTATE') {
									return {
										type: 'ANGLE',
										value: 0,
									};
								}
							}
						} else {
							return {
								type: token,
								value: null,
							};
						}
					});
					return command;
				});
				console.log(tokenList);
				setTimeout(() => {
					this.setState({
						tokens: tokenList,
						canvasState: states.READY,
						inputState: inputStates.READY,
					});
				}, 3000);
			})
			.catch((error) => {
				console.error(error);
				this.setState({
					tokens: square,
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
	
	render() {
		let desktopComponent;
		let mobileComponent;
		//Show this when the image is being compiled
		if (this.state.inputState == inputStates.LOADING) {
			desktopComponent = (
				<div style={loaderStyle}>
					<div className='ui active inline loader'></div>
					<div>Compiling ...</div>
				</div>
			);
		}
		//If the image has been taken, user may choose to compile
		else if (this.state.inputState == inputStates.IMAGE) {
			desktopComponent = (
				<div style={imageBoxStyle}>
					<img style={imageStyle} src={this.state.photoData} />
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
			desktopComponent = (
				<CodeDisplay
					state={this.state.canvasState}
					tokens={this.state.tokens}
					activeLine={this.state.activeLine}
				/>
			);
			//mobileComponent is only being used for showing controls.
			mobileComponent = desktopComponent;
		}

		return (
			<div style={contentStyle}>
				{/* Information panel for the given mode */}
				<InfoPanel/>

				<Breakpoint small down>
					{/* p5.js Canvas is displayed here */}
					<Canvas
						state={this.state.canvasState}
						tokens={this.state.tokens}
						updateActiveLine={this.updateActiveLine.bind(this)}
					/>
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
								{mobileComponent}
						</ExecutionWindow>
					) : (
					<div style={uploadStyle}>
						<UploadImage 
							handleImageUpload={this.handleImageUpload.bind(this)}
							handleGetTokens={this.getTokens.bind(this)}
							/>
					</div>
					)}
				</Breakpoint>

				<Breakpoint large up>
					<div style={executionStyle}>
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
								{desktopComponent}
							</ExecutionWindow>
						) : (
							// If you haven't taken the image yet, then either click a picture or, upload an image
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
									handleGetTokens={this.getTokens.bind(this)}
								/>
							</div>
						)}
						{/* p5.js Canvas is displayed here */}
						<Canvas
							state={this.state.canvasState}
							tokens={this.state.tokens}
							updateActiveLine={this.updateActiveLine.bind(this)}
						/>
					</div>
				</Breakpoint>
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