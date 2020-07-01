'use strict';

(function () {

  var BLOCK_COORDINATE_Y = 130;
  var BLOCK_HEIGHT = 500;
  var RADIX = 10;
  var TIMEOUT = 3000;

  var ESC_NUM = 'Escape';

  var advertisementList = [];

  var similarListElement = document.querySelector('.map__pins');
  var getBlockWidth = function () {
    return Number.parseInt(getComputedStyle(similarListElement).width, RADIX);
  };

  var blockWidth = getBlockWidth();

  var onErrorLoad = function (message) {
    var divError = document.createElement('div');
    divError.textContent = 'Произошла ошибка. ' + message;
    map.insertAdjacentElement('afterbegin', divError);
    setTimeout(function () {
      divError.remove();
    }, TIMEOUT);
  };

  var onSuccessLoad = function (data) {
    advertisementList = data;
    publicAdvertisementsOnMap(window.advertisementFilter.filter(data.slice(0, data.length)));
    window.main.setActivityStatusMapFilters();
  };

  var loadData = function () {
    window.server.get(onSuccessLoad, onErrorLoad);
  };

  var map = document.querySelector('.map');

  var publicCardOnMap = function (cardItem) {
    var card = window.card.renderCard(cardItem);
    map.insertBefore(card, document.querySelector('.map__filters-container'));

    var closeBtnClickHandler = function () {
      closeCard();
    };

    var escDownHandler = function (evt) {
      if (evt.key === ESC_NUM) {
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
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    };
  };

  var removeCardOnMap = function () {
    if (map.querySelector('.popup')) {
      map.querySelector('.popup').remove();
    }
  };

  var publicAdvertisementsOnMap = function (advertisements) {
    removeAdvertisementsOnMap();
    removeCardOnMap();
    var fragment = document.createDocumentFragment();
    advertisements.forEach(function (advertisement) {
      if (advertisement.offer) {
        fragment.appendChild(window.pin.renderMapPin(advertisement));
      }
    });
    similarListElement.appendChild(fragment);
  };

  var removeAdvertisementsOnMap = function () {
    var childrenList = similarListElement.querySelectorAll('button[type=button]');
    childrenList.forEach(function (item) {
      item.remove();
    });
  };

  var filterForm = document.querySelector('.map__filters');
  var debouncePublicAdvertisementsOnMap = window.utils.debounce(publicAdvertisementsOnMap);

  var filterFormChangeHandler = function () {
    debouncePublicAdvertisementsOnMap(window.advertisementFilter.filter(advertisementList));
  };

  var addEventListenersFilter = function () {
    filterForm.addEventListener('change', filterFormChangeHandler);
  };

  var removeEventListenersFilter = function () {
    filterForm.reset();
    filterForm.removeEventListener('change', filterFormChangeHandler);
  };

  window.map = {
    BLOCK_COORDINATE_Y: BLOCK_COORDINATE_Y,
    BLOCK_HEIGHT: BLOCK_HEIGHT,
    blockWidth: blockWidth,
    loadData: loadData,
    addEventListenersFilter: addEventListenersFilter,
    removeEventListenersFilter: removeEventListenersFilter,
    removeAdvertisementsOnMap: removeAdvertisementsOnMap,
    publicCardOnMap: publicCardOnMap,
    removeCardOnMap: removeCardOnMap
  };
})();
