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
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var mapElement = document.querySelector('.map__pins');
var mapTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');
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

indexObjects.forEach(function (j, i) {

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
  generationArray.push(generationArray[i]);
});
generationArray.pop();
document.querySelector('.map').classList.remove('map--faded');

var renderArray = function (arr) {
  var cloneElement = mapTemplate.cloneNode(true);
  cloneElement.style.left = arr.location.x;
  cloneElement.style.top = arr.location.y;
  cloneElement.children[0].src = arr.author.avatar;
  cloneElement.children[0].alt = arr.offer.title;

  return cloneElement;
};

var fragment = document.createDocumentFragment();
generationArray.forEach(function (j, i) {
  var index = i;
  fragment.appendChild(renderArray(generationArray[index]));
});
mapElement.appendChild(fragment);
