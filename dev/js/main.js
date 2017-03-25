var Main = (function() {
    'use strict';

    var numberItems = 4;
    var sequence = [];
    var numberTry = 0;
    var intSeq;
    var record = 0;

    /* ------------------------------------------------------------------------------------------------*/
    /*                                    Initialize                                                   */
    /* ------------------------------------------------------------------------------------------------*/
    var init = function() {

        document.getElementById('play-button').addEventListener('click', playGame);
        document.getElementById('chooseLevel').addEventListener('change', changeLevel);
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
        document.querySelector('.color-targets').removeEventListener('mousedown', clickColor);
        document.querySelector('.color-targets').addEventListener('mousedown', clickColor);
        addSequence();
    }

    var changeLevel = function() {
        var level = document.getElementById("chooseLevel").value;
        numberItems = level;
        Utils.removeClass(document.querySelectorAll('.color-target'), 'active');
        Utils.addClass(document.querySelectorAll('.level' + level), 'active');
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
                showMessage("Try", 300);
            }
        }, 800);
    }

    var clickColor = function(evt) {
        var item = evt.target.dataset.item;
        if (!item) {
            // click outside a color
            return;
        }

        if (sequence[numberTry] != item) {
            // Error!
            document.querySelector('.color-targets').removeEventListener('mousedown', clickColor);
            showMessage("Error! Play again");
            wrongEffect(sequence[numberTry]);
        } else {
            // OK
            numberTry++;
            if (numberTry === sequence.length) {
                document.getElementById('points').innerHTML = numberTry;
            }
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
        return (Math.floor(Math.random() * numberItems));
    }

    var clickEffect = function(colorItem) {
        showEffect(colorItem, 'selected', 300);
    }

    var wrongEffect = function(colorItem) {
        showEffect(colorItem, 'wrong', 700);
    }

    var showEffect = function(colorItem, className, delay) {
        Utils.addClass(document.getElementById('target' + colorItem), className);
        setTimeout(function() {
            Utils.removeClass(document.getElementById('target' + colorItem), className);
        }, delay);
    }


    var showMessage = function(message, delay) {
        delay = delay || 0;
        setTimeout(function(){
            document.getElementById('message').innerHTML = message;
        }, delay)
    }


    return {
        // Public function
        init: init
    };
})();