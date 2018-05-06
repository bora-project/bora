var header = $('.side-menu');
var mainPosition = $('.menu').position();
$(document).on('scroll', function () {
    header.css('top', -$(document).scrollTop() + mainPosition.top + 'px');
});
