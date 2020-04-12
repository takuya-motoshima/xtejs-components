import * as components from '../../dist/build.esm.js';

const camera = document.querySelector('#camera');
const $pause = $('[action-pause]');

$('body')
  .on('click', '[action-open-front-camera]', async () => {
    await camera.open('front');
  })
  .on('click', '[action-open-rear-camera]', async () => {
    await camera.open('back');
  })
  .on('click', '[action-pause]', async () => {
    if (camera.paused) {
      await camera.play();
      $pause.text('Pause');
    } else {
      camera.pause()
      await camera.pause();
      $pause.text('Play');
    }
  });