import '../../dist/build.esm.js';

const cameraView = document.querySelector('#cameraView');

// Get a photo taken
cameraView.on('capture', event => {
  // Photos taken can be received in base64 format.
  console.log(event.detail.data);// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
});