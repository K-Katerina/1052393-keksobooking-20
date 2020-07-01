'use strict';

(function () {

  var ESC_NUM = 'Escape';

  var main = document.querySelector('main');

  var onSuccessPost = function () {
    var successTemplate = document.querySelector('#success').content.cloneNode(true).querySelector('div');
    main.appendChild(successTemplate);

    var messageSuccessClickHandler = function () {
      successTemplate.remove();
      successTemplate.removeEventListener('click', messageSuccessClickHandler);
    };

    var messageSuccessEscHandler = function (evt) {
      if (evt.key === ESC_NUM) {
        successTemplate.remove();
        document.removeEventListener('keydown', messageSuccessEscHandler);
      }
    };

    successTemplate.addEventListener('click', messageSuccessClickHandler);
    document.addEventListener('keydown', messageSuccessEscHandler);
  };

  var onErrorPost = function (message) {
    var errorTemplate = document.querySelector('#error').content.cloneNode(true).querySelector('div');
    errorTemplate.querySelector('.error__message span').textContent = message;
    main.appendChild(errorTemplate);
    var errorBtn = errorTemplate.querySelector('.error__button');

    var messageErrorClickHandler = function () {
      errorTemplate.remove();
      errorTemplate.removeEventListener('click', messageErrorClickHandler);
    };

    var messageErrorEscHandler = function (evt) {
      if (evt.key === ESC_NUM) {
        errorTemplate.remove();
        document.removeEventListener('keydown', messageErrorEscHandler);
      }
    };

    var messageErrorBtnClickHandler = function () {
      errorTemplate.remove();
      document.removeEventListener('click', messageErrorBtnClickHandler);
    };

    errorTemplate.addEventListener('click', messageErrorClickHandler);
    document.addEventListener('keydown', messageErrorEscHandler);
    errorBtn.addEventListener('click', messageErrorBtnClickHandler);
  };

  window.formTemplates = {
    onSuccessPost: onSuccessPost,
    onErrorPost: onErrorPost
  };
})();
