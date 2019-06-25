(function () {
    var onError = function (errMessage) {
        console.log(errMessage);
    };
    window.backend.load(function (photoArray) {
        window.photosData = photoArray;
    }, onError);
})();