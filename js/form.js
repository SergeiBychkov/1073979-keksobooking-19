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
  var capacitySelect = mainForm.querySelector('#capacity');
  var timein = mainForm.querySelector('#timein');
  var timeout = mainForm.querySelector('#timeout');
  var priceInput = mainForm.querySelector('#price');
  var typeSelect = mainForm.querySelector('#type');
  var formSelect = document.querySelectorAll('.map__filter');
  var formFieldset = document.querySelectorAll('fieldset');
  var mapPinMain = document.querySelector('.map__pin--main');
  var btnReset = mainForm.querySelector('.ad-form__reset');

  var changeFormavAilable = function (option) {
    for (var q = 0; q < formSelect.length; q++) {
      formSelect[q].disabled = option;
    }
    for (var w = 0; w < formFieldset.length; w++) {
      formFieldset[w].disabled = option;
    }
  };

  changeFormavAilable(true);

  var setparameters = function (price) {
    priceInput.setAttribute('min', price);
    priceInput.setAttribute('placeholder', price);
  };

  var changeCapacityRange = function () {
    if (capacitySelect.options.length) {
      [].forEach.call(capacitySelect.options, function (item) {
        item.selected = (RoomsCapacity[roomSelect.value][0] === item.value) ? true : false;
        item.disabled = (RoomsCapacity[roomSelect.value].indexOf(item.value) >= 0) ? false : true;
      });
    }
  };

  var checkValue = function () {
    changeCapacityRange();
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
    setparameters(window.database.typeOfBuilding[typeSelect.value].price);
  };

  checkType();

  checkValue();

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
    checkValue();
  });

  capacitySelect.addEventListener('change', function () {
    checkValue();
  });

  btnReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    mainForm.reset();
    mapPinMain.style = window.constants.PIN_START_COORDS;
    window.map.recordCoords();
  });

  window.form = {
    changeFormavAilable: changeFormavAilable
  };
})();
