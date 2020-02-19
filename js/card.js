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

    adCreate.querySelector('.popup__title').textContent = parameter.offer.title;
    adCreate.querySelector('.popup__text--address').textContent = parameter.offer.adress;
    adCreate.querySelector('.popup__text--price').textContent = parameter.offer.price + '₽/ночь';
    adCreate.querySelector('.popup__type').textContent = window.data.typeOfBuilding[parameter.offer.type].name;
    adCreate.querySelector('.popup__text--capacity').textContent = parameter.offer.rooms + ' комнаты для ' + parameter.offer.guests + ' гостей';
    adCreate.querySelector('.popup__text--time').textContent = 'Заезд после ' + parameter.offer.checkin + ' , выезд до ' + parameter.offer.checkout;
    adCreate.querySelector('.popup__description').textContent = parameter.offer.description;
    adCreate.querySelector('.popup__photo').setAttribute('src', parameter.offer.photos[0]);
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
