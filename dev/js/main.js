var Main = (function () {
'use strict';

var sequence = [];
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
    var numberElements = 0;
    document.querySelector('.color-targets').removeEventListener('click', clickColor);
    document.querySelector('.color-targets').addEventListener('click', clickColor);



}

var clickColor = function (evt) {
    var item = evt.target.dataset.item;
    clickEffect(item);
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