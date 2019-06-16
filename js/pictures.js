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
    var photoTemplate = document.querySelector('#picture-template').content.querySelector('a');
    var photosFragment = document.createDocumentFragment();
    for (var i = 0; i < photosArray.length; i++) {
        var photoNode = photoTemplate.cloneNode(true);
        photoNode.querySelector('img').src = photosArray[i].url;
        photoNode.querySelector('.picture-likes').textContent = photosArray[i].likes;
        photoNode.querySelector('.picture-comments').innerHTML = photosArray[i].comments.join('<br/>');
        photosFragment.appendChild(photoNode);
    }
    document.querySelector('.pictures').appendChild(photosFragment);
    showBigPhoto(photosArray[0]);
};
var showBigPhoto = function (photoElement) {
    var bigPhotoOverlay = document.querySelector('.gallery-overlay');
    bigPhotoOverlay.querySelector('img').src = photoElement.url;
    bigPhotoOverlay.querySelector('.likes-count').textContent = photoElement.likes;
    bigPhotoOverlay.querySelector('.comments-count').textContent = photoElement.comments.length.toString();
    bigPhotoOverlay.classList.remove('hidden');
};

renderPhotosFragment(generatePhotosArray(NUMBER_OF_PHOTOS));
