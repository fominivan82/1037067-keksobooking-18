'use strict';

(function () {
  var address = function () {

    var getXY = getComputedStyle(window.util.activMap);
    var x = parseInt(getXY.left, 10) + window.util.WIDTH_LABEL;
    var y = parseInt(getXY.top, 10) + window.util.HAIGTH_LABEL;
    var addressWindow = document.querySelector('#address');

    if ((window.util.MIN_Y_MAP < y < window.util.MAX_Y_MAP) && (x <= window.util.maxXMap)) {
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
        switch (true) {
          case (x < window.util.MIN_X_MAP - window.util.WIDTH_LABEL):
            window.util.activMap.style.left = (window.util.MIN_X_MAP - window.util.WIDTH_LABEL) + 'px';
            window.util.activMap.style.top = styleTop + 'px';
            break;

          case (x > window.util.maxXMap - window.util.WIDTH_LABEL):
            window.util.activMap.style.left = (window.util.maxXMap - window.util.WIDTH_LABEL) + 'px';
            window.util.activMap.style.top = styleTop + 'px';
            break;

          case (y < window.util.MIN_Y_MAP):
            window.util.activMap.style.left = window.util.MIN_Y_MAP + 'px';
            window.util.activMap.style.left = styleLeft + 'px';
            break;

          case (y > window.util.MAX_Y_MAP):
            window.util.activMap.style.left = window.util.MIN_Y_MAP + 'px';
            window.util.activMap.style.left = styleLeft + 'px';
            break;

          default:
            window.util.activMap.style.top = styleTop + 'px';
            window.util.activMap.style.left = styleLeft + 'px';
        }
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
