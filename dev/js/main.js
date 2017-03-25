var Main = (function() {
    'use strict';

    var NUMBER_ITEMS = 4;
    var sequence = [];
    var numberTry = 0;
    var intSeq;
    var record = 0;

    /* ------------------------------------------------------------------------------------------------*/
    /*                                    Initialize                                                   */
    /* ------------------------------------------------------------------------------------------------*/
    var init = function() {

        document.getElementById('play-button').addEventListener('click', playGame);
        if (localStorage.getItem('record')) {
            record = localStorage.getItem('record');
            document.getElementById('record').innerHTML = record;
        }
    }

    /* ------------------------------------------------------------------------------------------------*/
    /*                           INTERNAL FUNCTIONS                                                    */
    /* ------------------------------------------------------------------------------------------------*/
    var playGame = function() {
        sequence = [];
        numberTry = 0;
        document.getElementById('points').innerHTML = numberTry;
        document.querySelector('.color-targets').removeEventListener('click', clickColor);
        document.querySelector('.color-targets').addEventListener('click', clickColor);
        addSequence();
    }

    var addSequence = function() {
        sequence.push(generateNext());
        showSequence();
    }

    var showSequence = function() {
        showMessage("Memorize...");
        var i = 0;
        intSeq = setInterval(function() {
            clickEffect(sequence[i]);
            i++;
            if (i === sequence.length) {
                clearInterval(intSeq);
                showMessage("TRY");
            }
        }, 800);
    }

    var clickColor = function(evt) {
        var item = evt.target.dataset.item;
        console.log(item);
        console.log(sequence);

        if (sequence[numberTry] != item) {
            document.querySelector('.color-targets').removeEventListener('click', clickColor);
            showMessage("Error!, play again");
        } else {
            numberTry++;
            document.getElementById('points').innerHTML = numberTry;
            if (numberTry > record) {
                record = numberTry;
                document.getElementById('record').innerHTML = record;
                localStorage.setItem('record', record);
            }
            if (numberTry == sequence.length) {
                numberTry = 0;
                setTimeout(addSequence, 600);
            }
        }
        clickEffect(item);
    }

    var generateNext = function() {
        return (Math.floor(Math.random() * NUMBER_ITEMS));
    }

    var clickEffect = function(colorItem) {
        Utils.addClass(document.getElementById('target' + colorItem), 'selected');
        setTimeout(function() {
            Utils.removeClass(document.getElementById('target' + colorItem), 'selected');
        }, 300);
    }

    var showMessage = function(message) {
        document.getElementById('message').innerHTML = message;
    }


    return {
        // Public function
        init: init
    };
})();