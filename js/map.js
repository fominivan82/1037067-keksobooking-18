'use strict';

(function () {

  var TOTAL_SHOW_PIN = 5;
  var INITIAL_COORDINATES_TOP = 376;
  var INITIAL_COORDINATES_LEFT = 570;
  var blockMap = document.querySelectorAll('.map__filter');
  var blockForm = document.querySelectorAll('.ad-form__element');
  var mapElement = document.querySelector('.map__pins');
  var resetButton = document.querySelector('.ad-form__reset');

  var successHandler = function (arr) {
    addFragment(arr);
    delAllAttribute(blockMap);
    delAttribute('.map__features');
    window.pin.showAddress();
    window.filtr.getfilterMap();
    window.util.activMap.removeEventListener('mousedown', requestRepeated);
    window.util.activMap.removeEventListener('keydown', requestRepeatedEnter);
  };

  var errorHandler = function (errorMessage) {
    document.body.insertAdjacentElement('afterbegin', window.main.renderError(errorMessage));
    getError(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
    document.addEventListener('keydown', onErrLoadEscClose);
  };

  var successSaveHandler = function () {
    document.body.insertAdjacentElement('afterbegin', window.main.renderSuccess());
    window.main.removeOpenedCard();
    resetFiltrs();
    document.body.addEventListener('click', successSave);
    document.addEventListener('keydown', onPopupEscClose);
  };

  var errorSaveHandler = function (errorMessage) {
    window.util.adjElement.insertAdjacentElement('afterbegin', window.main.renderError(errorMessage));
    getError(window.map.successSaveHandler, window.map.errorSaveHandler, window.util.saveURL, window.util.saveMetod, window.formData);
    document.addEventListener('keydown', onErrPopupEscClose);
  };

  var addFragment = function (arr) {
    var fragment = document.createDocumentFragment();
    var ads = arr.slice(0, TOTAL_SHOW_PIN);
    ads.forEach(function (ad) {
      fragment.appendChild(window.main.renderArray(ad));
    });
    mapElement.appendChild(fragment);
  };

  var resetFiltrs = function () {
    window.filtr.filterMap.reset();
  };

  var delPins = function () {
    var mapPinButton = document.querySelectorAll('.map__pin[type="button"]');
    mapPinButton.forEach(function (pin) {
      pin.remove();
    });
  };

  var getError = function () {
    document.body.onmousedown = function () {
      var errorClass = document.querySelector('.error');
      if (errorClass) {
        errorClass.remove();
      }
      openMap();
      window.util.activMap.addEventListener('mousedown', requestRepeated);
      window.util.activMap.addEventListener('keydown', requestRepeatedEnter);
    };

    var errButton = document.querySelector('.error__button');
    errButton.onmousedown = function (evt) {
      evt.stopImmediatePropagation();
      document.querySelector('.error').remove();
    };
  };

  var resetForm = function () {
    window.util.setupForm.reset();
    window.util.activMap.style.left = INITIAL_COORDINATES_LEFT + 'px';
    window.util.activMap.style.top = INITIAL_COORDINATES_TOP + 'px';
    window.util.insertAttribute('#price', 'placeholder', '5000');
  };

  var resetPage = function () {
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    insertAllAttribute(blockMap);
    insertAllAttribute(blockForm);
    window.util.insertAttribute('.map__features', 'disabled', 'disabled');
    window.util.insertAttribute('.ad-form-header', 'disabled', 'disabled');
  };

  var successSave = function () {
    document.body.removeEventListener('click', successSave);
    document.querySelector('.success').remove();

    resetForm();
    window.pin.showAddress();
    delPins();
    resetPage();
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
      openMap();
      window.util.activMap.addEventListener('mousedown', requestRepeated);
      window.util.activMap.addEventListener('keydown', requestRepeatedEnter);
    }
  };

  var onErrPopupEscClose = function (evt) {
    if (evt.keyCode === window.util.ESC_KYECODE) {
      document.removeEventListener('keydown', onErrPopupEscClose);
      document.querySelector('.error').remove();
    }
  };

  var requestRepeated = function () {
    switch (true) {
      case (window.xhr.status === window.backend.SUCCESS):
        break;
      default:
        window.util.activMap.removeEventListener('mousedown', requestRepeated);
        window.util.activMap.removeEventListener('keydown', requestRepeatedEnter);
        window.backend.loadAndSave(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
    }
  };

  var requestRepeatedEnter = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE && window.util.activMap) {
      switch (true) {
        case (window.xhr.status === window.backend.SUCCESS):
          break;
        default:
          window.util.activMap.removeEventListener('mousedown', requestRepeated);
          window.util.activMap.removeEventListener('keydown', requestRepeatedEnter);
          window.backend.loadAndSave(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
      }
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
    delAllAttribute(blockForm);
    delAttribute('.ad-form-header');
  };

  insertAllAttribute(blockMap);
  insertAllAttribute(blockForm);
  window.util.insertAttribute('.map__features', 'disabled', 'disabled');
  window.util.insertAttribute('.ad-form-header', 'disabled', 'disabled');

  window.util.activMap.addEventListener('mousedown', function () {
    if (document.querySelector('.map--faded')) {
      window.backend.loadAndSave(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
      openMap();
    }
  });
  window.util.activMap.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE && document.querySelector('.map--faded')) {
      window.backend.loadAndSave(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
      openMap();
    }
  });

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetFiltrs();
    resetForm();
    window.main.removeOpenedCard();
    window.pin.showAddress();
    delPins();
    resetPage();
  });

  resetButton.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      evt.preventDefault();
      resetFiltrs();
      resetForm();
      window.main.removeOpenedCard();
      window.pin.showAddress();
      delPins();
      resetPage();
    }
  });

  var mapPins = document.querySelector('.map__pins');
  var mapCardElement = '<div class="map__cards"></div>';
  mapPins.insertAdjacentHTML('afterend', mapCardElement);

  window.map = {
    addFragment: addFragment,
    delPins: delPins,
    successHandler: successHandler,
    errorHandler: errorHandler,
    successSaveHandler: successSaveHandler,
    errorSaveHandler: errorSaveHandler,
    blockMap: blockMap,
    delAllAttribute: delAllAttribute,
    delAttribute: delAttribute
  };

})();
