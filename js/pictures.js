var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var DESCRIPTIONS = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
];
var NUMBER_OF_PHOTOS = 25;
var ESC_KEYCODE = 27;
var generateRandomArray = function (length) {
    var randomArray = [];
    while (randomArray.length < length) {
        var currentItem = Math.floor(Math.random() * length + 1);
        if (randomArray.indexOf(currentItem) < 0) {
            randomArray.push(currentItem);
        }
    }
    return randomArray;
};
var generatePhotosArray = function (numberOfPhotos) {
    var photosArray = [];
    var photosIndexes = generateRandomArray(numberOfPhotos);
    var generateCommentsArray = function (numberOfComments) {
        var comments = [];
        for (var j = 0; j < numberOfComments; j++) {
            comments.push(COMMENTS[Math.floor(Math.random() * COMMENTS.length)]);
        }
        return comments;
    };
    for (var i = 0; i < numberOfPhotos; i++) {
        var photo = {
            url: 'photos/' + photosIndexes[i] + '.jpg',
            likes: Math.round(Math.random() * 185 + 15),
            comments: generateCommentsArray(Math.round(Math.random() + 1)),
            description: DESCRIPTIONS[Math.floor(Math.random() * DESCRIPTIONS.length)]
        };
        photosArray.push(photo);
    }
    return photosArray;
};
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

var photosArray = generatePhotosArray(NUMBER_OF_PHOTOS);
renderPhotosFragment(photosArray);

var bigPhotoOverlay = document.querySelector('.big-picture');
var showComments = function (commentsArray) {
    var commentsTemplate = document.querySelector('#comment-template').content.querySelector('li');
    var commentsFragment = document.createDocumentFragment();
    for (var i = 0; i < commentsArray.length; i++) {
        var comment = commentsTemplate.cloneNode(true);
        comment.querySelector('img').src = 'img/avatar-' + Math.ceil(Math.random() * 6) + '.svg';
        comment.querySelector('.social__text').textContent = commentsArray[i];
        commentsFragment.appendChild(comment);
    }
    return commentsFragment;
};
var onEscHideOverlay = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
        onPictureCancelButtonClick();
    }
};
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
        showBigPhotoOverlay(photosArray[parseInt(evt.target.getAttribute('img_index'))]);
    }
};
var onPictureCancelButtonClick = function () {
    bigPhotoOverlay.classList.add('hidden');
};
document.querySelector('.pictures').addEventListener('click', onImageClick, true);
document.querySelector('#picture-cancel').addEventListener('click', onPictureCancelButtonClick);

var uploadOverlay = document.querySelector('.img-upload__overlay');
var hashtagInput = uploadOverlay.querySelector('.text__hashtags');
var commentInput = uploadOverlay.querySelector('.text__description');
var onEscHideUploadOverlay = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
        onUploadCloseButtonClick();
    }
};
var onFileInputUpload = function () {
    uploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onEscHideUploadOverlay);
};
var onUploadCloseButtonClick = function () {
    uploadOverlay.classList.add('hidden');
    document.removeEventListener('keydown', onEscHideUploadOverlay);
    document.querySelector('#upload-file').value = '';
};
document.querySelector('#upload-file').addEventListener('change', onFileInputUpload);
uploadOverlay.querySelector('#upload-cancel').addEventListener('click', onUploadCloseButtonClick);
hashtagInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscHideUploadOverlay);
});
commentInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', onEscHideUploadOverlay);
});
hashtagInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscHideUploadOverlay);
});
commentInput.addEventListener('blur', function () {
    document.addEventListener('keydown', onEscHideUploadOverlay);
});

var uploadForm = document.querySelector('#upload-select-image');
var uploadFormSubmitButton = document.querySelector('#upload-submit');
var validateHashtags = function () {
    var isHashtagValid = true;
    if (hashtagInput.value !== '') {
        var hashtagsArray = hashtagInput.value.split(' ');
        if (hashtagsArray.length > 5) {
            hashtagInput.setCustomValidity('Поле должно содержать не более 5 хэштегов разделенных пробелами');
            isHashtagValid = false;
        } else {
            for (var i = 0; i < hashtagsArray.length; i++) {
                if (isHashtagValid) {
                    var hashtag = hashtagsArray[i];
                    if (hashtag.length > 20 ||
                        hashtag.length === 1 ||
                        hashtag[0] !== '#') {
                        hashtagInput.setCustomValidity('Хэштег должен начинаться с решетки и быть длиной от 2 до 20 знаков.');
                        isHashtagValid = false;
                        break;
                    } else {
                        for (var j = 1; j < hashtag.length; j++) {
                            if (hashtag[j] === ',' ||
                                hashtag[j] === '#') {
                                hashtagInput.setCustomValidity('Хэштеги должны разделяться пробелами');
                                isHashtagValid = false;
                                break;
                            }
                        }
                    }
                } else {
                    break;
                }

            }
        }
    }
    return isHashtagValid;
};
onUploadFormSubmit = function (evt) {
    // debugger;
    evt.preventDefault();
    if (validateHashtags()) {
        uploadForm.submit();
    } else {
        hashtagInput.reportValidity();
    }
};
uploadFormSubmitButton.addEventListener('click', onUploadFormSubmit);

var saturationPin = uploadOverlay.querySelector('.effect-level__pin');
var saturationBar = uploadOverlay.querySelector('.effect-level__depth');
var onSaturationPinMousedown = function (evt) {
    evt.preventDefault();
    var minLeft = Math.round(saturationPin.parentElement.getBoundingClientRect().left);
    var maxLeft = Math.round(saturationPin.parentElement.getBoundingClientRect().right);
    var onDocumentMousemove = function (moveEvt) {
        moveEvt.preventDefault();
        if (moveEvt.clientX >= minLeft && moveEvt.clientX <= maxLeft) {
            saturationPin.style.left = (moveEvt.clientX - minLeft) + 'px';
            saturationBar.style.width = saturationPin.style.left;
        }

    };
    var onDocumentMouseup  = function (evt) {
        document.removeEventListener('mousemove', onDocumentMousemove);
        document.removeEventListener('mouseup', onDocumentMouseup);
    };

    document.addEventListener('mousemove', onDocumentMousemove);
    document.addEventListener('mouseup', onDocumentMouseup);
};
saturationPin.addEventListener('mousedown', onSaturationPinMousedown);
