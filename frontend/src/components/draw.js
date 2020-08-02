import React from 'react';
import Camera, { FACING_MODES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import { Canvas, states } from './canvas';
import UploadImage from './uploadImage';
import axios from 'axios';

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
		};
	}

	handleTakePhotos(dataUri) {
		console.log('photo captured');
		// window.location = dataUri;
		this.setState({
			photo: true,
			photoData: dataUri,
			// canvasState: states.READY,
		}, (state) => {
			this.getTokens()
		});
	}

	handleImageUpload(event, file, value) {
		console.log(file);	
		const reader = new FileReader();

		reader.addEventListener("load", () => {
		  // convert image file to base64 string
		  this.setState({
			  photoData: reader.result,
			  photo:true,
			//   canvasState: states.READY
		  }, (state) => {
			  this.getTokens()
		  });
		}, false);
	  
		if (file) {
		  reader.readAsDataURL(file);
		}
	}

	getTokens() {
		// axios.get()
		setTimeout(() => {
			this.setState({
				tokens: sample,
				canvasState: states.READY
			});
		}, 1000)
	}

	render() {
		const photo = <img className="imageStyle" src={this.state.photoData} />;
		const controlPanel = <div>
			<div>

			</div>
			<div>

			</div>
			<div>

			</div>
		</div>
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
