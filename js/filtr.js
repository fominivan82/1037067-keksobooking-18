'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500; // ms
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
          return (arr.offer.price >= '10000') && (arr.offer.price <= '50000');
        });
        break;
      case (type === 'low'):
        offersPrice = array.filter(function (arr) {
          return (arr.offer.price <= '10000');
        });
        break;
      case (type === 'high'):
        offersPrice = array.filter(function (arr) {
          return (arr.offer.price >= '50000');
        });
        break;
      default:
        offersPrice = array.filter(function (arr) {
          return (arr.offer.price >= 0);
        });
    }
    return offersPrice;
  };
  var filterRoom = function (type, array) {
    var offersRoom;
    switch (true) {
      case (type === '1'):
        offersRoom = array.filter(function (arr) {
          return (arr.offer.rooms === 1);
        });
        break;
      case (type === '2'):
        offersRoom = array.filter(function (arr) {
          return (arr.offer.rooms === 2);
        });
        break;
      case (type === '3'):
        offersRoom = array.filter(function (arr) {
          return (arr.offer.rooms === 3);
        });
        break;
      default:
        offersRoom = array.filter(function (arr) {
          return (arr.offer.rooms >= 0);
        });
    }
    return offersRoom;
  };
  var filterGuests = function (type, array) {
    var offersGuests;
    switch (true) {
      case (type === '1'):
        offersGuests = array.filter(function (arr) {
          return (arr.offer.guests === 1);
        });
        break;
      case (type === '2'):
        offersGuests = array.filter(function (arr) {
          return (arr.offer.guests === 2);
        });
        break;
      case (type === '0'):
        offersGuests = array.filter(function (arr) {
          return (arr.offer.guests === 0);
        });
        break;
      default:
        offersGuests = array.filter(function (arr) {
          return (arr.offer.guests >= 0);
        });
    }
    return offersGuests;
  };

  var getfilterMap = function () {

    var offers = Array.from(window.xhr.response).map(function (array) {
      return array;
    });

    filterMap.onchange = debounce(function () {
      var targetHouse = document.querySelector('#housing-type');
      var targetPrice = document.querySelector('#housing-price');
      var targetRoom = document.querySelector('#housing-rooms');
      var targetGuests = document.querySelector('#housing-guests');
      var targetFeatures = document.querySelectorAll('.map__checkbox');
      var offersFeatures = Array.from(targetFeatures).map(function (array) {
        return array;
      });

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
          return checkFeaturesValue.indexOf(n) >= 0;
        });
        return filFeatur.length === checkFeatures.length;
      });

      window.map.delPins();
      window.main.removeOpenedCard();
      window.map.addFragment(filterOffers);
    });
  };

  window.filtr = {
    getfilterMap: getfilterMap,
  };
})();
