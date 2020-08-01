import React from 'react';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

import {Canvas} from './canvas';
// import '../coodle';

export const Play = () => {
  return <div> <Camera onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}/> <Canvas/></div>
}