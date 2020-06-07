'use strict';

var PHOTO_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var BUILDING_TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME_LIST = ['12:00', '13:00', '14:00'];
var FEATURE_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var BLOCK_COORDINATE_Y = 130;
var BLOCK_HEIGHT = 500;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

var getRandomNumberOfRange = function (a, b) {
  return Math.round(a + Math.random() * (b - a));
};

var getBlockCoordinateX = function () {
  return 30; // TODO: getBlockCoordinateX
};

var getBlockWidth = function () {
  return 800; // TODO: getBlockWidth
};

var getAvatar = function (i) {
  return 'img/avatars/user0' + (i + 1) + '.png';
};

var shuffle = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var buffer = array[i];
    array[i] = array[j];
    array[j] = buffer;
  }
  return array;
};

var getRandomArray = function (array) {
  return shuffle(array).slice(0, getRandomNumberOfRange(0, array.length));
};

var createAdvertisement = function (i) {
  var location = {
    x: getRandomNumberOfRange(getBlockCoordinateX(), getBlockCoordinateX() + getBlockWidth()),
    y: getRandomNumberOfRange(BLOCK_COORDINATE_Y, BLOCK_COORDINATE_Y + BLOCK_HEIGHT),
  };
  return {
    author: {
      avatar: getAvatar(i)
    },
    offer: {
      title: 'Объявление №' + (i + 1),
      address: location.x + ', ' + location.y,
      price: getRandomNumberOfRange(100, 1000),
      type: BUILDING_TYPE_LIST[getRandomNumberOfRange(0, BUILDING_TYPE_LIST.length - 1)],
      rooms: getRandomNumberOfRange(1, 10),
      guests: getRandomNumberOfRange(1, 10),
      checkin: CHECK_TIME_LIST[getRandomNumberOfRange(0, CHECK_TIME_LIST.length - 1)],
      checkout: CHECK_TIME_LIST[getRandomNumberOfRange(0, CHECK_TIME_LIST.length - 1)],
      features: getRandomArray(FEATURE_LIST),
      description: 'Описание объявления №' + (i + 1),
      photos: getRandomArray(PHOTO_LIST)
    },
    location: location
  };
};

var getAdvertisementList = function () {
  var advertisementList = [];
  for (var i = 0; i < 8; i++) {
    advertisementList.push(createAdvertisement(i));
  }
  return advertisementList;
};

var similarAdvertisementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderAdvertisement = function (advertisementItem) {
  var advertisement = similarAdvertisementTemplate.cloneNode(true);

  advertisement.style = 'left:' + (advertisementItem.location.x - PIN_WIDTH / 2) + 'px; top: ' + (advertisementItem.location.y - PIN_HEIGHT) + 'px';
  advertisement.querySelector('img').src = advertisementItem.author.avatar;
  advertisement.querySelector('img').alt = advertisementItem.title;

  return advertisement;
};

var advertisementList = getAdvertisementList();

var fragment = document.createDocumentFragment();
for (var i = 0; i < advertisementList.length; i++) {
  fragment.appendChild(renderAdvertisement(advertisementList[i]));
}

var similarListElement = document.querySelector('.map__pins');
similarListElement.appendChild(fragment);
