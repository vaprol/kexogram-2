(function () {
    var renderPhotosFragment = function (photosArray) {
        var photoTemplate = document.querySelector('#picture').content.querySelector('a');
        var photosFragment = document.createDocumentFragment();
        for (var i = 0; i < photosArray.length; i++) {
            var photoNode = photoTemplate.cloneNode(true);
            photoNode.querySelector('img').src = photosArray[i].url;
            photoNode.querySelector('img').setAttribute('img_index', i.toString());
            photoNode.querySelector('.picture__likes').textContent = photosArray[i].likes;
            photoNode.querySelector('.picture__comments').innerHTML = photosArray[i].comments.join('<br/>');
            photosFragment.appendChild(photoNode);
        }
        document.querySelector('.pictures').appendChild(photosFragment);
    };
    renderPhotosFragment(window.photosData);
})();
