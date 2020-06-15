'use strict';

var PHOTO_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var BUILDING_TYPE_LIST = ['palace', 'flat', 'house', 'bungalo'];
var CHECK_TIME_LIST = ['12:00', '13:00', '14:00'];
var FEATURE_LIST = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var BLOCK_COORDINATE_Y = 130;
var BLOCK_HEIGHT = 500;
var NUMBER_OF_PINS = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var MAIN_PIN_WIDTH = 65;
var MAIN_PIN_HEIGHT = 65;
var MAIN_ARROW_HEIGHT = 18;

var getRandomNumberOfRange = function (a, b) {
  return Math.round(a + Math.random() * (b - a));
};

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

var randomNumber = getRandomNumberOfRange(1, NUMBER_OF_PINS);

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

var createAdvertisement = function (i) {
  var location = {
    x: getRandomNumberOfRange(getBlockCoordinateX(), getBlockCoordinateX() + getBlockWidth()),
    y: getRandomNumberOfRange(BLOCK_COORDINATE_Y, BLOCK_COORDINATE_Y + BLOCK_HEIGHT),
  };
  return {
    author: {
      avatar: getAvatar((i + randomNumber) % NUMBER_OF_PINS)
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
  for (var i = 0; i < NUMBER_OF_PINS; i++) {
    advertisementList.push(createAdvertisement(i));
  }
  return advertisementList;
};

// Добавление меток на карту
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
for (var j = 0; j < advertisementList.length; j++) {
  fragment.appendChild(renderAdvertisement(advertisementList[j]));
}

var similarListElement = document.querySelector('.map__pins');
similarListElement.appendChild(fragment);

// Добавление данных в каточки объявлений
var similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

var getFeaturesToString = function (array) {
  var stringOfArray = '';
  for (var i = 0; i < array.length; i++) {
    stringOfArray += translationToRu[array[i]];
    stringOfArray += (i === array.length - 1) ? '. ' : ', ';
  }
  return stringOfArray;
};

var createPhotosFragment = function (array) {
  var photosFragment = document.createDocumentFragment();
  var popupPhoto = similarCardTemplate.querySelector('.popup__photo');
  for (var i = 0; i < array.length; i++) {
    var element = popupPhoto.cloneNode(true);
    element.src = array[i];
    photosFragment.appendChild(element);
  }
  return photosFragment;
};

var renderCard = function (cardItem) {
  var card = similarCardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = cardItem.offer.title;
  card.querySelector('.popup__text--address').textContent = cardItem.offer.address;
  card.querySelector('.popup__text--price').textContent = cardItem.offer.price + '₽/ночь';
  card.querySelector('.popup__type').textContent = translationToRu[cardItem.offer.type];
  card.querySelector('.popup__text--capacity').textContent = getWordForm(cardItem.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + getWordForm(cardItem.offer.guests, ['гостя', 'гостей', 'гостей']);
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardItem.offer.checkin + ', выезд до ' + cardItem.offer.checkout;
  card.querySelector('.popup__features').textContent = getFeaturesToString(cardItem.offer.features);
  card.querySelector('.popup__description').textContent = cardItem.offer.description;
  card.querySelector('.popup__photos').appendChild(createPhotosFragment(cardItem.offer.photos));
  card.querySelector('.popup__photos').removeChild(card.querySelector('.popup__photos').children[0]);
  card.querySelector('.popup__avatar').src = cardItem.author.avatar;
  return card;
};

var cardItem = advertisementList[0];
document.querySelector('.map').insertBefore(renderCard(cardItem), document.querySelector('.map__filters-container'));

//  [Дез]активация форм ввода

var setDisabledForAll = function (array, disabled) {
  for (var i = 0; i < array.length; i++) {
    array[i].disabled = disabled;
  }
};

var setActivityStatusAdForm = function (active) {
  var adForm = document.querySelector('.ad-form');
  adForm.classList.add('ad-form--disabled');
  if (active) {
    adForm.classList.remove('ad-form--disabled');
  }
  var childrenAdForm = adForm.children;
  setDisabledForAll(childrenAdForm, !active);
};

var setActivityStatusAdMapFiltres = function (active) {
  var childrenMapFiltres = document.querySelector('.map__filters').children;
  setDisabledForAll(childrenMapFiltres, !active);
};

var setActivityStatus = function (active) {
  setActivityStatusAdForm(active);
  setActivityStatusAdMapFiltres(active);
};

var setAddress = function (coordinateX, coordinateY) {
  var address = document.querySelector('#address');
  address.value = coordinateX + ' , ' + coordinateY;
};

setActivityStatus(false);

var mapPin = document.querySelector('.map__pin--main');
setAddress(mapPin.offsetLeft + MAIN_PIN_WIDTH / 2, mapPin.offsetTop + MAIN_PIN_HEIGHT / 2);

mapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    setActivityStatus(true);
    setAddress(mapPin.offsetLeft + MAIN_PIN_WIDTH / 2, mapPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_ARROW_HEIGHT);
  }
});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    setActivityStatus(true);
    setAddress(mapPin.offsetLeft + MAIN_PIN_WIDTH / 2, mapPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_ARROW_HEIGHT);
  }
});

// Обработка селекторов для квартир и гостей

var dictionaryCapacities = [
  {
    id: 1,
    text: 'для 1 гостя'
  },
  {
    id: 2,
    text: 'для 2 гостей'
  },
  {
    id: 3,
    text: 'для 3 гостей'
  },
  {
    id: 0,
    text: 'не для гостей'
  }
];

var mapRooms = {
  1: [dictionaryCapacities[0]],
  2: [dictionaryCapacities[1], dictionaryCapacities[0]],
  3: [dictionaryCapacities[2], dictionaryCapacities[1], dictionaryCapacities[0]],
  100: [dictionaryCapacities[3]]
};

var roomSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');


var changeHandler = function (evt) {
  fillCapasity(evt.target.value);
  capacitySelect.value = null;
};

var fillRoomsAndCapacities = function () {
  var optionForRoomSelect = '';
  for (var room in mapRooms) {
    if (mapRooms.hasOwnProperty(room)) {
      optionForRoomSelect += '<option value="' + room + '">' + getWordForm(room, ['комната', 'комнаты', 'комнат']) + '</option>';
    }
  }
  roomSelect.innerHTML = optionForRoomSelect;
  roomSelect.addEventListener('change', changeHandler);
};

var fillCapasity = function (room) {
  var capacities = mapRooms[room];
  var optionForCapacitySelect = '';
  for (var i = 0; i < capacities.length; i++) {
    optionForCapacitySelect += '<option value="' + capacities[i].id + '">' + capacities[i].text + '</option>';
  }
  capacitySelect.innerHTML = optionForCapacitySelect;
};

fillRoomsAndCapacities();
fillCapasity(document.querySelector('#room_number option').value);

capacitySelect.addEventListener('invalid', function () {
  if (capacitySelect.validity.valueMissing) {
    capacitySelect.setCustomValidity('Обязательное поле');
  } else {
    capacitySelect.setCustomValidity('');
  }
});
