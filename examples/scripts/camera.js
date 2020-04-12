import * as components from '../../dist/build.esm.js';

const camera1 = $('#camera1').get(0);
if (camera1.state === 'loading') {
  camera1.on('opened', () => {
    console.log('Camera 1 opened automatically');
  });
} else if (camera1.state === 'opened') {
  console.log('Camera 1 opened automatically');
}

const camera2 = $('#camera2').get(0);
const $pause = $('#pause');
$('body')
  .on('click', '[action-open]', async event => {
    await camera2.open($(event.currentTarget).data('facing'));
  })
  .on('click', '[action-pause]', async () => {
    if (camera2.paused) {
      await camera2.play();
      $pause.text('Pause');
    } else {
      camera2.pause()
      await camera2.pause();
      $pause.text('Play');
    }
  });
