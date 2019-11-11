'use strict';

(function () {

  var SUCCESS = 200;
  var SEC = 10000; // 10s
  var loadURL = 'https://js.dump.academy/keksobooking/data';
  var loadMetod = 'GET';

  var loadAndSave = function (onSuccess, onError, URL, metod, data) {

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
  loadAndSave(window.main.successHandlerCard, window.main.errorHandler, loadURL, loadMetod);

  window.errorButton = function () {
    var errButton = document.querySelector('.error__button');
    errButton.addEventListener('mousedown', function () {
      loadAndSave(window.main.successHandlerCard, window.main.errorHandler, loadURL, loadMetod);
      document.querySelector('.error').remove();
    });

    errButton.addEventListener('keydown', function (evt) {
      if (evt.keyCode === window.util.ENTER_KEYCODE) {
        loadAndSave(window.main.successHandlerCard, window.main.errorHandler, loadURL, loadMetod);
        document.querySelector('.error').remove();
      }
    });
  };
})();
