'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var DEFAULT_AVATAR = './img/muffin-grey.svg';
  var SIZE_IMG = '69px';

  var adFormField = document.querySelector('.ad-form__field input[type=file]');
  var adFormPreview = document.querySelector('.ad-form-header__preview img');
  var adFormUpload = document.querySelector('.ad-form__upload input[type=file]');
  var adFormPhoto = document.querySelector('.ad-form__photo');

  var loadImg = function (fileChooser, func) {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (!matches) {
      fileChooser.setCustomValidity('Загрузите изображение');
    } else {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.addEventListener('load', function () {
        func(reader.result);
      });
    }
  };

  var removeImg = function (container) {
    var img = container.querySelector('img');
    if (img) {
      img.remove();
    }
  };

  var setDefaultImg = function (container) {
    container.src = DEFAULT_AVATAR;
  };

  var adFormFieldChangeHandler = function () {
    var addPreviewImage = function (src) {
      adFormPreview.src = src;
    };
    loadImg(adFormField, addPreviewImage);
  };

  var adFormUploadChangeHandler = function () {
    removeImg(adFormPhoto);
    var addPhoto = function (src) {
      var image = document.createElement('img');
      image.src = src;
      image.style.width = SIZE_IMG;
      image.style.height = SIZE_IMG;
      adFormPhoto.appendChild(image);
    };
    loadImg(adFormUpload, addPhoto);
  };


  var addEventListenersFileChooser = function () {
    adFormUpload.addEventListener('change', adFormUploadChangeHandler);
    adFormField.addEventListener('change', adFormFieldChangeHandler);
  };

  var removeEventListenersFileChooser = function () {
    setDefaultImg(adFormPreview);
    removeImg(adFormPhoto);
    adFormUpload.removeEventListener('change', adFormUploadChangeHandler);
    adFormField.removeEventListener('change', adFormFieldChangeHandler);
  };

  window.loaderImg = {
    addEventListenersFileChooser: addEventListenersFileChooser,
    removeEventListenersFileChooser: removeEventListenersFileChooser
  };
})();
