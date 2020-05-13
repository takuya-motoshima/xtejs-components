import '../../dist/build.esm.js';

const camera = document.querySelector('#camera');

// Get a photo taken
camera.on('capture', event => {
  // Photos taken can be received in base64 format.
  console.log(event.detail.data);// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
});