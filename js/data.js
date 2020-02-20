'use strict';

(function () {
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
        title: window.database.titles[getRandomIntInclusive(0, window.database.titles.length)],
        adress: '600, 350',
        price: 42000,
        type: window.database.types[getRandomIntInclusive(0, window.database.types.length)],
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

  for (var index = 0; index < window.constants.ADS_NUMBER; index++) {
    creationOfParameters();
  }

  window.data = {
    ads: ads
  };
})();
