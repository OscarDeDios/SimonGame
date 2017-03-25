//Some useful functions
var Utils = (function () {
    'use strict';

    var addClass = function(el, className) {
        if (el.length) {
            for (var i = 0; i < el.length; ++i) {
             if (el[i].classList)
               el[i].classList.add(className);
             else
               el[i].className += ' ' + className;            }
        } else {
            if (el.classList)
              el.classList.add(className);
            else
              el.className += ' ' + className;
        }
    }

    var removeClass = function(el, className) {
        if (el.length) {
            for (var i = 0; i < el.length; ++i) {
               if (el[i].classList)
                 el[i].classList.remove(className);
               else
                 el[i].className = el[i].className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            }
        } else {
            if (el.classList)
              el.classList.remove(className);
            else
              el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

	return {
		addClass: addClass,
        removeClass: removeClass
	};
}());