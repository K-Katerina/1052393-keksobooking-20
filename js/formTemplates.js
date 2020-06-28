'use strict';

(function () {

  var ESC_NUM = 'Escape';

  var main = document.querySelector('main');

  var onSuccessPost = function () {
    var successTemplate = document.querySelector('#success').content.cloneNode(true).querySelector('div');
    main.appendChild(successTemplate);

    var messegeSuccessClickHandler = function () {
      successTemplate.remove();
      successTemplate.removeEventListener('click', messegeSuccessClickHandler);
    };

    var messegeSuccessEscHandler = function (evt) {
      if (evt.key === ESC_NUM) {
        successTemplate.remove();
        document.removeEventListener('keydown', messegeSuccessEscHandler);
      }
    };

    successTemplate.addEventListener('click', messegeSuccessClickHandler);
    document.addEventListener('keydown', messegeSuccessEscHandler);
  };

  var onErrorPost = function (message) {
    var errorTemplate = document.querySelector('#error').content.cloneNode(true).querySelector('div');
    errorTemplate.querySelector('.error__message span').textContent = message;
    main.appendChild(errorTemplate);
    var errorBtn = errorTemplate.querySelector('.error__button');

    var messegeErrorClickHandler = function () {
      errorTemplate.remove();
      errorTemplate.removeEventListener('click', messegeErrorClickHandler);
    };

    var messegeErrorEscHandler = function (evt) {
      if (evt.key === ESC_NUM) {
        errorTemplate.remove();
        document.removeEventListener('keydown', messegeErrorEscHandler);
      }
    };

    var messegeErrorBtnClickHandler = function () {
      errorTemplate.remove();
      document.removeEventListener('click', messegeErrorBtnClickHandler);
    };

    errorTemplate.addEventListener('click', messegeErrorClickHandler);
    document.addEventListener('keydown', messegeErrorEscHandler);
    errorBtn.addEventListener('click', messegeErrorBtnClickHandler);
  };

  window.formTemplates = {
    onSuccessPost: onSuccessPost,
    onErrorPost: onErrorPost
  };
})();
