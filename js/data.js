'use strict';

(function () {
  var ADS_NUMBER = 8;
  var ENTER_KEY = 'Enter';
  var ESC = 'Escape';
  var LMB = 1;

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
  var numberPhoto = 0;
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapPinWidth = mapPinMain.offsetWidth;
  var mapPinHeight = mapPinMain.offsetHeight;
  var ads = [];

  var getRandomIntInclusive = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var creationOfParameters = function () {
    ads.push({
      author: {
        avatar: 'img/avatars/user0' + (numberPhoto += 1) + '.png'
      },
      offer: {
        title: titles[getRandomIntInclusive(0, titles.length)],
        adress: '600, 350',
        price: 42000,
        type: types[getRandomIntInclusive(0, types.length)],
        rooms: 3,
        guests: 2,
        checkin: '12:00',
        checkout: '13:00',
        features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
        description: 'Великолепная лавочка прямо в центре парка. Подходит для всех кто любит спать на свежем воздухе.',
        photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
      },
      location: {
        x: (getRandomIntInclusive(0, 1200)) - mapPinWidth / 2,
        y: (getRandomIntInclusive(130, 630)) - mapPinHeight
      }
    });
  };

  for (var index = 0; index < ADS_NUMBER; index++) {
    creationOfParameters();
  }

  window.data = {
    ENTER_KEY: ENTER_KEY,
    ESC: ESC,
    LMB: LMB,
    typeOfBuilding: typeOfBuilding,
    ads: ads
  };
})();
