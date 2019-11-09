'use strict';

(function () {

  var titleForm = document.querySelector('#title');
  var typeForm = document.querySelector('#type');
  var priceForm = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var formSubmit = document.querySelector('.ad-form__submit');
  var guestCapacity = document.querySelector('#capacity');
  var MIN_PRICE_BUNGALO = 0;
  var MIN_PRICE_FLAT = 1000;
  var MIN_PRICE_HOUSE = 5000;
  var MIN_PRICE_PALACE = 10000;
  var MIN_SIMBOLS = 30;
  var MAX_SIMBOLS = 100;

  var validationPriceType = function (target, price) {
    switch (true) {
      case (target === 'bungalo' && price < MIN_PRICE_BUNGALO) || (target === 'bungalo' && price === ''):
        window.util.insertAttribute('#price', 'placeholder', MIN_PRICE_BUNGALO);
        priceForm.setCustomValidity('Минимальная цена Бунгало 0');
        break;

      case target === 'flat' && price < MIN_PRICE_FLAT:
        window.util.insertAttribute('#price', 'placeholder', MIN_PRICE_FLAT);
        priceForm.setCustomValidity('Минимальная цена Квартиры 1000');
        break;

      case target === 'house' && price < MIN_PRICE_HOUSE:
        window.util.insertAttribute('#price', 'placeholder', MIN_PRICE_HOUSE);
        priceForm.setCustomValidity('Минимальная цена Дома 5000');
        break;

      case target === 'palace' && price < MIN_PRICE_PALACE:
        window.util.insertAttribute('#price', 'placeholder', MIN_PRICE_PALACE);
        priceForm.setCustomValidity('Минимальная цена Дворца 10000');
        break;

      default:
        priceForm.setCustomValidity('');
    }
  };

  window.util.insertAttribute('#title', 'required');
  window.util.insertAttribute('#price', 'required');
  window.util.insertAttribute('#price', 'max', '1000000');

  titleForm.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_SIMBOLS) {
      target.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
    }
    if (target.value.length > MAX_SIMBOLS) {
      target.setCustomValidity('Имя должно состоять максимум из 100 символов');
    }
    if (target.value.length > MIN_SIMBOLS && target.value.length < MAX_SIMBOLS) {
      target.setCustomValidity('');
    }
  });

  typeForm.addEventListener('input', function (evt) {
    var price = document.querySelector('#price');
    var target = evt.target.value;
    validationPriceType(target, price.value);
  });

  priceForm.addEventListener('input', function (evt) {
    var price = evt.target.value;
    var target = document.querySelector('#type');
    validationPriceType(target.value, price);
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  var roomMap = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };

  var validateRoomAndGuests = function (room, guest) {
    return roomMap[room].includes(guest);
  };
  formSubmit.addEventListener('click', function () {
    var targetRooms = document.querySelector('#room_number');
    var targetCapacity = document.querySelector('#capacity');
    if (validateRoomAndGuests(targetRooms.value, targetCapacity.value)) {
      guestCapacity.setCustomValidity('');
    } else {
      guestCapacity.setCustomValidity('Введите правильное количество гостей');
    }
  });
})();
