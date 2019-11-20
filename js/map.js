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
    document.addEventListener('keydown', onErrLoadEscClose);
    getError();

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
    getError();
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

  var onOpen = function () {
    document.removeEventListener('mousedown', onOpen);
    document.removeEventListener('keydown', onErrPopupEscClose);
    document.removeEventListener('keydown', onErrLoadEscClose);

    var errorClass = document.querySelector('.error');
    if (errorClass) {
      errorClass.remove();
    }
    openMap();
  };

  var getError = function () {
    document.addEventListener('mousedown', onOpen);
    requestRepeatedAll();

    var errButton = document.querySelector('.error__button');
    errButton.addEventListener('mousedown', function (evt) {
      evt.stopImmediatePropagation();
      document.querySelector('.error').remove();
      document.removeEventListener('mousedown', onOpen);
      document.removeEventListener('keydown', onErrPopupEscClose);
      document.removeEventListener('keydown', onErrLoadEscClose);
    });
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

    window.util.activMap.addEventListener('mousedown', onActivMap);
    window.util.activMap.addEventListener('keydown', onActivMapEnter);
  };

  var successSave = function () {
    document.body.removeEventListener('click', successSave);
    document.removeEventListener('keydown', onPopupEscClose);
    document.querySelector('.success').remove();

    resetForm();
    window.pin.showAddress();
    delPins();
    resetPage();
  };

  var onPopupEscClose = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      document.removeEventListener('keydown', onPopupEscClose);
      document.body.removeEventListener('click', successSave);
      successSave();
    }
  };

  var onErrLoadEscClose = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      onOpen();
    }
  };

  var onErrPopupEscClose = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      document.removeEventListener('keydown', onErrPopupEscClose);
      document.querySelector('.error').remove();
    }
  };

  var requestRepeated = function () {
    window.util.activMap.removeEventListener('mousedown', requestRepeated);
    window.util.activMap.removeEventListener('keydown', requestRepeatedEnter);
    window.backend.loadAndSave(window.map.successHandler, errorHandler, window.util.loadURL, window.util.loadMetod);
  };

  var requestRepeatedEnter = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE && window.util.activMap) {
      window.util.activMap.removeEventListener('mousedown', requestRepeated);
      window.util.activMap.removeEventListener('keydown', requestRepeatedEnter);
      window.backend.loadAndSave(window.map.successHandler, errorHandler, window.util.loadURL, window.util.loadMetod);
    }
  };

  var requestRepeatedAll = function () {
    if (!(window.xhr.status === window.backend.SUCCESS)) {
      window.util.activMap.addEventListener('mousedown', requestRepeated);
      window.util.activMap.addEventListener('keydown', requestRepeatedEnter);
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

  var onActivMap = function () {
    if (document.querySelector('.map--faded')) {
      window.util.activMap.removeEventListener('mousedown', onActivMap);
      window.util.activMap.removeEventListener('keydown', onActivMapEnter);
      window.backend.loadAndSave(window.map.successHandler, errorHandler, window.util.loadURL, window.util.loadMetod);
      openMap();
    }
  };

  var onActivMapEnter = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE && document.querySelector('.map--faded')) {
      window.util.activMap.removeEventListener('mousedown', onActivMap);
      window.util.activMap.removeEventListener('keydown', onActivMapEnter);
      window.backend.loadAndSave(window.map.successHandler, errorHandler, window.util.loadURL, window.util.loadMetod);
      openMap();
    }
  };

  window.util.activMap.addEventListener('mousedown', onActivMap);
  window.util.activMap.addEventListener('keydown', onActivMapEnter);

  resetButton.addEventListener('click', function (evt) {
    evt.preventDefault();
    resetFiltrs();
    resetForm();
    window.main.removeOpenedCard();
    window.pin.showAddress();
    delPins();
    resetPage();
  });

  var mapPins = document.querySelector('.map__pins');
  var mapCardElement = '<div class="map__cards"></div>';
  mapPins.insertAdjacentHTML('afterend', mapCardElement);

  window.map = {
    addFragment: addFragment,
    delPins: delPins,
    successHandler: successHandler,
    successSaveHandler: successSaveHandler,
    errorSaveHandler: errorSaveHandler,
    blockMap: blockMap,
    delAllAttribute: delAllAttribute,
    delAttribute: delAttribute
  };

})();
