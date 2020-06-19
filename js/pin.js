'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

  var similarAdvertisementTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderMapPin = function (advertisementItem) {
    var advertisement = similarAdvertisementTemplate.cloneNode(true);

    advertisement.style = 'left:' + (advertisementItem.location.x - PIN_WIDTH / 2) + 'px; top: ' + (advertisementItem.location.y - PIN_HEIGHT) + 'px';
    advertisement.querySelector('img').src = advertisementItem.author.avatar;
    advertisement.querySelector('img').alt = advertisementItem.title;

    var mapPinClickHandler = function () {
      var mapCardRemovable = document.querySelector('.map__card');
      if (mapCardRemovable) {
        mapCardRemovable.remove();
      }
      window.map.publicCardOnMap(advertisementItem);
    };

    advertisement.addEventListener('click', mapPinClickHandler);
    return advertisement;
  };

  window.pin = {
    renderMapPin: renderMapPin
  };
})();
