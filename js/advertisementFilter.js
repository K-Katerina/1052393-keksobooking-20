'use strict';

(function () {

  var MAX_NUMBER_OF_ADVERTISEMENT_ON_MAP = 5;
  var ANY_VALUE = 'any';

  var MIDDLE_PRICE = {
    name: 'middle',
    min: 10000,
    max: 50000
  };

  var LOW_PRICE = {
    name: 'low',
    max: 10000
  };

  var HIGH_PRICE = {
    name: 'high',
    min: 50000
  };

  var type = document.querySelector('#housing-type');
  var rooms = document.querySelector('#housing-rooms');
  var guests = document.querySelector('#housing-guests');
  var price = document.querySelector('#housing-price');

  var priceValue = function (value) {
    if (price.value === MIDDLE_PRICE.name) {
      return value >= MIDDLE_PRICE.min && value <= MIDDLE_PRICE.max;
    } else if (price.value === LOW_PRICE.name) {
      return value <= LOW_PRICE.max;
    } else if (price.value === HIGH_PRICE.name) {
      return value >= HIGH_PRICE.min;
    }
    return true;
  };

  var features = document.querySelector('#housing-features');

  var filterByFeatures = function (currentAdvertisement, checkedFeaturesItems) {
    return checkedFeaturesItems.every(function (item) {
      return currentAdvertisement.offer.features.indexOf(item.value) !== -1;
    });
  };

  var filter = function (data) {
    var checkedFeaturesItems = Array.from(features.querySelectorAll('input:checked'));
    return data.filter(function (it) {
      return (it.offer.type === type.value || type.value === ANY_VALUE) &&
        (it.offer.rooms.toString() === rooms.value || rooms.value === ANY_VALUE) &&
        (it.offer.guests.toString() === guests.value || guests.value === ANY_VALUE) &&
        filterByFeatures(it, checkedFeaturesItems) &&
        priceValue(it.offer.price);
    }).slice(0, MAX_NUMBER_OF_ADVERTISEMENT_ON_MAP);
  };

  window.advertisementFilter = {
    filter: filter
  };
})();
