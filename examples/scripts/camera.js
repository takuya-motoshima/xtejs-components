import '../../dist/build.esm.js';

(async () => {

  // Auto open camera
  // Wait for it to open automatically
  const camera1 = $('#camera1').get(0);
  await camera1.waitOpened();

  // Manual open camera
  const camera2 = $('#camera2').get(0);

  // Set camera event listener
  camera2
    .on('opened', event => console.log('Camera opened'))
    .on('played', event => console.log('Camera played'))
    .on('paused', event => console.log('Camera paused'));

  // Camera open button click event
  $('[action-open]').on('click', async event => {
    await camera2.open($(event.currentTarget).data('facing'));
  });

  // Camera play pause button click event
  $('[action-pause]').on('click', () => {
    if (camera2.paused) {
      camera2.play();
       $('#pause').text('Pause');
    } else {
      camera2.pause();
      $('#pause').text('Play');
    }
  });
})();

