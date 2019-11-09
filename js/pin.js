'use strict';

(function () {
  var address = function () {
    var RADIX = 10;
    var getXY = getComputedStyle(window.util.activMap);
    var x = parseInt(getXY.left, RADIX) + window.util.WIDTH_LABEL;
    var y = parseInt(getXY.top, RADIX) + window.util.HAIGTH_LABEL;
    var addressWindow = document.querySelector('#address');

    if ((window.util.MIN_Y_MAP < y < window.util.MAX_Y_MAP) && (x <= window.util.MAX_X_MAP)) {
      addressWindow.setAttribute('readonly', 'readonly');
      addressWindow.value = x + ', ' + y;
    }
  };

  window.util.activMap.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var styleTop = (window.util.activMap.offsetTop - shift.y);
      var styleLeft = (window.util.activMap.offsetLeft - shift.x);

      var limitCoords = function (x, y) {
        var positionX = x;
        if (x < window.util.MIN_X_MAP - window.util.WIDTH_LABEL) {
          positionX = window.util.MIN_X_MAP - window.util.WIDTH_LABEL;
        }
        if (x > window.util.MAX_X_MAP - window.util.WIDTH_LABEL) {
          positionX = window.util.MAX_X_MAP - window.util.WIDTH_LABEL;
        }

        var positionY = y;
        if (y < window.util.MIN_Y_MAP) {
          positionY = window.util.MIN_Y_MAP;
        }
        if (y > window.util.MAX_Y_MAP) {
          positionY = window.util.MAX_Y_MAP;
        }

        window.util.activMap.style.top = positionY + 'px';
        window.util.activMap.style.left = positionX + 'px';

      };

      limitCoords(styleLeft, styleTop);
      address();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
