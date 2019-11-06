'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var blockMap = document.querySelectorAll('.map__filter');
  var blockForm = document.querySelectorAll('.ad-form__element');
  var activMap = document.querySelector('.map__pin--main');
  var mapElement = document.querySelector('.map__pins');

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
    mapElement.appendChild(window.main.fragment);
    document.querySelector('.map').classList.remove('map--faded');
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    delAllAttribute(blockMap);
    delAllAttribute(blockForm);
    delAttribute('.map__features');
    delAttribute('.ad-form-header');
  };
  var address = function () {

    var getXY = getComputedStyle(activMap);
    var x = parseInt(getXY.left, 10) + window.util.WIDTH_LABEL;
    var y = parseInt(getXY.top, 10) + window.util.HAIGTH_LABEL;
    var addressWindow = document.querySelector('#address');

    if ((window.util.MIN_Y_MAP < y < window.util.MAX_Y_MAP) && (x < window.util.maxXMap)) {
      addressWindow.setAttribute('readonly', 'readonly');
      addressWindow.value = x + ', ' + y;
    }
  };

  insertAllAttribute(blockMap);
  insertAllAttribute(blockForm);
  window.util.insertAttribute('.map__features', 'disabled', 'disabled');
  window.util.insertAttribute('.ad-form-header', 'disabled', 'disabled');

  activMap.addEventListener('mousedown', function () {
    openMap();
    address();
  });
  activMap.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openMap();
      address();
    }
  });

  var mapCard = document.querySelector('.map__pins');
  var mapCardElement = '<div class="map__cards"></div>';
  mapCard.insertAdjacentHTML('afterend', mapCardElement);
  document.querySelector('.map__cards').appendChild(window.main.fragmentCard);
  var popupHidden = document.querySelectorAll('.popup');

  var insertHidden = function () {
    popupHidden.forEach(function (j, i) {
      popupHidden[i].classList.add('hidden');
    });
  };
  insertHidden();

  var mapPinButtonClose = document.querySelectorAll('.popup__close');

  var compareValue = function (value) {
    if (value) {
      for (var j = 0; j <= popupHidden.length; j++) {
        var popupValue = popupHidden[j].children[2].textContent;
        if (value === popupValue) {
          popupHidden[j].classList.remove('hidden');
        }
      }
    }
  };
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      insertHidden();
    }
  };
  var showPopup = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].addEventListener('mousedown', function (evt) {
        insertHidden();
        var imgValue = evt.target.alt;
        compareValue(imgValue);
        var afterValue = evt.target.childNodes[0].alt;
        compareValue(afterValue);
      });
      arr[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          insertHidden();
          var imgValue = evt.target.alt;
          compareValue(imgValue);
          var afterValue = evt.target.childNodes[0].alt;
          compareValue(afterValue);
        }
      });
      document.addEventListener('keydown', onPopupEscPress);

      mapPinButtonClose[i].addEventListener('mousedown', function () {
        insertHidden();
      });

      mapPinButtonClose[i].addEventListener('keydown', function (evt) {
        if (evt.keyCode === ENTER_KEYCODE) {
          insertHidden();
        }
      });
    }
  };
  activMap.addEventListener('mousedown', function () {
    var mapPinButton = document.querySelectorAll('.map__pin[type="button"]');
    showPopup(mapPinButton);
  });

  activMap.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      var mapPinButton = document.querySelectorAll('.map__pin[type="button"]');
      showPopup(mapPinButton);
    }
  });
})();
