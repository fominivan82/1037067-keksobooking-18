'use strict';

(function () {

  var SUCCESS = 200;
  var SEC = 10000; // 10s


  window.loadAndSave = function (onSuccess, onError, URL, metod, data) {
    window.xhr = new XMLHttpRequest();
    window.xhr.responseType = 'json';
    window.xhr.addEventListener('load', function () {
      switch (true) {
        case (window.xhr.status === SUCCESS):
          onSuccess(window.xhr.response);
          break;
        default:
          onError('Статус ответа: ' + window.xhr.status + ' ' + window.xhr.statusText);
      }
    });
    window.xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    window.xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + window.xhr.timeout + 'мс');
    });
    window.xhr.timeout = SEC;
    window.xhr.open(metod, URL);
    window.xhr.send(data);
  };
})();
