'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_ARROW_HEIGHT = 18;

  var setDisabledForAll = function (array, disabled) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = disabled;
    }
  };

  var setActivityStatusForm = function (active) {
    var adForm = document.querySelector('.ad-form');
    adForm.classList.add('ad-form--disabled');
    var childrenAdForm = adForm.children;
    setDisabledForAll(childrenAdForm, !active);

    if (active) {
      adForm.classList.remove('ad-form--disabled');
      window.form.addFormListeners();
    } else {
      window.form.removeFormListeners();
    }
  };

  var setActivityStatusMapFiltres = function (active) {
    var childrenMapFiltres = document.querySelector('.map__filters').children;
    setDisabledForAll(childrenMapFiltres, !active);
  };

  var map = document.querySelector('.map');

  var setActivityStatusMap = function (active) {
    map.classList.add('map--faded');
    window.map.removeAdvertisementsOnMap();
    window.map.removeCardOnMap();
    if (active) {
      window.map.publicAdvertisementsOnMap();
      map.classList.remove('map--faded');
    }
  };

  var setActivityStatus = function (active) {
    setActivityStatusForm(active);
    setActivityStatusMapFiltres(active);
    setActivityStatusMap(active);
    if (active) {
      mapPin.removeEventListener('click', mainMapPinClickHandler);
    }
  };

  var mapPin = document.querySelector('.map__pin--main');

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

  window.main = {};
})();
