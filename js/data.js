'use strict';

(function () {

  var PHOTO_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var CHECK_TIME_LIST = ['12:00', '13:00', '14:00'];
  var FEATURE_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var BLOCK_COORDINATE_Y = 130;
  var BLOCK_HEIGHT = 500;
  var RADIX = 10;

  var BUILDING_MAP = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var mapPins = document.querySelector('.map__pins');

  var getBlockWidth = function () {
    return Number.parseInt(getComputedStyle(mapPins).width, RADIX);
  };

  var blockWidth = getBlockWidth();

  var getAvatar = function (i) {
    return 'img/avatars/user0' + (i + 1) + '.png';
  };

  var createAdvertisement = function (i) {
    var location = {
      x: window.utils.getRandomNumberOfRange(0, blockWidth),
      y: BLOCK_COORDINATE_Y + window.utils.getRandomNumberOfRange(0, BLOCK_HEIGHT),
    };
    var types = Object.keys(BUILDING_MAP);

    return {
      author: {
        avatar: getAvatar((i + window.utils.randomNumber) % window.utils.NUMBER_OF_PINS)
      },
      offer: {
        title: 'Объявление №' + (i + 1),
        address: location.x + ', ' + location.y,
        price: window.utils.getRandomNumberOfRange(100, 1000),
        type: types[window.utils.getRandomNumberOfRange(0, types.length - 1)],
        rooms: window.utils.getRandomNumberOfRange(1, 10),
        guests: window.utils.getRandomNumberOfRange(1, 10),
        checkin: CHECK_TIME_LIST[window.utils.getRandomNumberOfRange(0, CHECK_TIME_LIST.length - 1)],
        checkout: CHECK_TIME_LIST[window.utils.getRandomNumberOfRange(0, CHECK_TIME_LIST.length - 1)],
        features: window.utils.getRandomArray(FEATURE_LIST),
        description: 'Описание объявления №' + (i + 1),
        photos: window.utils.getRandomArray(PHOTO_LIST)
      },
      location: location
    };
  };

  var getAdvertisementList = function () {
    var advertisementList = [];
    for (var i = 0; i < window.utils.NUMBER_OF_PINS; i++) {
      advertisementList.push(createAdvertisement(i));
    }
    return advertisementList;
  };

  window.data = {
    BUILDING_MAP: BUILDING_MAP,
    getAdvertisementList: getAdvertisementList,
    blockWidth: blockWidth,
    BLOCK_COORDINATE_Y: BLOCK_COORDINATE_Y,
    BLOCK_HEIGHT: BLOCK_HEIGHT
  };
})();
