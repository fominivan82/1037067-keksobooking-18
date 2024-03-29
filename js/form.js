'use strict';

(function () {

  var titleForm = document.querySelector('#title');
  var typeForm = document.querySelector('#type');
  var priceForm = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var guestCapacity = document.querySelector('#capacity');
  var formSubmit = document.querySelector('.ad-form__submit');
  var MIN_SIMBOLS = 30;
  var MAX_SIMBOLS = 100;

  var validationPriceType = function (target, price) {
    switch (true) {
      case (target === 'bungalo' && price < window.util.MIN_PRICE_BUNGALO) || (target === 'bungalo' && price === ''):
        window.util.insertAttribute('#price', 'placeholder', window.util.MIN_PRICE_BUNGALO);
        priceForm.setCustomValidity('Минимальная цена Бунгало 0');
        break;

      case target === 'flat' && price < window.util.MIN_PRICE_FLAT:
        window.util.insertAttribute('#price', 'placeholder', window.util.MIN_PRICE_FLAT);
        priceForm.setCustomValidity('Минимальная цена Квартиры 1000');
        break;

      case target === 'house' && price < window.util.MIN_PRICE_HOUSE:
        window.util.insertAttribute('#price', 'placeholder', window.util.MIN_PRICE_HOUSE);
        priceForm.setCustomValidity('Минимальная цена Дома 5000');
        break;

      case target === 'palace' && price < window.util.MIN_PRICE_PALACE:
        window.util.insertAttribute('#price', 'placeholder', window.util.MIN_PRICE_PALACE);
        priceForm.setCustomValidity('Минимальная цена Дворца 10000');
        break;

      default:
        priceForm.setCustomValidity('');
    }
  };

  window.util.insertAttribute('#title', 'required', '');
  window.util.insertAttribute('#price', 'required', '');
  window.util.insertAttribute('#price', 'max', '1000000');

  titleForm.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < MIN_SIMBOLS) {
      target.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
    }
    if (target.value.length > MAX_SIMBOLS) {
      target.setCustomValidity('Имя должно состоять максимум из 100 символов');
    }
    if (target.value.length >= MIN_SIMBOLS && target.value.length <= MAX_SIMBOLS) {
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
    return window.form.roomMap[room].includes(guest);
  };

  var validateAllRoomAndGuests = function () {

    if (validateRoomAndGuests(roomNumber.value, guestCapacity.value)) {
      guestCapacity.setCustomValidity('');
    } else {
      guestCapacity.setCustomValidity('Введите правильное количество гостей');
    }
  };

  guestCapacity.addEventListener('change', function () {
    validateAllRoomAndGuests();
  });

  roomNumber.addEventListener('change', function () {
    validateAllRoomAndGuests();
  });

  formSubmit.addEventListener('click', function () {
    validateAllRoomAndGuests();
  });

  window.util.setupForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.formData = new FormData(window.util.setupForm);
    window.backend.loadAndSave(window.map.successSaveHandler, window.map.errorSaveHandler, window.util.saveURL, window.util.saveMetod, window.formData);
  });

  window.form = {
    roomMap: roomMap,
  };
})();
