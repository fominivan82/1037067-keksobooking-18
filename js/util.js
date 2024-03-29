'use strict';

window.util = (function () {
  return {
    MIN_Y_MAP: 130,
    MAX_Y_MAP: 630,
    MIN_X_MAP: 0,
    WIDTH_LABEL: 32,
    HAIGTH_LABEL: 87,
    ENTER_KEYCODE: 13,
    ESC_KYECODE: 27,
    MIN_PRICE_BUNGALO: 0,
    MIN_PRICE_FLAT: 1000,
    MIN_PRICE_HOUSE: 5000,
    MIN_PRICE_PALACE: 10000,

    MAX_X_MAP: document.querySelector('.map').offsetWidth,
    activMap: document.querySelector('.map__pin--main'),
    loadURL: 'https://js.dump.academy/keksobooking/data',
    loadMetod: 'GET',
    saveURL: 'https://js.dump.academy/keksobooking',
    saveMetod: 'POST',
    setupForm: document.querySelector('.ad-form'),
    adjElement: document.querySelector('main'),

    insertAttribute: function (classname, attribute, value) {
      document.querySelector(classname).setAttribute(attribute, value);
    }
  };
})();
