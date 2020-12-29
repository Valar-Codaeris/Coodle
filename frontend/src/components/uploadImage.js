import React from 'react';
import { Breakpoint } from 'react-socks';
import '../styles/main.css';

export default function UploadImage(props) {
	const handleImageUpload = props.handleImageUpload;
	const getTokens = props.handleGetTokens;

	let res = (
		<form style={uploadFormStyle} >

			{/*Simply upload the file and then wait for user to compile.*/}
			<Breakpoint large up>
				<input
					type='file'
					onChange={(e) => {
						e.persist();
						handleImageUpload(e, e.target.files[0], e.target.value);
					}}
					value={null}
					className='inputFile'
					id='embedpollfileinput1'
				/>
			</Breakpoint>
			
			{/* On mobile, don't wait for the user to click compile. Just compile it.*/}
			<Breakpoint small down>
				<input
						type='file'
						onChange={(e) => {
							e.persist();
							handleImageUpload(e, e.target.files[0], e.target.value);
							getTokens();
						}}
						value={null}
						className='inputFile'
						id='embedpollfileinput1'
					/>
			</Breakpoint>

			<div className='inputLabel'>
				<label htmlFor='embedpollfileinput1' className='ui blue button inverted'>
					<i className='ui upload icon' />
					Upload
				</label>
			</div>
		</form>
	);
	return res;
}

const uploadFormStyle = {
	position: 'absolute',
	padding: 5,
	bottom: 0,
	right: -4,
}