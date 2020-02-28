'use strict';

(function () {
  var mainForm = document.querySelector('.ad-form');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');
  var formAdress = mainForm.querySelector('#address');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapPinWidth = mapPinMain.offsetWidth;
  var formFieldset = document.querySelectorAll('fieldset');
  var formSelect = document.querySelectorAll('.map__filter');
  var roomSelect = mainForm.querySelector('#room_number');
  var capacitySelect = mainForm.querySelector('#capacity');
  var timein = mainForm.querySelector('#timein');
  var timeout = mainForm.querySelector('#timeout');
  var mapLimit = {
    top: 130,
    right: 1200,
    bottom: 630,
    left: 0
  };
  var mapMinX = mapLimit.left - mapPinWidth / 2;
  var mapMaxX = mapLimit.right - mapPinWidth / 2;


  var onEscPress = function (evt) {
    if (evt.key === window.constants.ESC) {
      window.card.removeCard();
    }
  };

  var recordCoords = function () {
    formAdress.value = mapPinMain.offsetLeft + Math.floor(mapPinWidth / 2) + ', ' + mapPinMain.offsetTop;
  };

  recordCoords();

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
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

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
      var checkCoords = function (min, max, current) {
        if (current < min) {
          return min + 'px';
        } else if (current > max) {
          return max + 'px';
        } else {
          return current + 'px';
        }
      };

      mapPinMain.style.top = checkCoords(mapLimit.top, mapLimit.bottom, shiftCoordY);
      mapPinMain.style.left = checkCoords(mapMinX, mapMaxX, shiftCoordX);
      recordCoords();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      mapPins.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    mapPins.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

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
