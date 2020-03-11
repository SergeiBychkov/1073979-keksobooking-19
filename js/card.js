'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapFiltersContainer = map.querySelector('.map__filters-container');
  var card = document.querySelector('#card');
  var popup = card.content.querySelector('.popup');

  var addingCard = function (data) {
    var fragmentCard = document.createDocumentFragment();
    var ad = renderAd(data);
    fragmentCard.appendChild(ad);
    map.insertBefore(fragmentCard, mapFiltersContainer);
    document.addEventListener('keydown', window.map.onEscPress);
  };
  var removeCard = function () {
    var currMap = document.querySelector('.map');
    var cardPopup = currMap.querySelector('.popup');
    currMap.removeChild(cardPopup);
    document.removeEventListener('keydown', window.map.onEscPress);
  };

  var renderAd = function (parameter) {
    var adCreate = popup.cloneNode(true);
    var list = adCreate.querySelector('.popup__features');


    parameter.offer.features.forEach(function (currentValue) {
      var currentElement = document.createElement('li');
      currentElement.classList.add('popup__feature');
      currentElement.classList.add('popup__feature--' + currentValue);
      list.appendChild(currentElement);
    });

    var renderPhotosCard = function () {

      var photosBlock = adCreate.querySelector('.popup__photos');
      for (var i = 0; i < parameter.offer.photos.length; i++) {
        var img = document.createElement('img');
        photosBlock.appendChild(img);
        img.classList.add('popup__photo');
        img.setAttribute('width', '45');
        img.setAttribute('height', '40');
        img.setAttribute('alt', '"Фотография жилья');
        img.setAttribute('src', parameter.offer.photos[i]);
      }
    };

    adCreate.querySelector('.popup__title').textContent = parameter.offer.title;
    adCreate.querySelector('.popup__text--address').textContent = parameter.offer.adress;
    adCreate.querySelector('.popup__text--price').textContent = parameter.offer.price + '₽/ночь';
    adCreate.querySelector('.popup__type').textContent = window.database.typeOfBuilding[parameter.offer.type].name;
    adCreate.querySelector('.popup__text--capacity').textContent = parameter.offer.rooms + ' комнаты для ' + parameter.offer.guests + ' гостей';
    adCreate.querySelector('.popup__text--time').textContent = 'Заезд после ' + parameter.offer.checkin + ' , выезд до ' + parameter.offer.checkout;
    adCreate.querySelector('.popup__description').textContent = parameter.offer.description;


    if (parameter.offer.photos.length === 0) {
      adCreate.querySelector('.popup__photos').remove();
    } else {
      renderPhotosCard();
    }

    adCreate.querySelector('.popup__avatar').setAttribute('src', parameter.author.avatar);

    var buttonClose = adCreate.querySelector('.popup__close');
    buttonClose.addEventListener('click', removeCard);
    return adCreate;
  };

  window.card = {
    addingCard: addingCard,
    removeCard: removeCard
  };
})();
