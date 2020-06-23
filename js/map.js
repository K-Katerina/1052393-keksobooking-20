'use strict';

(function () {

  var BLOCK_COORDINATE_Y = 130;
  var BLOCK_HEIGHT = 500;
  var RADIX = 10;
  var TIMEOUT = 3000;

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
    publicAdvertisementsOnMap();
  };

  var advertisementList = [];

  var loadData = function () {
    window.server.get(onSuccessLoad, onErrorLoad);
  };

  var publicAdvertisementsOnMap = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertisementList.length; i++) {
      if (advertisementList[i].offer) {
        fragment.appendChild(window.pin.renderMapPin(advertisementList[i]));
      }
    }
    similarListElement.appendChild(fragment);
  };

  var removeAdvertisementsOnMap = function () {
    advertisementList = [];
    var childrenList = similarListElement.querySelectorAll('button[type=button]');
    for (var i = 0; i < childrenList.length; i++) {
      childrenList[i].remove();
    }
  };

  var map = document.querySelector('.map');

  var publicCardOnMap = function (cardItem) {
    var card = window.card.renderCard(cardItem);
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
      document.querySelector('.map__pin--active').classList.remove('map__pin--active');
    };
  };

  var removeCardOnMap = function () {
    if (map.querySelector('.popup')) {
      map.querySelector('.popup').remove();
    }
  };

  window.map = {
    BLOCK_COORDINATE_Y: BLOCK_COORDINATE_Y,
    BLOCK_HEIGHT: BLOCK_HEIGHT,
    blockWidth: blockWidth,
    loadData: loadData,
    publicAdvertisementsOnMap: publicAdvertisementsOnMap,
    removeAdvertisementsOnMap: removeAdvertisementsOnMap,
    publicCardOnMap: publicCardOnMap,
    removeCardOnMap: removeCardOnMap
  };
})();
