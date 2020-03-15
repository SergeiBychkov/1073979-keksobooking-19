'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var quantityOfPins = 5;
  var lastTimeout = null;
  var newArray = [];
  var mapPins = document.querySelector('.map__pins');
  var filters = document.querySelector('.map__filters');
  var housingFilters = {
    type: filters.querySelector('#housing-type'),
    price: filters.querySelector('#housing-price'),
    rooms: filters.querySelector('#housing-rooms'),
    guest: filters.querySelector('#housing-guests')
  };

  var checkFilters = function () {

    var checkType = function (data) {
      return housingFilters.type.value === 'any' ? true : data.offer.type === housingFilters.type.value;
    };

    var checkPrice = function (data) {
      if (housingFilters.price.value === 'any') {
        return true;
      } else if (housingFilters.price.value === 'low') {
        return data.offer.price < 10000;
      } else if (housingFilters.price.value === 'high') {
        return data.offer.price > 50000;
      } else {
        return data.offer.price >= 10000 && data.offer.price <= 50000;
      }
    };

    var checkRooms = function (data) {
      return housingFilters.rooms.value === 'any' ? true : data.offer.rooms === Number(housingFilters.rooms.value);
    };

    var checkGuests = function (data) {
      return housingFilters.guest.value === 'any' ? true : data.offer.guests === Number(housingFilters.guest.value);
    };

    var checkFeatures = function (data) {
      var checkedFeaturesBtns = filters.querySelectorAll('input[type=checkbox]:checked');
      var checkedFeaturesArray = Array.from(checkedFeaturesBtns);
      return checkedFeaturesArray.every(function (featureValue) {
        return data.offer.features.includes(featureValue.value);
      });
    };

    newArray = window.data.filter(checkType).filter(checkPrice).filter(checkRooms).filter(checkGuests).filter(checkFeatures);

    var slicedArray = newArray.slice(0, quantityOfPins);

    slicedArray.forEach(function (currentValue) {
      window.map.fragmentPin.appendChild(window.pin.renderPin(currentValue));
      mapPins.appendChild(window.map.fragmentPin);
    });
  };

  filters.addEventListener('change', function () {
    if (lastTimeout) {
      window.clearTimeout(typeof lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      window.map.removePins();
      window.map.removePopup();
      checkFilters();
    }, DEBOUNCE_INTERVAL);
  });
})();
