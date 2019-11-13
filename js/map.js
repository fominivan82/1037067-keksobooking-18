'use strict';

(function () {

  var TOTAL_SHOW_PIN = 5;
  var blockMap = document.querySelectorAll('.map__filter');
  var blockForm = document.querySelectorAll('.ad-form__element');
  var mapElement = document.querySelector('.map__pins');


  window.map = {
    successHandler: function (arr) {
      var fragment = document.createDocumentFragment();
      var ads = arr.slice(0, TOTAL_SHOW_PIN);
      ads.forEach(function (ad) {
        fragment.appendChild(window.main.renderArray(ad));
      });
      mapElement.appendChild(fragment);

      openMap();
      window.pin.address();
    },

    errorHandler: function (errorMessage) {
      document.body.insertAdjacentElement('afterbegin', window.main.renderError(errorMessage));

      var errButton = document.querySelector('.error__button');
      errButton.addEventListener('mousedown', function () {
        window.loadAndSave(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
        document.querySelector('.error').remove();
      });

      errButton.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ENTER_KEYCODE) {
          window.loadAndSave(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
          document.querySelector('.error').remove();
        }
      });
    }
  };

  var insertAllAttribute = function (elements) {
    elements.forEach(function (element) {
      element.setAttribute('disabled', 'disabled');
    });
  };

  var delAttribute = function (classname) {
    document.querySelector(classname).removeAttribute('disabled');
  };

  var delAllAttribute = function (classname) {
    classname.forEach(function (obj) {
      obj.removeAttribute('disabled');
    });
  };

  var openMap = function () {
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    delAllAttribute(blockMap);
    delAllAttribute(blockForm);
    delAttribute('.map__features');
    delAttribute('.ad-form-header');
  };

  insertAllAttribute(blockMap);
  insertAllAttribute(blockForm);
  window.util.insertAttribute('.map__features', 'disabled', 'disabled');
  window.util.insertAttribute('.ad-form-header', 'disabled', 'disabled');

  window.util.activMap.addEventListener('mousedown', function () {
    if (document.querySelector('.map--faded')) {
      window.loadAndSave(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
    }
  });
  window.util.activMap.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE && document.querySelector('.map--faded')) {
      window.loadAndSave(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
    }
  });

  var mapPins = document.querySelector('.map__pins');
  var mapCardElement = '<div class="map__cards"></div>';
  mapPins.insertAdjacentHTML('afterend', mapCardElement);

})();
