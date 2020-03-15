'use strict';

(function () {
  var PICTURE_WIDTH = 70;
  var PICTURE_HEIGHT = 70;

  var form = document.querySelector('.ad-form');
  var avatarChooser = form.querySelector('.ad-form-header__input');
  var avatar = form.querySelector('.ad-form-header__preview img');
  var houseChooser = form.querySelector('.ad-form__input');
  var housePhoto = form.querySelector('.ad-form__photo');

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      avatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  });

  houseChooser.addEventListener('change', function () {
    var file = houseChooser.files[0];
    var reader = new FileReader();
    var renderImg = function () {
      var imgBlock = new Image(PICTURE_WIDTH, PICTURE_HEIGHT);
      imgBlock.alt = 'Фото помещения';
      return imgBlock;
    };

    reader.addEventListener('load', function () {
      if (document.querySelector('.ad-form__photo img')) {
        document.querySelector('.ad-form__photo img').src = reader.result;
      } else {
        housePhoto.appendChild(renderImg());
      }

      document.querySelector('.ad-form__photo img').src = reader.result;
    });
    reader.readAsDataURL(file);
  });
})();
