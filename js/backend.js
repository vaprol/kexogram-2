(function () {
    window.backend = {
        load: function (onLoad, onError) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'json';
            xhr.open('GET', 'https://js.dump.academy/kekstagram/data');
            xhr.addEventListener('load', function () {
                switch (xhr.status) {
                    case 200:
                        onLoad(xhr.response);
                        break;
                    default:
                        onError('Произошла ошибка. Код ошибки: ' + xhr.status + ' ' + xhr.statusText)
                }
            });
            xhr.addEventListener('error', function () {
                onError('Ошибка сервера');
            });
            xhr.addEventListener('timeout', function () {
                onError('Превышено время ожидания ответа от сервера');
            });
            xhr.send();
        },
        save: function (data, onLoad, onError) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'https://js.dump.academy/kekstagram');
            xhr.addEventListener('load', function () {
                switch (xhr.status) {
                    case 200:
                        onLoad();
                        break;
                    default:
                        onError('Произошла ошибка. Код ошибки: ' + xhr.status + ' ' + xhr.statusText)
                }
            });
            xhr.addEventListener('error', function () {
                onError('Ошибка сервера');
            });
            xhr.addEventListener('timeout', function () {
                onError('Превышено время ожидания ответа от сервера');
            });
            xhr.send(data);
        }
    }
})();