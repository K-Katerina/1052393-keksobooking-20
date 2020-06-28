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

  var BUILDING_MAP = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var DEBOUNCE_INTERVAL = 500;

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

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    BUILDING_MAP: BUILDING_MAP,
    mapRooms: mapRooms,
    translationToRu: translationToRu,
    debounce: debounce,
    getWordForm: getWordForm,
    arrayToString: arrayToString
  };
})();
