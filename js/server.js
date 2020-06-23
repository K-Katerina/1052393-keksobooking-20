'use strict';

(function () {

  var TIMEOUT = 5000;
  var STATUS_OK = 200;
  var URL_GET = 'https://javascript.pages.academy/keksobooking/data';
  var URL_POST = 'https://javascript.pages.academy/keksobooking';

  var createXhr = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    return xhr;
  };

  var get = function (onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);
    xhr.open('GET', URL_GET);
    xhr.send();
  };

  var post = function (data, onSuccess, onError) {
    var xhr = createXhr(onSuccess, onError);
    xhr.open('POST', URL_POST);
    xhr.send(data);
  };

  window.server = {
    get: get,
    post: post
  };
})();
