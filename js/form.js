(function () {
    var uploadOverlay = document.querySelector('.img-upload__overlay');
    var onFileInputUpload = function () {
        uploadOverlay.classList.remove('hidden');
        document.addEventListener('keydown', onEscHideUploadOverlay);
    };
    var onEscHideUploadOverlay = function (evt) {
        if (evt.keyCode === window.utils.escKeycode) {
            onUploadCloseButtonClick();
        }
    };
    var onUploadCloseButtonClick = function () {
        uploadOverlay.classList.add('hidden');
        document.removeEventListener('keydown', onEscHideUploadOverlay);
        document.querySelector('#upload-file').value = '';
    };
    document.querySelector('#upload-file').addEventListener('change', onFileInputUpload);
    uploadOverlay.querySelector('#upload-cancel').addEventListener('click', onUploadCloseButtonClick);

    var uploadForm = document.querySelector('#upload-select-image');
    var uploadedPhotoPreview = uploadOverlay.querySelector('.img-upload__preview img');
    var saturationPin = uploadForm.querySelector('.effect-level__pin');
    var saturationBar = uploadForm.querySelector('.effect-level__depth');
    var filterListPanel = uploadOverlay.querySelector('.effects__list');
    var hashtagInput = uploadForm.querySelector('.text__hashtags');
    var commentInput = uploadForm.querySelector('.text__description');
    var uploadFormSubmitButton = document.querySelector('#upload-submit');
    var chosenFilter = 'none';
    var setFilterScale = function (filter, scale) {
        switch (filter) {
            case 'none':
                uploadedPhotoPreview.style.filter = '';
                break;
            case 'chrome':
                uploadedPhotoPreview.style.filter = 'grayscale(' + (Math.round(scale * 10) / 10) + ')';
                break;
            case 'sepia':
                uploadedPhotoPreview.style.filter = 'sepia(' + (Math.round(scale * 10) / 10) + ')';
                break;
            case 'marvin':
                uploadedPhotoPreview.style.filter = 'invert(' + Math.round(scale * 100) + '%)';
                break;
            case 'phobos':
                uploadedPhotoPreview.style.filter = 'blur(' + Math.round(scale * 5) + 'px)';
                break;
            case 'heat':
                uploadedPhotoPreview.style.filter = 'brightness(' + (Math.round(scale * 3 * 10) / 10) + ')';
                break;
        }
    };
    var onFilterClick = function (evt) {
        if (evt.target.tagName === 'INPUT') {
            saturationPin.style.left = '';
            saturationBar.style.width = '';
            evt.target.checked = true;
            chosenFilter = evt.target.value;
            setFilterScale(chosenFilter, saturationPin.offsetLeft / saturationPin.parentElement.offsetWidth);
        }
    };
    var onSaturationPinMousedown = function (evt) {
        evt.preventDefault();
        var minLeft = Math.round(saturationPin.parentElement.getBoundingClientRect().left);
        var maxLeft = Math.round(saturationPin.parentElement.getBoundingClientRect().right);
        var onDocumentMousemove = function (moveEvt) {
            moveEvt.preventDefault();
            if (moveEvt.clientX >= minLeft && moveEvt.clientX <= maxLeft) {
                saturationPin.style.left = (moveEvt.clientX - minLeft) + 'px';
                saturationBar.style.width = saturationPin.style.left;
                setFilterScale(chosenFilter, saturationPin.offsetLeft / saturationPin.parentElement.offsetWidth);
            }

        };
        var onDocumentMouseup  = function (evt) {
            document.removeEventListener('mousemove', onDocumentMousemove);
            document.removeEventListener('mouseup', onDocumentMouseup);
        };

        document.addEventListener('mousemove', onDocumentMousemove);
        document.addEventListener('mouseup', onDocumentMouseup);
    };
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
    var onUploadFormSubmit = function (evt) {
        evt.preventDefault();
        if (validateHashtags()) {
            uploadForm.submit();
        } else {
            hashtagInput.reportValidity();
        }
    };
    filterListPanel.addEventListener('click', onFilterClick);
    saturationPin.addEventListener('mousedown', onSaturationPinMousedown);
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
    uploadFormSubmitButton.addEventListener('click', onUploadFormSubmit);
})();