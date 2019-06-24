(function () {
    window.utils = {
        escKeycode: 27,
        generateRandomArray: function (length) {
            var randomArray = [];
            while (randomArray.length < length) {
                var currentItem = Math.floor(Math.random() * length + 1);
                if (randomArray.indexOf(currentItem) < 0) {
                    randomArray.push(currentItem);
                }
            }
            return randomArray;
        }
    }
})();