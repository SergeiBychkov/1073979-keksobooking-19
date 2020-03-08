'use strict';

(function () {
  var similarAddPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (parameter) {
    var pinCreate = similarAddPinTemplate.cloneNode(true);

    pinCreate.style = 'left:' + parameter.location.x + 'px; top:' + parameter.location.y + 'px;';
    pinCreate.querySelector('img').setAttribute('src', parameter.author.avatar);
    pinCreate.querySelector('img').setAttribute('alt', parameter.offer.title);

    pinCreate.addEventListener('click', function () {
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
