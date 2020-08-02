import React from 'react';
import { Form } from 'semantic-ui-react';
import '../styles/main.css';

export default function UploadImage(props) {
    const handleImageUpload = props.handleImageUpload;

	let res = (
			<form className="uploadForm" >
				<input
					type='file'
					onChange={(e) => {
						e.persist();
                        handleImageUpload(e, e.target.files[0], e.target.value, name);
					}}
					value={null}
					className='inputFile'
					id='embedpollfileinput1'
				></input>
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
