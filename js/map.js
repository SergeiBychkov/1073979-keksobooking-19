'use strict';

(function () {
  var quantityOfPins = 5;
  var main = document.querySelector('main');
  var mainForm = main.querySelector('.ad-form');
  var map = main.querySelector('.map');
  var mapPins = main.querySelector('.map__pins');
  var formAdress = mainForm.querySelector('#address');
  var mapPinMain = mapPins.querySelector('.map__pin--main');
  var mapPinWidth = mapPinMain.offsetWidth;
  var mapForm = main.querySelector('.map__filters');
  var mapMinX = window.database.mapLimit.left - mapPinWidth / 2;
  var mapMaxX = window.database.mapLimit.right - mapPinWidth / 2;
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var errorCreate = errorTemplate.cloneNode(true);
  var errorBtnClose = errorCreate.querySelector('.error__button');
  var fragmentPin = document.createDocumentFragment();

  // ф-ия при успешном сценарии загрузки данных
  var onSuccessDownload = function (parameter) {
    window.data = parameter;
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
      document.removeEventListener('keydown', onSuccessCloseField);
      document.removeEventListener('click', onSuccessCloseField);
    }
  };

  // ф-ия отрисовки успеха
  var renderSuccessMessage = function () {
    var successTemplate = document.querySelector('#success').content.querySelector('.success');
    var succesCreate = successTemplate.cloneNode(true);

    document.addEventListener('keydown', onSuccessCloseField);
    document.addEventListener('click', onSuccessCloseField);
    return succesCreate;
  };

  // ф-ия удаления пинов с карты
  var removePins = function () {
    var buttons = mapPins.querySelectorAll('.map__pin');

    for (var p = 0; p < buttons.length; p++) {
      if (!buttons[p].matches('.map__pin--main')) {
        mapPins.removeChild(buttons[p]);
      }
    }
  };

  // ф-ия удаления попАпа с карты
  var removePopup = function () {
    if (document.querySelector('.popup')) {
      map.removeChild(document.querySelector('.popup'));
    }
  };


  // ф-ия при успешной отправки данных
  var successFormSubmit = function () {
    main.appendChild(renderSuccessMessage());
    removePins();
    removePopup();
    mapPinMain.style = window.constants.PIN_START_COORDS;
    mainForm.reset();
    mapForm.reset();
    recordCoords();
    map.classList.add('map--faded');
    mainForm.classList.add('ad-form--disabled');
    window.form.changeFormavAilable(true);
    window.form.checkCapacity();
  };

  // коллбэк на закрытие окна с ошибкой
  var onErrorCloseField = function (evt) {
    if (evt.key === window.constants.ESC || evt.button === 0) {
      main.removeChild(document.querySelector('.error'));
      document.removeEventListener('keydown', onErrorCloseField);
      errorCreate.removeEventListener('click', onErrorCloseField);
      errorBtnClose.removeEventListener('click', onErrorCloseField);
    }
  };

  // ф-ия отрисовки ошибки
  var renderErrorMesage = function (text) {
    errorCreate.querySelector('.error__message').textContent = text;

    document.addEventListener('keydown', onErrorCloseField);
    errorCreate.addEventListener('click', onErrorCloseField);
    errorBtnClose.addEventListener('click', onErrorCloseField);
    return errorCreate;
  };

  // ф-ия при ошибке загрузки данных
  var onError = function (text) {
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
      window.load(onSuccessDownload, onError);
    }
    map.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    window.form.changeFormavAilable(false);
  };

  // слушатель на отправку данных формы
  mainForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(mainForm), successFormSubmit, onError);
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

  window.map = {
    fragmentPin: fragmentPin,
    onEscPress: onEscPress,
    recordCoords: recordCoords,
    removePins: removePins,
    removePopup: removePopup,
  };
})();
