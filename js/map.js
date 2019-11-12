'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var blockMap = document.querySelectorAll('.map__filter');
  var blockForm = document.querySelectorAll('.ad-form__element');
  var mapElement = document.querySelector('.map__pins');


  window.map = {
    successHandler: function (arr) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < 5; i++) {
        fragment.appendChild(window.main.renderArray(arr[i]));
      }
      mapElement.appendChild(fragment);

      openMap();
      window.address();
      var mapPinButton = document.querySelectorAll('.map__pin[type="button"]');
      showPopup(mapPinButton);
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

  var insertAllAttribute = function (classname) {
    classname.forEach(function (j, i) {
      classname[i].setAttribute('disabled', 'disabled');
    });
  };

  var delAttribute = function (classname) {
    document.querySelector(classname).removeAttribute('disabled');
  };

  var delAllAttribute = function (classname) {
    classname.forEach(function (j, i) {
      classname[i].removeAttribute('disabled');
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
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      if (document.querySelector('.map--faded')) {
        window.loadAndSave(window.map.successHandler, window.map.errorHandler, window.util.loadURL, window.util.loadMetod);
      }
    }
  });

  var mapPins = document.querySelector('.map__pins');
  var mapCardElement = '<div class="map__cards"></div>';
  mapPins.insertAdjacentHTML('afterend', mapCardElement);

  var compareValue = function (value) {
    if (value) {
      window.xhr.response.forEach(function (j, i) {
        var popupValue = window.xhr.response[i].offer.title;
        if (value === popupValue) {
          var fragmentCard = document.createDocumentFragment();
          fragmentCard.appendChild(window.main.renderCardArray(window.xhr.response[i]));
          document.querySelector('.map__cards').appendChild(fragmentCard);

          document.addEventListener('keydown', onPopupEscPress);

          var mapPinButtonClose = document.querySelector('.popup__close');
          mapPinButtonClose.addEventListener('mousedown', function () {
            document.querySelector('.map__card').remove();
          });

          mapPinButtonClose.addEventListener('keydown', function (evt) {
            if (evt.keyCode === window.util.ENTER_KEYCODE) {
              document.querySelector('.map__card').remove();
            }
          });
        }
      });
    }
  };
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      document.querySelector('.map__card').remove();
    }
  };
  var showPopup = function (arr) {

    arr.forEach(function (j, i) {
      arr[i].addEventListener('mousedown', function (evt) {
        var mapCard = document.querySelector('.map__card');
        if (mapCard) {
          mapCard.remove();
        }
        var imgValue = evt.target.alt;
        compareValue(imgValue);
        var afterValue = evt.target.childNodes[0].alt;
        compareValue(afterValue);
      });
      arr[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ENTER_KEYCODE) {
          var mapCard = document.querySelector('.map__card');
          if (mapCard) {
            mapCard.remove();
          }
          var imgValue = evt.target.alt;
          compareValue(imgValue);
          var afterValue = evt.target.childNodes[0].alt;
          compareValue(afterValue);
        }
      });

    });
  };
})();
