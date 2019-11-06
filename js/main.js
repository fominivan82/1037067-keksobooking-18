'use strict';

(function () {
  var OBJECTS = 8;
  var MIN_X_MAP = 0;
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

  var mapTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
  var indexObjects = Array.from(Array(OBJECTS).keys());
  var generationArray = [];
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

    var x = map(MIN_X_MAP, window.util.maxXMap);
    var y = map(window.util.MIN_Y_MAP, window.util.MAX_Y_MAP);
    var u = x - window.util.WIDTH_LABEL + 'px';
    var z = y - window.util.HAIGTH_LABEL + 'px';

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

  window.main = {
    fragment: document.createDocumentFragment(),
    fragmentCard: document.createDocumentFragment()
  };

  generationArray.forEach(function (j, i) {
    window.main.fragment.appendChild(renderArray(generationArray[i]));
    window.main.fragmentCard.appendChild(renderCardArray(generationArray[i]));
  });
})();
