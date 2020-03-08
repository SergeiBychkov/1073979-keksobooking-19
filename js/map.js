'use strict';

(function () {
  var quantityOfPins = 5;
  var main = document.querySelector('main');
  var mainForm = main.querySelector('.ad-form');
  var formData = new FormData(mainForm);
  var map = main.querySelector('.map');
  var mapPins = main.querySelector('.map__pins');
  var formAdress = mainForm.querySelector('#address');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapPinWidth = mapPinMain.offsetWidth;
  var formFieldset = main.querySelectorAll('fieldset');
  var formSelect = main.querySelectorAll('.map__filter');
  var roomSelect = mainForm.querySelector('#room_number');
  var capacitySelect = mainForm.querySelector('#capacity');
  var timein = mainForm.querySelector('#timein');
  var timeout = mainForm.querySelector('#timeout');
  var mapMinX = window.database.mapLimit.left - mapPinWidth / 2;
  var mapMaxX = window.database.mapLimit.right - mapPinWidth / 2;

  // ф-ия при успешном сценарии загрузки данных
  var successHandler = function (parameter) {
    var fragmentPin = document.createDocumentFragment();
    parameter = parameter.slice(0, quantityOfPins);

    parameter.forEach(function (currentValue) {
      fragmentPin.appendChild(window.pin.renderPin(currentValue));
      mapPins.appendChild(fragmentPin);
    });
  };

  // коллбэк на закрытие окна с успехом
  var onSuccessCloseField = function (evt) {
    if (evt.key === window.constants.ESC || evt.button === 0) {
      main.removeChild(document.querySelector('.success'));
      document.removeEventListener('keydown', onErrorCloseField);
      document.removeEventListener('click', onErrorCloseField);
    }
  };

  // ф-ия отрисовки успеха
  var renderSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var succesCreate = successTemplate.cloneNode(true);

    document.addEventListener('keydown', onSuccessCloseField);
    return succesCreate;
  };

  // место под: ф-ия при успешной отправки формы
  var successHandlerForm = function () {
    main.appendChild(renderSuccessMessage);
  };

  // коллбэк на закрытие окна с ошибкой
  var onErrorCloseField = function (evt) {
    if (evt.key === window.constants.ESC || evt.button === 0) {
      main.removeChild(document.querySelector('.error'));
      document.removeEventListener('keydown', onErrorCloseField);
      document.removeEventListener('click', onErrorCloseField);
    }
  };

  // ф-ия отрисовки ошибки
  var renderErrorMesage = function (text) {
    var errorTemplate = document.querySelector('#error').content.querySelector('.error');
    var errorCreate = errorTemplate.cloneNode(true);
    var errorBtnClose = errorCreate.querySelector('.error__button');

    errorCreate.querySelector('.error__message').textContent = text;

    document.addEventListener('keydown', onErrorCloseField);
    errorBtnClose.addEventListener('click', onErrorCloseField);
    return errorCreate;
  };

  // ф-ия при ошибке загрузки данных
  var errorHandler = function (text) {
    main.appendChild(renderErrorMesage(text));
  };

  var onEscPress = function (evt) {
    if (evt.key === window.constants.ESC) {
      window.card.removeCard();
    }
  };

  // ф-ия записи координат в поле Адрес
  var recordCoords = function () {
    formAdress.value = mapPinMain.offsetLeft + Math.floor(mapPinWidth / 2) + ', ' + mapPinMain.offsetTop;
  };

  recordCoords();

  // ф-ия изменения состояния страницы
  var changePageState = function () {
    if (map.matches('.map--faded')) {
      window.load(successHandler, errorHandler);
    }
    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');

    for (var q = 0; q < formSelect.length; q++) {
      formSelect[q].disabled = false;
    }
    for (var w = 0; w < formFieldset.length; w++) {
      formFieldset[w].disabled = false;
    }
  };

  // слушатель на отправку данных формы
  mainForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(formData, successHandlerForm, renderErrorMesage);
  });

  // передвижение главного пина
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
      var checkCoord = function (min, max, current) {
        if (current < min) {
          return min + 'px';
        } else if (current > max) {
          return max + 'px';
        } else {
          return current + 'px';
        }
      };

      mapPinMain.style.top = checkCoord(window.database.mapLimit.top, window.database.mapLimit.bottom, shiftCoordY);
      mapPinMain.style.left = checkCoord(mapMinX, mapMaxX, shiftCoordX);
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

  // ф-ия сравнения количества комнат и гостей
  var checkValue = function () {
    if (roomSelect.value !== capacitySelect.value) {
      roomSelect.setCustomValidity('недопустимое значение');
    } else {
      roomSelect.setCustomValidity('');
    }
  };

  // ф-ия сравнения времени заезда и выезда
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

  // слушатель на изменение положения страницы по клику лкм на мейн пин
  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === window.constants.LMB) {
      changePageState();
    }
  });

  // слушатель на изменение положения страницы по нажатию ent на мейн пин
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
