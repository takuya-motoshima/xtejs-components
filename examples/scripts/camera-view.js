import '../../dist/build.esm.js';

const cameraView = document.querySelector('#cameraView');

// Get a photo taken
cameraView.on('capture', base64Image => {
  // Photos taken can be received in base64 format.
});