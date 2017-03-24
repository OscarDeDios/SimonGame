var Main = (function () {
'use strict';

var sequence = [];
var numberTry = 0;
var intSeq;
/* ------------------------------------------------------------------------------------------------*/
/*                                    Initialize                                                   */
/* ------------------------------------------------------------------------------------------------*/
var init = function() {

    document.getElementById('play-button').addEventListener('click', playGame);

}

/* ------------------------------------------------------------------------------------------------*/
/*                           INTERNAL FUNCTIONS                                                    */
/* ------------------------------------------------------------------------------------------------*/
var playGame = function () {
    sequence = [];
    numberTry = 0;
    document.querySelector('.color-targets').removeEventListener('click', clickColor);
    document.querySelector('.color-targets').addEventListener('click', clickColor);
    addSequence();
}

var addSequence = function() {
    sequence.push(generateNext());
    showSequence();
}

var showSequence = function() {
    var i = 0;
    intSeq = setInterval(function() {
        clickEffect(sequence[i]);
        i++;
        if (i === sequence.length) {
            clearInterval(intSeq);
        }
    },800);
}

var clickColor = function (evt) {
    var item = evt.target.dataset.item;
    clickEffect(item);
    if (sequence[numberTry] != item) {
        document.querySelector('.color-targets').removeEventListener('click', clickColor);
        console.log('fallo');
    } else {
            numberTry++
        if (numberTry == sequence.length) {
            numberTry = 0;
            setTimeout(addSequence, 600);
        }
    }
}

var generateNext = function () {
    return (Math.floor(Math.random()*4));
}

var clickEffect = function(colorItem) {
    Utils.addClass(document.getElementById('target' + colorItem), 'selected');
    setTimeout(function(){
        Utils.removeClass(document.getElementById('target' + colorItem), 'selected');
    },300);
}



return {
    // Public function
    init: init
};
})();