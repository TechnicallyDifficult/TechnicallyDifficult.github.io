$(document).ready(function () {
    'use strict';

    function refresh() {
        $('#posts').html('');
        $.get('./data/blog.json').done(function (data) {
            data.reverse().forEach(function (element, index, array) {
                $('#posts').append('<article><time>' + element.date + '</time><h2>' + element.title + '</h2><p>' + element.content + '</p><footer>' + '<a href="#" class="categories">' + element.categories.join('</a>, <a href="#" class="categories">') + '</a></footer></article>');
            });
        });
    }
    refresh();
    $('#refresh').click(refresh);
});