'use strict';

(function () {
  var mainForm = document.querySelector('.ad-form');
  var priceInput = mainForm.querySelector('#price');
  var typeSelect = mainForm.querySelector('#type');
  var mapPinMain = document.querySelector('.map__pin--main');
  var btnReset = mainForm.querySelector('.ad-form__reset');

  var setparameters = function (price) {
    priceInput.setAttribute('min', price);
    priceInput.setAttribute('placeholder', price);
  };

  var checkType = function () {
    setparameters(window.database.typeOfBuilding[typeSelect.value].price);
  };

  checkType();

  typeSelect.addEventListener('change', function () {
    checkType();
  });

  btnReset.addEventListener('click', function () {
    mapPinMain.style = window.constants.PIN_START_COORDS;
  });
})();
