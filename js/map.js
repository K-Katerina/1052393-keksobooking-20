'use strict';

(function () {

  var similarListElement = document.querySelector('.map__pins');
  var advertisementList = [];

  var publicAdvertisementsOnMap = function () {
    advertisementList = window.data.getAdvertisementList();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < advertisementList.length; i++) {
      fragment.appendChild(window.pin.renderMapPin(advertisementList[i]));
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
    };
  };

  var removeCardOnMap = function () {
    if (map.querySelector('.popup')) {
      map.querySelector('.popup').remove();
    }
  };

  window.map = {
    publicAdvertisementsOnMap: publicAdvertisementsOnMap,
    removeAdvertisementsOnMap: removeAdvertisementsOnMap,
    publicCardOnMap: publicCardOnMap,
    removeCardOnMap: removeCardOnMap
  };
})();
