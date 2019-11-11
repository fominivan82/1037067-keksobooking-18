'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var blockMap = document.querySelectorAll('.map__filter');
  var blockForm = document.querySelectorAll('.ad-form__element');


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
    window.main.successHandler(window.xhr.response);
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    delAllAttribute(blockMap);
    delAllAttribute(blockForm);
    delAttribute('.map__features');
    delAttribute('.ad-form-header');
    var mapPinButton = document.querySelectorAll('.map__pin[type="button"]');
    showPopup(mapPinButton);
  };

  insertAllAttribute(blockMap);
  insertAllAttribute(blockForm);
  window.util.insertAttribute('.map__features', 'disabled', 'disabled');
  window.util.insertAttribute('.ad-form-header', 'disabled', 'disabled');

  window.util.activMap.addEventListener('mousedown', function () {

    if (document.querySelector('.map--faded')) {
      openMap();
      window.address();

    }

  });
  window.util.activMap.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      if (document.querySelector('.map--faded')) {
        openMap();
        window.address();
      }
    }
  });

  var mapPins = document.querySelector('.map__pins');
  var mapCardElement = '<div class="map__cards"></div>';
  mapPins.insertAdjacentHTML('afterend', mapCardElement);


  window.xhr.addEventListener('load', function () {
    window.map = {
      popupHidden: document.querySelectorAll('.popup'),
      mapPinButtonClose: document.querySelectorAll('.popup__close')
    };
  });

  var insertHidden = function () {
    window.map.popupHidden.forEach(function (j, i) {
      window.map.popupHidden[i].classList.add('hidden');
    });
  };

  var compareValue = function (value) {
    if (value) {
      window.map.popupHidden.forEach(function (j, i) {
        var popupValue = window.map.popupHidden[i].children[2].textContent;
        if (value === popupValue) {
          window.map.popupHidden[i].classList.remove('hidden');
        }
      });
    }
  };
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      insertHidden();
    }
  };
  var showPopup = function (arr) {
    arr.forEach(function (j, i) {
      arr[i].addEventListener('mousedown', function (evt) {
        insertHidden();
        var imgValue = evt.target.alt;
        compareValue(imgValue);
        var afterValue = evt.target.childNodes[0].alt;
        compareValue(afterValue);
      });
      arr[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ENTER_KEYCODE) {
          insertHidden();
          var imgValue = evt.target.alt;
          compareValue(imgValue);
          var afterValue = evt.target.childNodes[0].alt;
          compareValue(afterValue);
        }
      });
      document.addEventListener('keydown', onPopupEscPress);

      window.map.mapPinButtonClose[i].addEventListener('mousedown', function () {
        insertHidden();
      });

      window.map.mapPinButtonClose[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ENTER_KEYCODE) {
          insertHidden();
        }
      });
    });
  };
})();
