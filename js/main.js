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
  card.querySelector('.popup__text--capacity').textContent = cardItem.offer.rooms + ' комнаты для ' + cardItem.offer.guests + ' гостей';
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
