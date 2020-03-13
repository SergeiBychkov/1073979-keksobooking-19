'use strict';

(function () {
  var TIMEOUT_IN_MS = 5000;

  var requestMethod = {
    load: {
      method: 'GET',
      url: 'https://js.dump.academy/keksobooking/data'
    },
    upload: {
      method: 'POST',
      url: 'https://js.dump.academy/keksobooking'
    }
  };

  var StatusCode = {
    OK: 200
  };

  // ф-ия загрузки данных на сервер
  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    requestListener(xhr, onSuccess, onError);

    xhr.open(requestMethod.load.method, requestMethod.load.url);
    xhr.send();
  };

  // ф-ия отправки данных на сервер
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    requestListener(xhr, onSuccess, onError);

    xhr.open(requestMethod.upload.method, requestMethod.upload.url);
    xhr.send(data);
  };

  // ф-ия слушателя запросов
  var requestListener = function (xhr, onSuccess, onError) {
    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;
  };
})();
