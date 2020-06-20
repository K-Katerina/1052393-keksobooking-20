'use strict';

(function () {

  var DEFAULT_MIN_PRICE = 1000;
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE = 1000000;

  var adForm = document.querySelector('.ad-form');
  var roomSelect = adForm.querySelector('#room_number');
  var capacitySelect = adForm.querySelector('#capacity');
  var titleInput = adForm.querySelector('#title');
  var priceInput = adForm.querySelector('#price');
  var typeInput = adForm.querySelector('#type');
  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');
  var avatarChooser = document.querySelector('#avatar');
  var imageChooser = document.querySelector('#images');
  var submitBtn = document.querySelector('.ad-form__submit');

  priceInput.value = DEFAULT_MIN_PRICE;

  var fillCapacity = function (room) {
    var capacities = window.utils.mapRooms[room];
    var optionForCapacitySelect = '';
    for (var i = 0; i < capacities.length; i++) {
      optionForCapacitySelect += '<option value="' + capacities[i].id + '">' + capacities[i].text + '</option>';
    }
    capacitySelect.innerHTML = optionForCapacitySelect;
  };

  var roomChangeHandler = function (evt) {
    fillCapacity(evt.target.value);
    // capacitySelect.value = null;
  };

  var fillRoomsAndCapacities = function () {
    var optionForRoomSelect = '';
    for (var room in window.utils.mapRooms) {
      if (window.utils.mapRooms.hasOwnProperty(room)) {
        optionForRoomSelect += '<option value="' + room + '">' + window.utils.getWordForm(room, ['комната', 'комнаты', 'комнат']) + '</option>';
      }
    }
    roomSelect.innerHTML = optionForRoomSelect;
  };

  fillRoomsAndCapacities();
  fillCapacity(document.querySelector('#room_number option').value);

  var capacityInvalidHandler = function () {
    if (capacitySelect.validity.valueMissing) {
      capacitySelect.setCustomValidity('Обязательное поле');
    } else {
      capacitySelect.setCustomValidity('');
    }
  };

  var titleChangeHandler = function () {
    var valueLength = titleInput.value.length;
    if (valueLength < MIN_TITLE_LENGTH) {
      titleInput.setCustomValidity('Минимальное количество символов - ' + MIN_TITLE_LENGTH);
    } else if (valueLength > MAX_TITLE_LENGTH) {
      titleInput.setCustomValidity('Максимальное количество символов - ' + MAX_TITLE_LENGTH);
    } else {
      titleInput.setCustomValidity('');
    }
  };

  var priceChangeHandler = function () {
    var value = priceInput.value;
    priceInput.min = getMinPrice(typeInput.value);
    if (value > MAX_PRICE) {
      priceInput.setCustomValidity('Максимальная цена за ночь - ' + MAX_PRICE);
    } else if (value < priceInput.min) {
      priceInput.setCustomValidity('Минимальная цена за ночь для типа "' + window.utils.translationToRu[typeInput.value] + '" - ' + priceInput.min);
    } else {
      priceInput.setCustomValidity('');
    }
  };

  var getMinPrice = function (value) {
    return window.data.BUILDING_MAP[value];
  };

  var typeChangeHandler = function () {
    var minPrice = getMinPrice(typeInput.value);
    priceInput.value = '';
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
    window.main.mainMapPinRemoveListener();
    window.main.isActive = false;
    window.main.setActivityStatus();
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
    roomSelect.addEventListener('change', roomChangeHandler);
    capacitySelect.addEventListener('invalid', capacityInvalidHandler);
  };

  var removeFormListeners = function () {
    capacitySelect.removeEventListener('invalid', capacityInvalidHandler);
    roomSelect.removeEventListener('change', roomChangeHandler);
    titleInput.removeEventListener('change', titleChangeHandler);
    priceInput.removeEventListener('change', priceChangeHandler);
    typeInput.removeEventListener('change', typeChangeHandler);
    timeInInput.removeEventListener('change', timeInChangeHandler);
    timeOutInput.removeEventListener('change', timeOutChangeHandler);
    avatarChooser.removeEventListener('change', avatarChangeHandler);
    imageChooser.removeEventListener('change', imageChangeHandler);
    submitBtn.removeEventListener('click', btnSubmitHandler);
  };

  window.form = {
    addFormListeners: addFormListeners,
    removeFormListeners: removeFormListeners
  };
})();
