'use strict';

window.util = (function () {
  return {
    MIN_Y_MAP: 130,
    MAX_Y_MAP: 630,
    WIDTH_LABEL: 32,
    HAIGTH_LABEL: 87,

    maxXMap: document.querySelector('.map').offsetWidth,

    insertAttribute: function (classname, attribute, value) {
      document.querySelector(classname).setAttribute(attribute, value);
    }
  };
})();
