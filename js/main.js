'use strict';

var ADS_NUMBER = 8;
var ENTER_KEY = 'Enter';
var LMB = 1;
var ESC = 'Escape';

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
var ads = [];
var similarAddPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var card = document.querySelector('#card');
var popup = card.content.querySelector('.popup');
var numberPhoto = 0;
var mapPinMain = mapPins.querySelector('.map__pin--main');
var mapPinWidth = mapPinMain.offsetWidth;
var mapPinHeight = mapPinMain.offsetHeight;
var map = document.querySelector('.map');
var mapFiltersContainer = map.querySelector('.map__filters-container');
var mainForm = document.querySelector('.ad-form');
var formSelect = document.querySelectorAll('.map__filter');
var formFieldset = document.querySelectorAll('fieldset');
var typeSelect = mainForm.querySelector('#type');
var priceInput = mainForm.querySelector('#price');
var roomSelect = mainForm.querySelector('#room_number');
var capacitySelect = mainForm.querySelector('#capacity');
var formAdress = mainForm.querySelector('#address');
var timein = mainForm.querySelector('#timein');
var timeout = mainForm.querySelector('#timeout');
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
var addingCard = function (data) {
  var fragmentCard = document.createDocumentFragment();
  var ad = renderAd(data);
  fragmentCard.appendChild(ad);
  map.insertBefore(fragmentCard, mapFiltersContainer);
  document.addEventListener('keydown', onEscPress);
};
var removeCard = function () {
  var currMap = document.querySelector('.map');
  var cardPopup = currMap.querySelector('.popup');
  currMap.removeChild(cardPopup);
  document.removeEventListener('keydown', onEscPress);
};

for (var index = 0; index < ADS_NUMBER; index++) {
  creationOfParameters();
}

var renderPin = function (parameter) {
  var pinCreate = similarAddPinTemplate.cloneNode(true);

  pinCreate.style = 'left:' + parameter.location.x + 'px; top:' + parameter.location.y + 'px;';
  pinCreate.querySelector('img').setAttribute('src', parameter.author.avatar);
  pinCreate.querySelector('img').setAttribute('alt', parameter.offer.title);

  pinCreate.addEventListener('click', function () {
    if (!pinCreate.matches('.map__pin--main')) {
      if (document.querySelector('.popup')) {
        removeCard();
      }
      addingCard(parameter);
    }
  });
  return pinCreate;
};

var renderAd = function (parameter) {
  var adCreate = popup.cloneNode(true);

  adCreate.querySelector('.popup__title').textContent = parameter.offer.title;
  adCreate.querySelector('.popup__text--address').textContent = parameter.offer.adress;
  adCreate.querySelector('.popup__text--price').textContent = parameter.offer.price + '₽/ночь';
  adCreate.querySelector('.popup__type').textContent = typeOfBuilding[parameter.offer.type];
  adCreate.querySelector('.popup__text--capacity').textContent = parameter.offer.rooms + ' комнаты для ' + parameter.offer.guests + ' гостей';
  adCreate.querySelector('.popup__text--time').textContent = 'Заезд после ' + parameter.offer.checkin + ' , выезд до ' + parameter.offer.checkout;
  adCreate.querySelector('.popup__description').textContent = parameter.offer.description;
  adCreate.querySelector('.popup__photo').setAttribute('src', parameter.offer.photos[0]);
  adCreate.querySelector('.popup__avatar').setAttribute('src', parameter.author.avatar);

  var buttonClose = adCreate.querySelector('.popup__close');
  buttonClose.addEventListener('click', removeCard);
  return adCreate;
};

var fragment = document.createDocumentFragment();

var onEscPress = function (evt) {
  if (evt.key === ESC) {
    removeCard();
  }
};

ads.forEach(function (currentValue) {
  fragment.appendChild(renderPin(currentValue));

});


formAdress.value = mapPinMain.offsetLeft + Math.round(mapPinWidth / 2) + ' px по горизонтали ' + (mapPinMain.offsetTop + mapPinHeight) + ' px по вертикали';

// хэндлеры
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

var setparameters = function (price) {
  priceInput.setAttribute('min', price);
  priceInput.setAttribute('placeholder', price);
};

var checkType = function () {
  setparameters(typeOfBuilding[typeSelect.value].price);
};

var checkValue = function () {
  if (roomSelect.value !== capacitySelect.value) {
    roomSelect.setCustomValidity('недопустимое значение');
  } else {
    roomSelect.setCustomValidity('');
  }
};

var checkTime = function (timeIn, timeOut) {
  if (timeIn.value !== timeOut.value) {
    timeOut.value = timeIn.value;
  }
};

if (map.classList.contains('map--faded')) {
  for (var l = 0; l < formSelect.length; l++) {
    formSelect[l].disabled = true;
  }
  for (var n = 0; n < formFieldset.length; n++) {
    formFieldset[n].disabled = true;
  }
}

timein.addEventListener('change', function () {
  checkTime(timein, timeout);
});

timeout.addEventListener('change', function () {
  checkTime(timeout, timein);
});

checkValue();

checkType();

typeSelect.addEventListener('change', function () {
  checkType();
});

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
