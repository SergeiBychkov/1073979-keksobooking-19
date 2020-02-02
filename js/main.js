'use strict';

var ADS_NUMBER = 8;
var titles = ['Уютное гнездышко для молодоженов', 'Маленькая квартирка рядом с парком', 'Императорский дворец в центре Токио', 'Милейший чердачок', 'Небольшая лавочка в парке', 'Наркоманский притон'];
var typeOfBuilding = ['place', 'flat', 'house', 'bungalo'];
var ads = [];
var similarAddPinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');
var pinsList = document.querySelector('.map__pins');
var numberPhoto = 0;
var mapPinMain = document.querySelector('.map__pin--main');
var mapPinWidth = mapPinMain.offsetWidth;
var mapPinHeight = mapPinMain.offsetHeight;

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
      type: typeOfBuilding[getRandomIntInclusive(0, typeOfBuilding.length)],
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

document.querySelector('.map').classList.remove('map--faded');

var renderPin = function (parameter) {
  var pinCreate = similarAddPinTemplate.cloneNode(true);

  pinCreate.style = 'left:' + parameter.location.x + 'px; top:' + parameter.location.y + 'px;';
  pinCreate.querySelector('img').setAttribute('src', parameter.author.avatar);
  pinCreate.querySelector('img').setAttribute('alt', parameter.offer.title);
  return pinCreate;
};

var fragment = document.createDocumentFragment();

ads.forEach(function callback(currentValue) {
  fragment.appendChild(renderPin(currentValue));
});

pinsList.appendChild(fragment);
