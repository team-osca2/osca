var startPos = 0;
var pos = 0;
var endPos = 4;
// number of slides
var totalSlides = $('#slider-wrap ul li').length;
// get the slide width
var sliderWidth = $('#slider-wrap ul li').width();
var slideCount = 0;

$(document).ready(function () {
    // set width to be 'x' times the number of slides
    $('#slider-wrap ul#slider').width(sliderWidth * totalSlides);
    $('#slider-wrap ul#slider').css('transform', 'translateX(-' + (sliderWidth * pos) + 'px)');
    // $('.topBanner-nextArrow').on('click', slideRight);
    // $('.topBanner-prevArrow').on('click', slideLeft);

    let autoSlider = setInterval(slideRight, 3000);

    $('#slider-wrap').hover(
        function () {
            clearInterval(autoSlider);
        },
        function () {
            autoSlider = setInterval(slideRight, 3000);
        }
    );
});

function slideRight() {
    pos++;
    const moveValue = -sliderWidth * pos ;
    $('#slider-wrap ul#slider').css(
        {
            transition: 'transform 500ms',
            transform: `translateX(${moveValue}px)`
        }
    );
    if (pos == endPos) {
        pos = startPos;
        setTimeout(initialize, 500);
    }
}
function initialize(){
    // $('#slider-wrap ul#slider').finish();
    $('#slider-wrap ul#slider').css({
        transition: 'none',
        transform : 'translateX(-' + sliderWidth * pos + 'px)'
    });
}

