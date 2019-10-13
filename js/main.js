'use strict';

var OBJECTS = 8;
var MIN_X_MAP = 0;
var MIN_Y_MAP = 130;
var MAX_Y_MAP = 630;
var WIDTH_LABEL = 32;
var HAIGTH_LABEL = 87;
var QUANT_PRICE = 1000;
var QUANT_ROOMS = 10;
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
var features = OFFER_FEATURES.filter(function () {
  var x = Math.random();
  var result = (x > 0.5);
  return result;
});
var photos = OFFER_PHOTOS.filter(function () {
  var x = Math.random();
  var result = (x > 0.5);
  return result;
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

document.querySelector('.map').classList.remove('map--faded');

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
  var type = arr.offer.type;
  var index = 0;
  OFFER_TYPE.map(function (j, i) {
    if (j === type) {
      index = i;
    }
  });
  cloneCardElement.querySelector('.popup__type').textContent = OFFER_TYPE_RUS[index];
  cloneCardElement.querySelector('.popup__text--capacity').textContent = arr.offer.rooms + ' комнаты для ' + arr.offer.guests + ' гостей';
  cloneCardElement.querySelector('.popup__text--time').textContent = 'Заезд после' + arr.offer.checkin + ', выезд до ' + arr.offer.guests + '.';

  arr.offer.features.map(function (j) {
    if (j === 'wifi') {
      cloneCardElement.querySelector('.popup__feature--wifi').textContent = 'wifi';
    }
    if (j === 'dishwasher') {
      cloneCardElement.querySelector('.popup__feature--dishwasher').textContent = 'dishwasher';
    }
    if (j === 'parking') {
      cloneCardElement.querySelector('.popup__feature--parking').textContent = 'parking';
    }
    if (j === 'washer') {
      cloneCardElement.querySelector('.popup__feature--washer').textContent = 'washer';
    }
    if (j === 'elevator') {
      cloneCardElement.querySelector('.popup__feature--elevator').textContent = 'elevator';
    }
    if (j === 'conditioner') {
      cloneCardElement.querySelector('.popup__feature--dishwasher').textContent = 'conditioner';
    }
  });
  cloneCardElement.querySelector('.popup__description').textContent = arr.offer.description;
  cloneCardElement.querySelector('.popup__photos').src = arr.offer.photos;
  cloneCardElement.querySelector('.popup__avatar').src = arr.author.avatar;

  return cloneCardElement;
};

var fragment = document.createDocumentFragment();
var fragmentCard = document.createDocumentFragment();

generationArray.forEach(function (j, i) {
  var index = i;
  fragment.appendChild(renderArray(generationArray[index]));
  fragmentCard.appendChild(renderCardArray(generationArray[index]));
});
mapElement.appendChild(fragment);
mapCardElement.insertAdjacentHTML('beforeBegin', fragmentCard);
