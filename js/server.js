'use strict';

(function () {

  var performGet = function (url, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', onSuccess);
    xhr.addEventListener('error', onError);
    xhr.addEventListener('timeout', onError);
    xhr.open('GET', url);
    xhr.send();
  };

  window.server = {
    get: performGet,
    // post: performPost
  };

})();
