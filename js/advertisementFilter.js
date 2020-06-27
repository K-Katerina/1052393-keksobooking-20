'use strict';

(function () {

  var MAX_NUMBER_OF_ADVERTISEMENT_ON_MAP = 5;

  var type = document.querySelector('#housing-type');
  var rooms = document.querySelector('#housing-rooms');
  var guests = document.querySelector('#housing-guests');
  // var price = document.querySelector('#housing-price');

  var filter = function (data) {
    return data.filter(function (it) {
      return (it.offer.type === type.value || type.value === 'any') &&
        (it.offer.rooms.toString() === rooms.value || rooms.value === 'any') &&
        (it.offer.guests.toString() === guests.value || guests.value === 'any');
    }).slice(0, MAX_NUMBER_OF_ADVERTISEMENT_ON_MAP);
  };

  window.advertisementFilter = {
    filter: filter
  };
})();
