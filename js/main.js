'use strict';

var PHOTO_LIST = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var BUILDING_MAP = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalo': 0
};
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
var ONE_GUEST = 0;
var TWO_GUESTS = 1;
var THREE_GUESTS = 2;
var NO_GUESTS = 3;
var ONE_ROOM = 1;
var TWO_ROOMS = 2;
var THREE_ROOMS = 3;
var HUNDRED_ROOMS = 100;

var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;
var MAX_PRICE = 1000000;

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
  var types = Object.keys(BUILDING_MAP);
  return {
    author: {
      avatar: getAvatar((i + randomNumber) % NUMBER_OF_PINS)
    },
    offer: {
      title: 'Объявление №' + (i + 1),
      address: location.x + ', ' + location.y,
      price: getRandomNumberOfRange(100, 1000),
      type: types[getRandomNumberOfRange(0, types.length - 1)],
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

  var mapPinClickHandler = function () {
    var mapCardRemovable = map.querySelector('.map__card');
    if (mapCardRemovable) {
      mapCardRemovable.remove();
    }
    publicCard(advertisementItem);
  };

  advertisement.addEventListener('click', mapPinClickHandler);
  return advertisement;
};

var similarListElement = document.querySelector('.map__pins');
var advertisementList = [];

var publicAdvertisementsOnMap = function () {
  advertisementList = getAdvertisementList();
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advertisementList.length; i++) {
    fragment.appendChild(renderAdvertisement(advertisementList[i]));
  }
  similarListElement.appendChild(fragment);
};

var removeMapPins = function () {
  advertisementList = [];
  var childrenList = similarListElement.querySelectorAll('button[type=button]');
  for (var i = 0; i < childrenList.length; i++) {
    childrenList[i].remove();
  }
};

// Добавление данных в каточки объявлений

var getFeaturesToString = function (array) {
  var stringOfArray = '';
  for (var i = 0; i < array.length; i++) {
    stringOfArray += translationToRu[array[i]];
    stringOfArray += (i === array.length - 1) ? '. ' : ', ';
  }
  return stringOfArray;
};

var similarCardTemplate = document.querySelector('#card').content.querySelector('.popup');

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

var map = document.querySelector('.map');

var publicCard = function (cardItem) {
  var card = renderCard(cardItem);
  map.insertBefore(card, document.querySelector('.map__filters-container'));

  var closeBtnClickHandler = function () {
    closeCard();
  };

  var escDownHandler = function (evt) {
    if (evt.key === 'Escape') {
      closeCard();
    }
  };

  var closeCardBtn = card.querySelector('.popup__close');
  closeCardBtn.addEventListener('click', closeBtnClickHandler);
  document.addEventListener('keydown', escDownHandler);

  var closeCard = function () {
    card.remove();
    closeCardBtn.removeEventListener('click', closeBtnClickHandler);
    document.removeEventListener('keydown', escDownHandler);
  };
};

var removeCard = function () {
  if (map.querySelector('.popup')) {
    map.querySelector('.popup').remove();
  }
};

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

var setActivityMap = function (active) {
  map.classList.add('map--faded');
  removeMapPins();
  removeCard();
  if (active) {
    publicAdvertisementsOnMap();
    map.classList.remove('map--faded');
  }
};

var setActivityStatus = function (active) {
  setActivityStatusAdForm(active);
  setActivityStatusAdMapFiltres(active);
  setActivityMap(active);
  if (active) {
    mapPin.removeEventListener('click', mainMapPinClickHandler);
  }
};

var mapPin = similarListElement.querySelector('.map__pin--main');

setActivityStatus(false);

var setAddress = function (coordinateX, coordinateY) {
  var addressInput = document.querySelector('#address');
  addressInput.value = coordinateX + ' , ' + coordinateY;
};

setAddress(mapPin.offsetLeft + MAIN_PIN_WIDTH / 2, mapPin.offsetTop + MAIN_PIN_HEIGHT / 2);

var mainMapPinClickHandler = function () {
  setActivityStatus(true);
  setAddress(mapPin.offsetLeft + MAIN_PIN_WIDTH / 2, mapPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_ARROW_HEIGHT);

};

mapPin.addEventListener('click', mainMapPinClickHandler);

// Обработка селекторов для квартир и гостей

var dictionaryCapacities = [
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
  },
  {
    id: NO_GUESTS,
    text: 'не для гостей'
  }
];

var mapRooms = {};
mapRooms[ONE_ROOM] = [dictionaryCapacities[ONE_GUEST]];
mapRooms[TWO_ROOMS] = [dictionaryCapacities[TWO_GUESTS], dictionaryCapacities[ONE_GUEST]];
mapRooms[THREE_ROOMS] = [dictionaryCapacities[THREE_GUESTS], dictionaryCapacities[TWO_GUESTS], dictionaryCapacities[ONE_GUEST]];
mapRooms[HUNDRED_ROOMS] = [dictionaryCapacities[NO_GUESTS]];

var roomSelect = document.querySelector('#room_number');
var capacitySelect = document.querySelector('#capacity');

var changeHandler = function (evt) {
  fillCapacity(evt.target.value);
  // capacitySelect.value = null;
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

var fillCapacity = function (room) {
  var capacities = mapRooms[room];
  var optionForCapacitySelect = '';
  for (var i = 0; i < capacities.length; i++) {
    optionForCapacitySelect += '<option value="' + capacities[i].id + '">' + capacities[i].text + '</option>';
  }
  capacitySelect.innerHTML = optionForCapacitySelect;
};

fillRoomsAndCapacities();
fillCapacity(document.querySelector('#room_number option').value);

capacitySelect.addEventListener('invalid', function () {
  if (capacitySelect.validity.valueMissing) {
    capacitySelect.setCustomValidity('Обязательное поле');
  } else {
    capacitySelect.setCustomValidity('');
  }
});

// Обработка ввода формы

var adForm = document.querySelector('.ad-form');
var titleInput = adForm.querySelector('#title');
var priceInput = adForm.querySelector('#price');
var typeInput = adForm.querySelector('#type');
var timeInInput = adForm.querySelector('#timein');
var timeOutInput = adForm.querySelector('#timeout');
var avatarChooser = document.querySelector('#avatar');
var imageChooser = document.querySelector('#images');
var submitBtn = document.querySelector('.ad-form__submit');

var titleChangeHandler = function () {
  var valueLength = titleInput.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity('Минимальное количество символов - ' + MIN_TITLE_LENGTH);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity('Минимальное количество символов - ' + MAX_TITLE_LENGTH);
  } else {
    titleInput.setCustomValidity('');
  }
};

var priceChangeHandler = function () {
  var value = priceInput.value;
  var minPrice = getMinPrice(typeInput.value);
  priceInput.min = minPrice;
  if (value > MAX_PRICE) {
    priceInput.setCustomValidity('Максимальная цена за ночь - ' + MAX_PRICE);
  } else if (value < priceInput.min) {
    priceInput.setCustomValidity('Минимальная цена за ночь для типа ' + '{{type}}' + ' - ' + priceInput.min);
  } else {
    priceInput.setCustomValidity('');
  }
};

var getMinPrice = function (value) {
  return BUILDING_MAP[value];
};

var typeChangeHandler = function () {
  var minPrice = getMinPrice(typeInput.value);
  priceInput.placeholder = minPrice.toString();
  priceInput.min = minPrice;
};

var timeInChangeHandler = function () {
  if (timeInInput.value !== timeOutInput.value) {
    timeOutInput.value = timeInInput.value;
  }
};

var timeOutChangeHandler = function () {
  if (timeOutInput.value !== timeInInput.value) {
    timeInInput.value = timeOutInput.value;
  }
};

var avatarChangeHandler = function () {
  if (avatarChooser.files[0].type !== 'image/jpeg') {
    avatarChooser.setCustomValidity('Загрузите изображение');
  }
};

var imageChangeHandler = function () {
  if (imageChooser.files[0].type !== 'image/jpeg') {
    imageChooser.setCustomValidity('Загрузите изображение');
  }
};

var btnSubmitHandler = function () {
  event.preventDefault();
  removeFormListeners();
};

var addFormListeners = function () {
  titleInput.addEventListener('change', titleChangeHandler);
  priceInput.addEventListener('change', priceChangeHandler);
  typeInput.addEventListener('change', typeChangeHandler);
  timeInInput.addEventListener('change', timeInChangeHandler);
  timeOutInput.addEventListener('change', timeOutChangeHandler);
  avatarChooser.addEventListener('change', avatarChangeHandler);
  imageChooser.addEventListener('change', imageChangeHandler);
  submitBtn.addEventListener('submit', btnSubmitHandler);
};

var removeFormListeners = function () {
  titleInput.removeEventListener('change', titleChangeHandler);
  priceInput.removeEventListener('change', priceChangeHandler);
  typeInput.removeEventListener('change', typeChangeHandler);
  timeInInput.removeEventListener('change', timeInChangeHandler);
  timeOutInput.removeEventListener('change', timeOutChangeHandler);
  avatarChooser.removeEventListener('change', avatarChangeHandler);
  imageChooser.removeEventListener('change', imageChangeHandler);
  submitBtn.removeEventListener('click', btnSubmitHandler);
};

addFormListeners();
