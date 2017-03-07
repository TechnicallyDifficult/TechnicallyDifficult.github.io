// $(document).ready(function () {
    'use strict'

    var boxHeight = 0,
        boxWidth = 0;

    $('.growing-box').hover(function () {
            boxHeight = $(this).height();
            boxWidth = $(this).width();
        (this).animate({
            'height': boxHeight * 2,
            'width': boxWidth * 2
        }, 250);
    });
// });