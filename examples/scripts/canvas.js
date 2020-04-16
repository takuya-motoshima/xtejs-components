import '../../dist/build.esm.js';

const canvas = document.querySelector('#canvas');

$('body').on('click', '[action-select-image]', event => {
  $('.image-list .selected').removeClass('selected');
  const $currentItem = $(event.currentTarget);
  $currentItem.addClass('selected');
  canvas.clear().drawImageScaled($currentItem.find('img').get(0));
});
