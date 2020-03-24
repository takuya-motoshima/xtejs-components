import * as components from '../../dist/build.esm.js';

const imageView = document.querySelector('#imageView');

$('body').on('click', '[action-select-image]', event => {
  $('.image-list .selected').removeClass('selected');
  const $currentItem = $(event.currentTarget);
  $currentItem.addClass('selected');
  imageView.setAttribute('src', $currentItem.find('img').attr('src'));
});
