'use strict';

(function () {
  var mainForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var formAdress = mainForm.querySelector('#address');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapPinWidth = mapPinMain.offsetWidth;
  var mapPinHeight = mapPinMain.offsetHeight;
  var formFieldset = document.querySelectorAll('fieldset');
  var formSelect = document.querySelectorAll('.map__filter');
  var roomSelect = mainForm.querySelector('#room_number');
  var capacitySelect = mainForm.querySelector('#capacity');
  var timein = mainForm.querySelector('#timein');
  var timeout = mainForm.querySelector('#timeout');

  var onEscPress = function (evt) {
    if (evt.key === window.constants.ESC) {
      window.card.removeCard();
    }
  };

  formAdress.value = mapPinMain.offsetLeft + Math.round(mapPinWidth / 2) + ' px по горизонтали ' + (mapPinMain.offsetTop + mapPinHeight) + ' px по вертикали';

  var changePageState = function () {
    map.classList.remove('map--faded');
    mapPins.appendChild(window.pin.fragment);
    mainForm.classList.remove('ad-form--disabled');

    for (var q = 0; q < formSelect.length; q++) {
      formSelect[q].disabled = false;
    }
    for (var w = 0; w < formFieldset.length; w++) {
      formFieldset[w].disabled = false;
    }

    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var shiftCoordY = mapPinMain.offsetTop - shift.y;
        var shiftCoordX = mapPinMain.offsetLeft - shift.x;

        if (shiftCoordY < 130) {
          mapPinMain.style.top = '130px';
        }

        if (shiftCoordY > (600 + mapPinHeight)) {
          mapPinMain.style.top = 600 + mapPinHeight + 'px';
        }

        if (shiftCoordX < (0 - (mapPinWidth / 2))) {
          mapPinMain.style.left = 0 - (mapPinWidth / 2) + 'px';
        }

        if (shiftCoordX > (1200 - (mapPinWidth / 2))) {
          mapPinMain.style.left = 1200 - (mapPinWidth / 2) + 'px';
        }

        mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
        mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
        formAdress.value = (mapPinMain.offsetLeft - shift.x) + 'px по горизонтали ' + (mapPinMain.offsetTop - shift.y) + 'px по вертикали';
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        mapPins.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (dragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            mapPinMain.removeEventListener('click', onClickPreventDefault);
          };
          mapPinMain.addEventListener('click', onClickPreventDefault);
        }
      };
      mapPins.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
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

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === window.constants.LMB) {
      changePageState();
    }
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === window.constants.ENTER_KEY) {
      changePageState();
    }
  });

  roomSelect.addEventListener('change', function () {
    checkValue();
  });

  capacitySelect.addEventListener('change', function () {
    checkValue();
  });
  window.map = {
    onEscPress: onEscPress
  };
})();
