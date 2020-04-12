import * as components from '../../dist/build.esm.js';

(async () => {

  // Auto open camera
  // Wait for it to open automatically
  const camera1 = $('#camera1').get(0);
  console.log(`Camera 1 state before opening: ${camera1.state}`)
  await camera1.waitOpened();
  console.log(`Camera 1 state after opening: ${camera1.state}`)

  // Manual open camera
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
})();

