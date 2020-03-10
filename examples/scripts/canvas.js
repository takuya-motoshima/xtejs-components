import * as components from '../../dist/build.esm.js';

const canvas = document.querySelector('#canvas');

$('body')
  .on('click', '[action-drawing]', event => {
    canvas.drawImageScaled(event.currentTarget);
  })
  .on('click', '[action-clear]', () => {
    canvas.clear();
  });
