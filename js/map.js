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

      getError(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
      document.addEventListener('keydown', onErrLoadEscClose);
    },

    successSaveHandler: function () {
      document.body.insertAdjacentElement('afterbegin', window.main.renderSuccess());

      document.body.addEventListener('click', function () {
        successSave();
      });

      document.addEventListener('keydown', onPopupEscClose);
    },

    errorSaveHandler: function (errorMessage) {
      window.util.adjElement.insertAdjacentElement('afterbegin', window.main.renderError(errorMessage));
      getError(window.map.successSaveHandler, window.map.errorSaveHandler, window.util.saveURL, window.util.saveMetod, window.formData);
      document.addEventListener('keydown', onErrPopupEscClose);
    },
  };

  var getError = function (onSuccess, onError, URL, metod, data) {
    document.body.onmousedown = function () {
      document.querySelector('.error').remove();
      window.backend.loadAndSave(onSuccess, onError, URL, metod, data);
    };

    var errButton = document.querySelector('.error__button');
    errButton.onmousedown = function () {
      document.querySelector('.error').remove();
      window.backend.loadAndSave(onSuccess, onError, URL, metod, data);
    };
  };

  var successSave = function () {
    document.querySelector('.success').remove();

    window.util.setupForm.reset();
    window.util.activMap.style.left = 570 + 'px';
    window.util.activMap.style.top = 376 + 'px';
    window.pin.address();
    window.util.insertAttribute('#price', 'placeholder', '5000');
    var mapPinButton = document.querySelectorAll('.map__pin[type="button"]');
    mapPinButton.forEach(function (pin) {
      pin.remove();
    });
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    insertAllAttribute(blockMap);
    insertAllAttribute(blockForm);
    window.util.insertAttribute('.map__features', 'disabled', 'disabled');
    window.util.insertAttribute('.ad-form-header', 'disabled', 'disabled');
  };

  var onPopupEscClose = function (evt) {
    if (evt.keyCode === window.util.ESC_KYECODE) {
      document.removeEventListener('keydown', onPopupEscClose);
      successSave();
    }
  };

  var onErrLoadEscClose = function (evt) {
    if (evt.keyCode === window.util.ESC_KYECODE) {
      document.removeEventListener('keydown', onErrLoadEscClose);
      document.querySelector('.error').remove();
      window.backend.loadAndSave(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
    }
  };

  var onErrPopupEscClose = function (evt) {
    if (evt.keyCode === window.util.ESC_KYECODE) {
      document.removeEventListener('keydown', onErrPopupEscClose);
      document.querySelector('.error').remove();
      window.backend.loadAndSave(window.map.successSaveHandler, window.map.errorSaveHandler, window.util.saveURL, window.util.saveMetod, window.formData);
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
      window.backend.loadAndSave(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
    }
  });
  window.util.activMap.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE && document.querySelector('.map--faded')) {
      window.backend.loadAndSave(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
    }
  });

  var mapPins = document.querySelector('.map__pins');
  var mapCardElement = '<div class="map__cards"></div>';
  mapPins.insertAdjacentHTML('afterend', mapCardElement);

})();
