$(document).ready(function () {
    'use strict';

    var keylog = [],
        complete = false,
        lives = 3,
        bonus = new Audio('./sounds/bonus.wav'),
        life = new Audio('./sounds/1up.wav'),
        win = new Audio('./sounds/win.wav')

    $(document).keyup(function(event){
        if (!complete) {
            if (keylog.length < 10) {
                keylog.push(event.key);
            } else {
                keylog.shift();
                keylog.push(event.key);
            }
            if (keylog.join(' ') == 'ArrowUp ArrowUp ArrowDown ArrowDown ArrowLeft ArrowRight ArrowLeft ArrowRight b a') {
                $('#konami-code, #shadow').html('Lives x ' + lives);
                $('body').css({
                    'font-family': 'Press Start K',
                    'background-color': '#6d8ffc',
                    'color': 'white'
                });
                $('#shadow').css('color', 'black');
                bonus.play();
                setTimeout(function () {
                    var intervalId = setInterval(function increaseLives() {
                        if (lives < 30) {
                            lives++;
                            $('#konami-code, #shadow').html('Lives x ' + lives);
                            if (lives <= 29) {
                                life.play();
                            } else {
                                win.play();
                            }
                        } else {
                            clearInterval(intervalId);
                        }
                    }, 900);
                complete = true;
                }, 1000);
            }
        }
    });
});