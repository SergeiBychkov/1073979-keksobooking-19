'use strict';

(function () {
  var types = ['flat', 'bungalo', 'house', 'palace'];
  var typeOfBuilding = {
    flat: {
      name: 'Квартира',
      price: '1000'
    },
    bungalo: {
      name: 'Бунгало',
      price: '0'
    },
    house: {
      name: 'Дом',
      price: '5000'
    },
    palace: {
      name: 'Дворец',
      price: '10000'
    }
  };

  var coordMainPin = {
    x: 570,
    y: 374
  };

  var mapLimit = {
    top: 130,
    right: 1200,
    bottom: 630,
    left: 0
  };

  window.database = {
    types: types,
    typeOfBuilding: typeOfBuilding,
    coordMainPin: coordMainPin,
    mapLimit: mapLimit
  };
})();
