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
    var checkType = function (dataItem) {
      return housingFilters.type.value === 'any' ? true : dataItem.offer.type === housingFilters.type.value;
    };

    var checkPrice = function (dataItem) {
      if (housingFilters.price.value === 'any') {
        return true;
      } else if (housingFilters.price.value === 'low') {
        return dataItem.offer.price < 10000;
      } else if (housingFilters.price.value === 'high') {
        return dataItem.offer.price > 50000;
      } else {
        return dataItem.offer.price >= 10000 && dataItem.offer.price <= 50000;
      }
    };

    var checkRooms = function (dataItem) {
      return housingFilters.rooms.value === 'any' ? true : dataItem.offer.rooms === Number(housingFilters.rooms.value);
    };

    var checkGuests = function (dataItem) {
      return housingFilters.guest.value === 'any' ? true : dataItem.offer.guests === Number(housingFilters.guest.value);
    };

    newArray = window.data.filter(checkType).filter(checkPrice).filter(checkRooms).filter(checkGuests);

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
