const $contentBody = $('#contentBody');

$('#nav').on('click', 'a', event => {
  event.preventDefault();
  $contentBody.attr('src', $(event.currentTarget).attr('href'));
});

$contentBody.attr('src', $('#nav').find('.active a').attr('href'));