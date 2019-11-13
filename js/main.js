'use strict';

(function () {

  var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
  var OFFER_TYPE_RUS = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];

  var mapTemplate = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card')
      .content
      .querySelector('.map__card');
  var errDataTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');
  var SuccDataTemplate = document.querySelector('#success')
      .content
      .querySelector('.success');

  var removeOpenedCard = function () {
    var mapCard = document.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var openCard = function (adData) {
    var fragmentCard = document.createDocumentFragment();
    fragmentCard.appendChild(window.main.renderCardArray(adData));
    document.querySelector('.map__cards').appendChild(fragmentCard);

    document.addEventListener('keydown', onPopupEscPress);

    var mapPinButtonClose = document.querySelector('.popup__close');
    mapPinButtonClose.addEventListener('mousedown', function () {
      removeOpenedCard();
    });

    mapPinButtonClose.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        removeOpenedCard();
      }
    });
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.ESC_KYECODE) {
      document.removeEventListener('keydown', onPopupEscPress);
      removeOpenedCard();
    }
  };

  window.main = {
    renderArray: function (adData) {
      var cloneElement = mapTemplate.cloneNode(true);
      cloneElement.style.left = adData.location.x - window.util.WIDTH_LABEL + 'px';
      cloneElement.style.top = adData.location.y - window.util.HAIGTH_LABEL + 'px';
      cloneElement.children[0].src = adData.author.avatar;
      cloneElement.children[0].alt = adData.offer.title;

      cloneElement.addEventListener('mousedown', function () {
        removeOpenedCard();
        openCard(adData);
      });

      cloneElement.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.ENTER_KEYCODE) {
          removeOpenedCard();
          openCard(adData);
        }
      });

      return cloneElement;
    },

    renderCardArray: function (arr) {

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

      var features = ['dishwasher', 'washer', 'elevator', 'conditioner', 'parking', 'wifi'];
      var featuresToDelete = features.filter(function (featureType) {
        return !arr.offer.features.includes(featureType);
      });

      featuresToDelete.forEach(function (feature) {
        var comfortElement = cloneCardElement.querySelector('.popup__feature--' + feature);
        comfortElement.remove();
      });

      cloneCardElement.querySelector('.popup__description').textContent = arr.offer.description;

      var pools = cloneCardElement.querySelector('.popup__photos');
      var blocks = cloneCardElement.querySelector('.popup__photo');
      pools.removeChild(blocks);
      arr.offer.photos.map(function (photoSrc) {
        pools.insertAdjacentHTML('beforeend', '<img src="' + photoSrc + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
      });

      cloneCardElement.querySelector('.popup__avatar').src = arr.author.avatar;


      return cloneCardElement;
    },

    renderError: function (errorMessage) {
      var cloneErrElement = errDataTemplate.cloneNode(true);
      cloneErrElement.querySelector('.error__message').textContent = errorMessage;
      return cloneErrElement;
    },

    renderSuccess: function () {
      var cloneSuccElement = SuccDataTemplate.cloneNode(true);
      return cloneSuccElement;
    }
  };
})();
