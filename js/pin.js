'use strict';

(function () {
  var PINS_WIDTH = 50;
  var PINS_HEIGHT = 70;

  var similarAddPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (parameter) {
    var pinCreate = similarAddPinTemplate.cloneNode(true);

    pinCreate.style = 'left:' + (parameter.location.x - PINS_WIDTH / 2) + 'px; top:' + (parameter.location.y - PINS_HEIGHT) + 'px;';
    pinCreate.querySelector('img').setAttribute('src', parameter.author.avatar);
    pinCreate.querySelector('img').setAttribute('alt', parameter.offer.title);

    pinCreate.addEventListener('click', function () {
      var activePin = document.querySelector('.map__pin--active');

      pinCreate.classList.add('map__pin--active');
      if (activePin) {
        activePin.classList.remove('map__pin--active');
        pinCreate.classList.add('map__pin--active');
      }

      if (!pinCreate.matches('.map__pin--main')) {
        if (document.querySelector('.popup')) {
          window.card.removeCard();
        }
        window.card.addingCard(parameter);
      }
    });
    return pinCreate;
  };

  window.pin = {
    renderPin: renderPin,
  };
})();
