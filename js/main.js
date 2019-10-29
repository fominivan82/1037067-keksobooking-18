'use strict';

var OBJECTS = 8;
var MIN_X_MAP = 0;
var MIN_Y_MAP = 130;
var MAX_Y_MAP = 630;
var WIDTH_LABEL = 32;
var HAIGTH_LABEL = 87;
var QUANT_PRICE = 1000;
var QUANT_ROOMS = 10;
var ENTER_KEYCODE = 13;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_TYPE_RUS = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var mapCardElement = document.querySelector('.map__filters-container');
var mapElement = document.querySelector('.map__pins');
var mapTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
var cardTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');
var indexObjects = Array.from(Array(OBJECTS).keys());
var generationArray = [];
var maxXMap = document.querySelector('.map').offsetWidth;
var description = 'строка с описанием';

var avatarLink = function (i) {
  var number = i++;
  var link = 'img/avatars/user0' + (number + 1) + '.png';
  return link;
};
var offerTitle = function (i) {
  var number = i++;
  var title = 'Постоялый двор №' + (number + 1);
  return title;
};

var quantity = function getRandom(quant) {
  return Math.floor(Math.random() * quant);
};
var map = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
var arrayRandom = function arrayRandElement(random) {
  var rand = Math.floor(Math.random() * random.length);
  return random[rand];
};
var randomOffer = function () {
  var x = Math.random();
  var result = (x > 0.5);
  return result;
};
var features = OFFER_FEATURES.filter(function () {
  randomOffer();
});
var photos = OFFER_PHOTOS.filter(function () {
  randomOffer();
});

indexObjects.forEach(function (j, i) {

  var x = map(MIN_X_MAP, maxXMap);
  var y = map(MIN_Y_MAP, MAX_Y_MAP);
  var u = x - WIDTH_LABEL + 'px';
  var z = y - HAIGTH_LABEL + 'px';

  generationArray[i] = {
    author: {
      avatar: avatarLink(i)
    },

    offer: {
      title: offerTitle(i),
      address: 'x, y',
      price: quantity(QUANT_PRICE),
      type: arrayRandom(OFFER_TYPE),
      rooms: quantity(QUANT_ROOMS),
      guests: quantity(QUANT_ROOMS),
      checkin: arrayRandom(OFFER_CHECKIN),
      checkout: arrayRandom(OFFER_CHECKOUT),
      features: features,
      description: description,
      photos: photos
    },

    location: {
      x: u,
      y: z
    }
  };
});

var renderArray = function (arr) {
  var cloneElement = mapTemplate.cloneNode(true);
  cloneElement.style.left = arr.location.x;
  cloneElement.style.top = arr.location.y;
  cloneElement.children[0].src = arr.author.avatar;
  cloneElement.children[0].alt = arr.offer.title;

  return cloneElement;
};

var renderCardArray = function (arr) {

  var cloneCardElement = cardTemplate.cloneNode(true);
  cloneCardElement.querySelector('.popup__title').textContent = arr.offer.title;
  cloneCardElement.querySelector('.popup__text--address').textContent = arr.offer.address;
  cloneCardElement.querySelector('.popup__text--price').textContent = arr.offer.price + '₽/ночь';

  var offerIndex = OFFER_TYPE.findIndex(function (offerName) {
    return offerName === arr.offer.type;
  });
  cloneCardElement.querySelector('.popup__type').textContent = OFFER_TYPE_RUS[offerIndex];
  cloneCardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
  cloneCardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + arr.offer.checkin + ', выезд до ' + arr.offer.guests + '.';

  var cloneFeature = function (j, comfort) {
    if (j === comfort) {
      cloneCardElement.querySelector('.popup__feature--' + comfort).textContent = comfort;
    }
  };
  arr.offer.features.map(function (j) {
    cloneFeature(j, 'wifi');
    cloneFeature(j, 'dishwasher');
    cloneFeature(j, 'parking');
    cloneFeature(j, 'washer');
    cloneFeature(j, 'elevator');
    cloneFeature(j, 'conditioner');
  });
  cloneCardElement.querySelector('.popup__description').textContent = arr.offer.description;

  var pools = cloneCardElement.querySelector('.popup__photos');
  var blocks = cloneCardElement.querySelector('.popup__photo');
  pools.removeChild(blocks);
  arr.offer.photos.map(function (j, i) {
    pools.insertAdjacentHTML('beforeend', '<img src="' + arr.offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
  });

  cloneCardElement.querySelector('.popup__avatar').src = arr.author.avatar;

  return cloneCardElement;
};

var fragment = document.createDocumentFragment();
var fragmentCard = document.createDocumentFragment();

generationArray.forEach(function (j, i) {
  fragment.appendChild(renderArray(generationArray[i]));
  fragmentCard.appendChild(renderCardArray(generationArray[i]));
});

mapCardElement.insertAdjacentHTML('beforeBegin', fragmentCard);
// mapElement.appendChild(fragmentCard);


var blockMap = document.querySelectorAll('.map__filter');
var blockForm = document.querySelectorAll('.ad-form__element');
var activMap = document.querySelector('.map__pin--main');

var insertAttribute = function (classname, attribute, value) {
  document.querySelector(classname).setAttribute(attribute, value);
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

var validationPriceType = function (target, price) {
  switch (true) {
    case (target === 'bungalo' && price < 0) || (target === 'bungalo' && price === ''):
      insertAttribute('#price', 'placeholder', '0');
      priceForm.setCustomValidity('Минимальная цена Бунгало 0');
      break;

    case target === 'flat' && price < 1000:
      insertAttribute('#price', 'placeholder', '1000');
      priceForm.setCustomValidity('Минимальная цена Квартиры 1000');
      break;

    case target === 'house' && price < 5000:
      insertAttribute('#price', 'placeholder', '5000');
      priceForm.setCustomValidity('Минимальная цена Дома 5000');
      break;

    case target === 'palace' && price < 10000:
      insertAttribute('#price', 'placeholder', '10000');
      priceForm.setCustomValidity('Минимальная цена Дворца 10000');
      break;

    default:
      priceForm.setCustomValidity('');
  }
};

var openMap = function () {
  mapElement.appendChild(fragment);
  document.querySelector('.map').classList.remove('map--faded');
  document.querySelector('.ad-form').classList.remove('ad-form--disabled');
  delAllAttribute(blockMap);
  delAllAttribute(blockForm);
  delAttribute('.map__features');
  delAttribute('.ad-form-header');
};
var address = function () {

  var getXY = getComputedStyle(activMap);
  var x = parseInt(getXY.left, 10) + WIDTH_LABEL;
  var y = parseInt(getXY.top, 10) + HAIGTH_LABEL;
  var addressWindow = document.querySelector('#address');

  if ((MIN_Y_MAP < y < MAX_Y_MAP) && (x < maxXMap)) {
    addressWindow.setAttribute('readonly', 'readonly');
    addressWindow.value = x + ', ' + y;
  }
};

insertAllAttribute(blockMap);
insertAllAttribute(blockForm);
insertAttribute('.map__features', 'disabled', 'disabled');
insertAttribute('.ad-form-header', 'disabled', 'disabled');

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

insertAttribute('#title', 'required');
insertAttribute('#price', 'required');
insertAttribute('#price', 'max', '1000000');

var titleForm = document.querySelector('#title');
var typeForm = document.querySelector('#type');
var priceForm = document.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var formSubmit = document.querySelector('.ad-form__submit');
var guestCapacity = document.querySelector('#capacity');

titleForm.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 30) {
    target.setCustomValidity('Имя должно состоять минимум из 30-ти символов');
  }
  if (target.value.length > 100) {
    target.setCustomValidity('Имя должно состоять максимум из 100 символов');
  }
  if (target.value.length > 30 && target.value.length < 100) {
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
