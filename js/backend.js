'use strict';

(function () {

  var SUCCESS = 200;
  var BAD_REQUEST = 400;
  var NOT_FOUND = 404;
  var ENTERNAL_ERROR = 500;
  var SEC = 10000; // 10s


  var loadAndSave = function (onSuccess, onError, URL, metod, data) {
    window.xhr = new XMLHttpRequest();
    window.xhr.responseType = 'json';
    window.xhr.addEventListener('load', function () {
      switch (true) {
        case (window.xhr.status === SUCCESS):
          onSuccess(window.xhr.response);
          break;
        case (window.xhr.status === BAD_REQUEST):
          onError('Произошла ошибка сервера: неверный запрос');
          break;
        case (window.xhr.status === NOT_FOUND):
          onError('Произошла ошибка сервера: запрашиваемый ресурс не найден');
          break;
        case (window.xhr.status === ENTERNAL_ERROR):
          onError('Произошла внутренняя ошибка сервера');
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

  window.backend = {
    loadAndSave: loadAndSave,
    SUCCESS: SUCCESS
  };
})();
