'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var fileAvatar = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.ad-form-header__preview > img');
  var fileFoto = document.querySelector('#images');
  var wrapperFoto = document.querySelector('.ad-form__photo');
  var fotoElement = '<img src="" alt="Фотографии апартаментов" width="40" height="44">';


  var changeAvatar = function (file, avatar) {
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatar.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };


  fileAvatar.addEventListener('change', function () {
    var file = fileAvatar.files[0];
    changeAvatar(file, previewAvatar);
  });

  fileFoto.addEventListener('change', function () {
    var file = fileFoto.files[0];
    wrapperFoto.insertAdjacentHTML('afterbegin', fotoElement);
    var previewFoto = document.querySelector('.ad-form__photo > img');
    changeAvatar(file, previewFoto);
  });
})();
