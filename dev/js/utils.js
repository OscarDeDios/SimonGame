//Some useful functions
var Utils = (function () {
    'use strict';

    var addClass = function(el, className) {
        if (el.classList)
          el.classList.add(className);
        else
          el.className += ' ' + className;
    }

    var removeClass = function(el, className) {
        if (el.classList)
          el.classList.remove(className);
        else
          el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    var fadeOut = function(el,callback) {
        el.style.opacity = 1;
        (function fade() {
            if ((el.style.opacity -= .1) < 0) {
                el.style.display = "none";
                if (callback) callback();
            } else {
                (window.requestAnimationFrame && requestAnimationFrame(fade)) || setTimeout(fade, 16);
            }
        })();
    }

    var fadeIn = function(el,callback) {
        el.style.opacity = 0;
        el.style.display = "block";
        (function fade() {
            var val = parseFloat(el.style.opacity);
            if (!((val += .1) > 1)) {
              el.style.opacity = val;
              (window.requestAnimationFrame && requestAnimationFrame(fade)) || setTimeout(fade, 16);
            }
        })();
    }
	return {
		addClass: addClass,
        removeClass: removeClass,
        fadeOut: fadeOut,
        fadeIn: fadeIn
	};
}());