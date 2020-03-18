'use strict';

(function () {
  var MAP_LIMIT = {
    top: 130 - window.constants.PIN_HEIGHT,
    right: 1200,
    bottom: 630 - window.constants.PIN_HEIGHT,
    left: 0
  };

  var TypeOfBuilding = {
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

  window.database = {
    TypeOfBuilding: TypeOfBuilding,
    MAP_LIMIT: MAP_LIMIT
  };
})();
