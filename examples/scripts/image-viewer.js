import * as components from '../../dist/build.esm.js';

const imageViewer = document.querySelector('#imageViewer');

$('body').on('click', '[action-select-image]', event => {
  $('.image-list .selected').removeClass('selected');
  const $currentItem = $(event.currentTarget);
  $currentItem.addClass('selected');
  imageViewer.setAttribute('src', $currentItem.find('img').attr('src'));
});
