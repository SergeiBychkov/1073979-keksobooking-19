'use strict';
(function () {
  var quantityOfPins = 5;
  var mapPins = document.querySelector('.map__pins');
  var filters = document.querySelector('.map__filters');
  var housingFilters = {
    type: filters.querySelector('#housing-type'),
    price: filters.querySelector('#housing-price'),
    rooms: filters.querySelector('#housing-rooms'),
    guest: filters.querySelector('#housing-guests')
  };
  var filteredOffers = [];

  var onDataCheck = function () {
    var originalData = window.data;
    if (housingFilters.type.value === 'any') {
      originalData = originalData.slice(0, quantityOfPins);
      originalData.forEach(function (currentValue) {
        window.map.fragmentPin.appendChild(window.pin.renderPin(currentValue));
      });
      mapPins.appendChild(window.map.fragmentPin);
    } else {
      filteredOffers = window.data.filter(function (dataItem) {
        return dataItem.offer.type === housingFilters.type.value;
      }).slice(0, quantityOfPins);
    }
    filteredOffers.forEach(function (currentValue) {
      window.map.fragmentPin.appendChild(window.pin.renderPin(currentValue));
    });
    mapPins.appendChild(window.map.fragmentPin);
  };

  housingFilters.type.addEventListener('change', function () {
    window.map.removePins();
    window.map.removePopup();
    onDataCheck();
  });
})();
