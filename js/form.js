'use strict';

(function () {
  var mainForm = document.querySelector('.ad-form');
  var roomSelect = mainForm.querySelector('#room_number');
  var RoomsCapacity = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
  };
  var mapForm = document.querySelector('.map__filters');
  var map = document.querySelector('.map');
  var capacitySelect = mainForm.querySelector('#capacity');
  var timein = mainForm.querySelector('#timein');
  var timeout = mainForm.querySelector('#timeout');
  var priceInput = mainForm.querySelector('#price');
  var typeSelect = mainForm.querySelector('#type');
  var formSelectElements = document.querySelectorAll('.map__filter');
  var formSelects = Array.from(formSelectElements);
  var formFieldsetElements = document.querySelectorAll('fieldset');
  var formFieldsets = Array.from(formFieldsetElements);
  var mapPinMain = document.querySelector('.map__pin--main');
  var btnReset = mainForm.querySelector('.ad-form__reset');

  var resetPhoto = function () {
    var avatar = mainForm.querySelector('.ad-form-header__preview img');
    avatar.src = 'img/muffin-grey.svg';

    var housePhoto = mainForm.querySelector('.ad-form__photo');

    if (housePhoto.querySelector('.ad-form__photo img')) {
      housePhoto.removeChild(housePhoto.querySelector('.ad-form__photo img'));
    }
  };

  var changeFormavAilable = function (option) {
    formSelects.forEach(function (currentValue) {
      currentValue.disabled = option;
    });

    formFieldsets.forEach(function (currentValue) {
      currentValue.disabled = option;
    });
  };

  changeFormavAilable(true);

  var setparameters = function (price) {
    priceInput.setAttribute('min', price);
    priceInput.setAttribute('placeholder', price);
  };

  var checkCapacity = function () {
    var validGuestsOptions = RoomsCapacity[roomSelect.value];
    var guestsOptions = capacitySelect.querySelectorAll('option');
    guestsOptions.forEach(function (currentOption) {
      currentOption.disabled = true;
      currentOption.selected = false;
      var index = validGuestsOptions.indexOf(currentOption.value);
      if (index >= 0) {
        currentOption.disabled = false;
        if (index === 0) {
          currentOption.selected = true;
        }
      }
    });
  };

  checkCapacity();

  var validateValue = function () {
    if ((capacitySelect.value <= roomSelect.value) && (capacitySelect.value !== '0') && (roomSelect.value !== '100')) {
      roomSelect.setCustomValidity('');
    } else if ((capacitySelect.value === '0') && (roomSelect.value === '100')) {
      roomSelect.setCustomValidity('');
    } else {
      roomSelect.setCustomValidity('недопустимое значение');
    }
  };

  var checkTime = function (timeIn, timeOut) {
    if (timeIn.value !== timeOut.value) {
      timeOut.value = timeIn.value;
    }
  };

  var checkType = function () {
    setparameters(window.database.TypeOfBuilding[typeSelect.value].price);
  };

  checkType();

  validateValue();

  typeSelect.addEventListener('change', function () {
    checkType();
  });

  timein.addEventListener('change', function () {
    checkTime(timein, timeout);
  });

  timeout.addEventListener('change', function () {
    checkTime(timeout, timein);
  });

  roomSelect.addEventListener('change', function () {
    checkCapacity();
    validateValue();
  });

  capacitySelect.addEventListener('change', function () {
    validateValue();
  });

  btnReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.map.removePins();
    window.map.removePopup();
    mapPinMain.style = window.constants.PIN_START_COORDS;
    mainForm.reset();
    mapForm.reset();
    resetPhoto();
    window.map.recordCoords();
    map.classList.add('map--faded');
    mainForm.classList.add('ad-form--disabled');
    changeFormavAilable(true);
    checkCapacity();
    checkType();
  });

  window.form = {
    changeFormavAilable: changeFormavAilable,
    checkCapacity: checkCapacity,
    resetPhoto: resetPhoto,
    checkType: checkType
  };
})();
