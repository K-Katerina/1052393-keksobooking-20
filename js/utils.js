'use strict';

(function () {

  var ONE_GUEST = 1;
  var TWO_GUESTS = 2;
  var THREE_GUESTS = 3;
  var NO_GUESTS = 0;
  var ONE_ROOM = 1;
  var TWO_ROOMS = 2;
  var THREE_ROOMS = 3;
  var HUNDRED_ROOMS = 100;
  var NUMBER_OF_PINS = 8;

  var dictionaryCapacities = [
    {
      id: NO_GUESTS,
      text: 'не для гостей'
    },
    {
      id: ONE_GUEST,
      text: 'для 1 гостя'
    },
    {
      id: TWO_GUESTS,
      text: 'для 2 гостей'
    },
    {
      id: THREE_GUESTS,
      text: 'для 3 гостей'
    }
  ];

  var mapRooms = {};
  mapRooms[ONE_ROOM] = [dictionaryCapacities[ONE_GUEST]];
  mapRooms[TWO_ROOMS] = [dictionaryCapacities[TWO_GUESTS], dictionaryCapacities[ONE_GUEST]];
  mapRooms[THREE_ROOMS] = [dictionaryCapacities[THREE_GUESTS], dictionaryCapacities[TWO_GUESTS], dictionaryCapacities[ONE_GUEST]];
  mapRooms[HUNDRED_ROOMS] = [dictionaryCapacities[NO_GUESTS]];

  var translationToRu = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало',
    'wifi': 'Wi-Fi',
    'dishwasher': 'Посудомоечная машина',
    'parking': 'Парковка',
    'washer': 'Стиральная машина',
    'elevator': 'Лифт',
    'conditioner': 'Кондиционер'
  };

  var getRandomNumberOfRange = function (a, b) {
    return Math.round(a + Math.random() * (b - a));
  };

  var getRandomArray = function (array) {
    return shuffle(array).slice(0, getRandomNumberOfRange(0, array.length));
  };

  var randomNumber = getRandomNumberOfRange(1, NUMBER_OF_PINS);

  var shuffle = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var buffer = array[i];
      array[i] = array[j];
      array[j] = buffer;
    }
    return array;
  };

  var getWordForm = function (n, array) {
    var modN = n % 10;
    if (n > 10 && n < 21) {
      return n + ' ' + array[2];
    } else if (modN > 1 && modN < 5) {
      return n + ' ' + array[1];
    } else if (modN === 1) {
      return n + ' ' + array[0];
    } else {
      return n + ' ' + array[2];
    }
  };

  var arrayToString = function (array) {
    var stringOfArray = '';
    for (var i = 0; i < array.length; i++) {
      stringOfArray += translationToRu[array[i]];
      stringOfArray += (i === array.length - 1) ? '. ' : ', ';
    }
    return stringOfArray;
  };

  window.utils = {
    mapRooms: mapRooms,
    translationToRu: translationToRu,
    getRandomNumberOfRange: getRandomNumberOfRange,
    getRandomArray: getRandomArray,
    randomNumber: randomNumber,
    shuffle: shuffle,
    getWordForm: getWordForm,
    arrayToString: arrayToString,
    NUMBER_OF_PINS: NUMBER_OF_PINS
  };
})();
