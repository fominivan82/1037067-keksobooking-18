'use strict';

window.util = (function () {
  return {
    MIN_Y_MAP: 130,
    MAX_Y_MAP: 630,
    MIN_X_MAP: 0,
    WIDTH_LABEL: 32,
    HAIGTH_LABEL: 87,
    ENTER_KEYCODE: 13,

    MAX_X_MAP: document.querySelector('.map').offsetWidth,
    activMap: document.querySelector('.map__pin--main'),

    insertAttribute: function (classname, attribute, value) {
      document.querySelector(classname).setAttribute(attribute, value);
    }
  };
})();
