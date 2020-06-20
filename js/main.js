'use strict';

(function () {

  var MAIN_PIN_WIDTH = 65;
  var MAIN_PIN_HEIGHT = 65;
  var MAIN_ARROW_HEIGHT = 18;

  var HALF_MAIN_PIN_WIDTH = MAIN_PIN_WIDTH / 2;

  var isActive = false;

  var setDisabledForAll = function (array, disabled) {
    for (var i = 0; i < array.length; i++) {
      array[i].disabled = disabled;
    }
  };

  var setActivityStatusForm = function () {
    var adForm = document.querySelector('.ad-form');
    adForm.classList.add('ad-form--disabled');
    var childrenAdForm = adForm.children;
    setDisabledForAll(childrenAdForm, !isActive);

    if (isActive) {
      adForm.classList.remove('ad-form--disabled');
      window.form.addFormListeners();
    } else {
      window.form.removeFormListeners();
    }
  };

  var setActivityStatusMapFiltres = function () {
    var childrenMapFiltres = document.querySelector('.map__filters').children;
    setDisabledForAll(childrenMapFiltres, !isActive);
  };

  var map = document.querySelector('.map');

  var setActivityStatusMap = function () {
    map.classList.add('map--faded');
    window.map.removeCardOnMap();
    if (isActive) {
      map.classList.remove('map--faded');
      window.map.publicAdvertisementsOnMap();
    } else {
      window.map.removeAdvertisementsOnMap();
    }
  };

  var setActivityStatus = function () {
    setActivityStatusForm();
    setActivityStatusMapFiltres();
    setActivityStatusMap();
  };

  var mapPin = document.querySelector('.map__pin--main');

  var mainMapPinRemoveListener = function () {
    mapPin.removeEventListener('keydown', mainMapPinEnterHandler);
    mapPin.removeEventListener('mousedown', mainMapPinLeftKeyDownMouseHandler);
  };

  setActivityStatus();

  var setAddress = function (coordinateX, coordinateY) {
    var addressInput = document.querySelector('#address');
    addressInput.value = Math.round(coordinateX) + ' , ' + Math.round(coordinateY);
  };

  setAddress(mapPin.offsetLeft + MAIN_PIN_WIDTH / 2, mapPin.offsetTop + MAIN_PIN_HEIGHT / 2);

  var mainMapPinEnterHandler = function (evt) {
    if (evt.key === 'Enter') {
      setActivityStatus();
      setAddress(mapPin.offsetLeft + MAIN_PIN_WIDTH / 2, mapPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_ARROW_HEIGHT);
    }
  };

  var mainMapPinLeftKeyDownMouseHandler = function (evt) {
    evt.preventDefault();
    if (evt.button === 0) {

      if (!isActive) {
        isActive = true;
        setActivityStatus();
      }

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mainMapPinLeftKeyMoveMouseHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var mapPinPosition = {
          x: mapPin.offsetLeft - shift.x,
          y: mapPin.offsetTop - shift.y
        };

        var limit = {
          TOP: window.data.BLOCK_COORDINATE_Y - mapPin.offsetHeight - MAIN_ARROW_HEIGHT,
          BOTTOM: window.data.BLOCK_HEIGHT + MAIN_ARROW_HEIGHT,
          LEFT: -HALF_MAIN_PIN_WIDTH,
          RIGHT: window.data.blockWidth - mapPin.offsetWidth + HALF_MAIN_PIN_WIDTH
        };

        if (mapPinPosition.x > limit.LEFT && mapPinPosition.x < limit.RIGHT) {
          mapPin.style.left = mapPinPosition.x + 'px';
        }
        if (mapPinPosition.y > limit.TOP && mapPinPosition.y < limit.BOTTOM) {
          mapPin.style.top = mapPinPosition.y + 'px';
        }

        setAddress(mapPin.offsetLeft + MAIN_PIN_WIDTH / 2, mapPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_ARROW_HEIGHT);
      };

      var mainMapPinLeftKeyUpMouseHandler = function (upEvt) {
        upEvt.preventDefault();

        setAddress(mapPin.offsetLeft + MAIN_PIN_WIDTH / 2, mapPin.offsetTop + MAIN_PIN_HEIGHT + MAIN_ARROW_HEIGHT);

        document.removeEventListener('mousemove', mainMapPinLeftKeyMoveMouseHandler);
        document.removeEventListener('mouseup', mainMapPinLeftKeyUpMouseHandler);
      };

      document.addEventListener('mousemove', mainMapPinLeftKeyMoveMouseHandler);
      document.addEventListener('mouseup', mainMapPinLeftKeyUpMouseHandler);
    }
  };

  mapPin.addEventListener('keydown', mainMapPinEnterHandler);
  mapPin.addEventListener('mousedown', mainMapPinLeftKeyDownMouseHandler);

  window.main = {
    mainMapPinRemoveListener: mainMapPinRemoveListener,
    isActive: isActive,
    setActivityStatus: setActivityStatus
  };
})();
