'use strict';

(function () {
  var titles = ['Уютное гнездышко для молодоженов', 'Маленькая квартирка рядом с парком', 'Императорский дворец в центре Токио', 'Милейший чердачок', 'Небольшая лавочка в парке', 'Наркоманский притон'];
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

  window.database = {
    titles: titles,
    types: types,
    typeOfBuilding: typeOfBuilding,
  };
})();
