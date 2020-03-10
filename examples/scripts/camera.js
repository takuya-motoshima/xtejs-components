import * as components from '../../dist/build.esm.js';

const camera = document.querySelector('#camera');
const $pause = $('[action-pause]');
let paused = false;

$('body')
  .on('click', '[action-open-front-camera]', async () => {
    await camera.open('front');
  })
  .on('click', '[action-open-rear-camera]', async () => {
    await camera.open('back');
  })
  .on('click', '[action-pause]', async () => {
    if (paused) {
      await camera.play();
      $pause.text('Pause');
      
    } else {
      await camera.pause();
      $pause.text('Play');
    }
    paused = !paused;
  });

camera.open('back');