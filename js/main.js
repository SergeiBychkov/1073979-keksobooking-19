'use strict';

var ADS_NUMBER = 8;
var ENTER_KEY = 'Enter';
var LMB = 1;

var titles = ['Уютное гнездышко для молодоженов', 'Маленькая квартирка рядом с парком', 'Императорский дворец в центре Токио', 'Милейший чердачок', 'Небольшая лавочка в парке', 'Наркоманский притон'];
var types = ['flat', 'bungalo', 'house', 'palace'];
// отрисовка карточки var typeOfBuilding = {
//   flat: 'Квартира',
//   bungalo: 'Бунгало',
//   house: 'Дом',
//   palace: 'Дворец'
// };
var ads = [];
var similarAddPinTemplate = document.querySelector('#pin')
.content
.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
// отрисовка карточки var card = document.querySelector('#card')
// .content
// .querySelector('.map__card');
var numberPhoto = 0;
var mapPinMain = document.querySelector('.map__pin--main');
var mapPinWidth = mapPinMain.offsetWidth;
var mapPinHeight = mapPinMain.offsetHeight;
var map = document.querySelector('.map');
var mainForm = document.querySelector('.ad-form');
var formSelect = document.querySelectorAll('.map__filter');
var formFieldset = document.querySelectorAll('fieldset');
var formAdress = mainForm.querySelector('#address');
var roomSelect = mainForm.querySelector('#room_number');
var capacitySelect = mainForm.querySelector('#capacity');
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var getCoords = function (elem) {
  var box = elem.getBoundingClientRect();
  return {
    top: Math.round(box.top + pageYOffset),
    left: Math.round(box.left + pageXOffset)
  };
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

var renderPin = function (parameter) {
  var pinCreate = similarAddPinTemplate.cloneNode(true);

  pinCreate.style = 'left:' + parameter.location.x + 'px; top:' + parameter.location.y + 'px;';
  pinCreate.querySelector('img').setAttribute('src', parameter.author.avatar);
  pinCreate.querySelector('img').setAttribute('alt', parameter.offer.title);
  return pinCreate;
};

// отрисовка карточки var renderAd = function (parameter) {
// отрисовка карточки   var adCreate = card.cloneNode(true);

// отрисовка карточки   adCreate.querySelector('.popup__title').textContent = parameter.offer.title;
//   adCreate.querySelector('.popup__text--address').textContent = parameter.offer.adress;
//   adCreate.querySelector('.popup__text--price').textContent = parameter.offer.price + '₽/ночь';
//   adCreate.querySelector('.popup__type').textContent = typeOfBuilding[parameter.offer.type];
//   adCreate.querySelector('.popup__text--capacity').textContent = parameter.offer.rooms + ' комнаты для ' + parameter.offer.guests + ' гостей';
//   adCreate.querySelector('.popup__text--time').textContent = 'Заезд после ' + parameter.offer.checkin + ' , выезд до ' + parameter.offer.checkout;
//   adCreate.querySelector('.popup__description').textContent = parameter.offer.description;
//   adCreate.querySelector('.popup__photo').setAttribute('src', parameter.offer.photos[0]);
//   adCreate.querySelector('.popup__avatar').setAttribute('src', parameter.author.avatar);

//   return adCreate;
// };

var fragment = document.createDocumentFragment();
// отрисовка карточки var fragmentCard = document.createDocumentFragment();

// отрисовка карточки fragmentCard.appendChild(renderAd(ads[0]));

ads.forEach(function (currentValue) {
  fragment.appendChild(renderPin(currentValue));
});

// отрисовка карточки mapPins.appendChild(fragmentCard);

var pinCoords = getCoords(mapPinMain);

formAdress.value = pinCoords.left + Math.round(mapPinWidth / 2) + ' px по горизонтали ' + (pinCoords.top + mapPinHeight) + ' px по вертикали';

// хэндлеры

if (map.classList.contains('map--faded')) {
  for (var l = 0; l < formSelect.length; l++) {
    formSelect[l].disabled = true;
  }
  for (var n = 0; n < formFieldset.length; n++) {
    formFieldset[n].disabled = true;
  }
}

var changePageState = function () {
  map.classList.remove('map--faded');
  mapPins.appendChild(fragment);
  mainForm.classList.remove('ad-form--disabled');

  for (var q = 0; q < formSelect.length; q++) {
    formSelect[q].disabled = false;
  }
  for (var w = 0; w < formFieldset.length; w++) {
    formFieldset[w].disabled = false;
  }
};

var checkValue = function () {
  if (roomSelect.value !== capacitySelect.value) {
    roomSelect.setCustomValidity('недопустимое значение');
  } else {
    roomSelect.setCustomValidity('');
  }
};

checkValue();

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === LMB) {
    changePageState();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    changePageState();
  }
});

roomSelect.addEventListener('change', function () {
  checkValue();
});

capacitySelect.addEventListener('change', function () {
  checkValue();
});

