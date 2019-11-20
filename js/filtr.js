'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
  var HIGH_PRICE = 50000;
  var FIRST = '1';
  var SECOND = '2';
  var THIRD = '3';
  var ZEROTH = '0';
  var ONE = 1;
  var TWO = 2;
  var THREE = 3;
  var ZERO = 0;
  var filterMap = document.querySelector('.map__filters');
  var houseMap = {
    'any': ['palace', 'flat', 'house', 'bungalo'],
    'palace': ['palace'],
    'flat': ['flat'],
    'house': ['house'],
    'bungalo': ['bungalo']
  };


  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var filterHouse = function (type, sign) {
    return houseMap[type].includes(sign);
  };

  var filterPrice = function (type, array) {
    var offersPrice;
    switch (true) {
      case (type === 'middle'):
        offersPrice = array.filter(function (arr) {
          return (arr.offer.price >= window.util.MIN_PRICE_PALACE) && (arr.offer.price <= HIGH_PRICE);
        });
        break;
      case (type === 'low'):
        offersPrice = array.filter(function (arr) {
          return (arr.offer.price <= window.util.MIN_PRICE_PALACE);
        });
        break;
      case (type === 'high'):
        offersPrice = array.filter(function (arr) {
          return (arr.offer.price >= HIGH_PRICE);
        });
        break;
      default:
        offersPrice = array.filter(function (arr) {
          return (arr.offer.price >= window.util.MIN_PRICE_BUNGALO);
        });
    }
    return offersPrice;
  };

  var filterRoom = function (type, array) {
    var offersRoom;
    switch (true) {
      case (type === FIRST):
        offersRoom = array.filter(function (arr) {
          return (arr.offer.rooms === ONE);
        });
        break;
      case (type === SECOND):
        offersRoom = array.filter(function (arr) {
          return (arr.offer.rooms === TWO);
        });
        break;
      case (type === THIRD):
        offersRoom = array.filter(function (arr) {
          return (arr.offer.rooms === THREE);
        });
        break;
      default:
        offersRoom = array.filter(function (arr) {
          return (arr.offer.rooms >= ZERO);
        });
    }
    return offersRoom;
  };
  var filterGuests = function (type, array) {
    var offersGuests;
    switch (true) {
      case (type === FIRST):
        offersGuests = array.filter(function (arr) {
          return (arr.offer.guests === ONE);
        });
        break;
      case (type === SECOND):
        offersGuests = array.filter(function (arr) {
          return (arr.offer.guests === TWO);
        });
        break;
      case (type === ZEROTH):
        offersGuests = array.filter(function (arr) {
          return (arr.offer.guests === ZERO);
        });
        break;
      default:
        offersGuests = array.filter(function (arr) {
          return (arr.offer.guests >= ZERO);
        });
    }
    return offersGuests;
  };

  var getfilterMap = function () {

    var offers = Array.from(window.xhr.response);

    filterMap.addEventListener('change', debounce(function () {
      var targetHouse = document.querySelector('#housing-type');
      var targetPrice = document.querySelector('#housing-price');
      var targetRoom = document.querySelector('#housing-rooms');
      var targetGuests = document.querySelector('#housing-guests');
      var targetFeatures = document.querySelectorAll('.map__checkbox');
      var offersFeatures = Array.from(targetFeatures);

      var checkFeatures = offersFeatures.filter(function (arr) {
        return arr.checked;
      });

      var checkFeaturesValue = checkFeatures.map(function (arr) {
        return arr.value;
      });

      var filterOffers = offers.filter(function (arr) {
        return filterHouse(targetHouse.value, arr.offer.type);
      });

      filterOffers = filterPrice(targetPrice.value, filterOffers);
      filterOffers = filterRoom(targetRoom.value, filterOffers);
      filterOffers = filterGuests(targetGuests.value, filterOffers);

      filterOffers = filterOffers.filter(function (featureTypei) {
        var filFeatur = featureTypei.offer.features.filter(function (n) {
          return checkFeaturesValue.indexOf(n) >= ZERO;
        });
        return filFeatur.length === checkFeatures.length;
      });

      window.map.delPins();
      window.main.removeOpenedCard();
      window.map.addFragment(filterOffers);
    }));
  };

  window.filtr = {
    getfilterMap: getfilterMap,
    filterMap: filterMap
  };
})();
