(function () {
    var bigPhotoOverlay = document.querySelector('.big-picture');

    var showBigPhotoOverlay = function (photoElement) {
        bigPhotoOverlay.querySelector('.social__caption').textContent = photoElement.description;
        bigPhotoOverlay.querySelector('img').src = photoElement.url;
        bigPhotoOverlay.querySelector('.likes-count').textContent = photoElement.likes;
        bigPhotoOverlay.querySelector('.comments-count').textContent = photoElement.comments.length.toString();
        bigPhotoOverlay.querySelector('.social__comments').innerHTML = '';
        bigPhotoOverlay.querySelector('.social__comments').appendChild(showComments(photoElement.comments));
        bigPhotoOverlay.querySelector('.social__comment-count').classList.add('visually-hidden');
        bigPhotoOverlay.querySelector('.social__comments-loader').classList.add('visually-hidden');
        bigPhotoOverlay.classList.remove('hidden');

        document.addEventListener('keydown', onEscHideOverlay);
    };
    var onImageClick = function (evt) {
        if (evt.target.className === 'picture__img')  {
            showBigPhotoOverlay(window.photosData[parseInt(evt.target.getAttribute('img_index'))]);
        }
    };
    var showComments = function (commentsArray) {
        var commentsTemplate = document.querySelector('#comment-template').content.querySelector('li');
        var commentsFragment = document.createDocumentFragment();
        for (var i = 0; i < commentsArray.length; i++) {
            var comment = commentsTemplate.cloneNode(true);
            comment.querySelector('img').src = commentsArray[i].avatar;
            comment.querySelector('.social__text').textContent = commentsArray[i].message;
            commentsFragment.appendChild(comment);
        }
        return commentsFragment;
    };
    var onPictureCancelButtonClick = function () {
        bigPhotoOverlay.classList.add('hidden');
    };
    var onEscHideOverlay = function (evt) {
        if (evt.keyCode === window.utils.escKeycode) {
            onPictureCancelButtonClick();
        }
    };

    document.querySelector('.pictures').addEventListener('click', onImageClick, true);
    document.querySelector('#picture-cancel').addEventListener('click', onPictureCancelButtonClick);
})();