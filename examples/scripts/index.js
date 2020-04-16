const $content = $('#content');
const $nav = $('#nav');

$nav.on('click', 'a', event => {
  event.preventDefault();
  $nav.find('.active').removeClass('active');
  const $link = $(event.currentTarget);
  $link.closest('li').addClass('active');
  const url = $link.attr('href');
  Cookies.set('selectedLink', url);
  $content.attr('src', url);
});

if (Cookies.get('selectedLink') && $nav.find(`[href="${Cookies.get('selectedLink')}"]`).length) {
  $nav.find('.active').removeClass('active');
  $nav.find(`[href="${Cookies.get('selectedLink')}"]`).closest('li').addClass('active');
  $content.attr('src', Cookies.get('selectedLink'));
} else {
  $content.attr('src', $nav.find('.active a').attr('href'));
}
