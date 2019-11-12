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

  window.main = {
    renderArray: function (arr) {
      var cloneElement = mapTemplate.cloneNode(true);
      cloneElement.style.left = arr.location.x - window.util.WIDTH_LABEL + 'px';
      cloneElement.style.top = arr.location.y - window.util.HAIGTH_LABEL + 'px';
      cloneElement.children[0].src = arr.author.avatar;
      cloneElement.children[0].alt = arr.offer.title;

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
      arr.offer.photos.map(function (j, i) {
        pools.insertAdjacentHTML('beforeend', '<img src="' + arr.offer.photos[i] + '" class="popup__photo" width="45" height="40" alt="Фотография жилья">');
      });

      cloneCardElement.querySelector('.popup__avatar').src = arr.author.avatar;


      return cloneCardElement;
    },

    renderError: function (errorMessage) {
      var cloneErrElement = errDataTemplate.cloneNode(true);
      cloneErrElement.querySelector('.error__message').textContent = errorMessage;
      return cloneErrElement;
    }
  };
})();
