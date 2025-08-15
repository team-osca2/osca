const $study = $('.study-fav');
const $cafe = $('.cafe-fav');

const $underline = $('.underline');

$study.on('click', function() {
    $study.addClass('active');
    $cafe.removeClass('active');
    $underline.removeClass('active-underline');
    $('.cafe-scrap-list').addClass('hidden');
    $('.study-scrap-list').removeClass('hidden');

    $(this).closest('.underline').addClass('active-underline');
});

$cafe.on('click', function() {
    $cafe.addClass('active');
    $study.removeClass('active');
    $underline.removeClass('active-underline');
    $('.cafe-scrap-list').removeClass('hidden');
    $('.study-scrap-list').addClass('hidden');

    $(this).closest('.underline').addClass('active-underline');
});


