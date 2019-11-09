'use strict';

(function () {

  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var blockMap = document.querySelectorAll('.map__filter');
  var blockForm = document.querySelectorAll('.ad-form__element');
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

  insertAllAttribute(blockMap);
  insertAllAttribute(blockForm);
  window.util.insertAttribute('.map__features', 'disabled', 'disabled');
  window.util.insertAttribute('.ad-form-header', 'disabled', 'disabled');

  window.util.activMap.addEventListener('mousedown', function () {
    openMap();
  });
  window.util.activMap.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openMap();
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
      popupHidden.forEach(function (j, i) {
        var popupValue = popupHidden[i].children[2].textContent;
        if (value === popupValue) {
          popupHidden[i].classList.remove('hidden');
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
    });
  };
  window.util.activMap.addEventListener('mousedown', function () {
    var mapPinButton = document.querySelectorAll('.map__pin[type="button"]');
    showPopup(mapPinButton);
  });

  window.util.activMap.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      var mapPinButton = document.querySelectorAll('.map__pin[type="button"]');
      showPopup(mapPinButton);
    }
  });
})();
