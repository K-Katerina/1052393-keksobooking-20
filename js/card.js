'use strict';

(function () {

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
    card.querySelector('.popup__type').textContent = window.utils.translationToRu[cardItem.offer.type];
    card.querySelector('.popup__text--capacity').textContent = window.utils.getWordForm(cardItem.offer.rooms, ['комната', 'комнаты', 'комнат']) + ' для ' + window.utils.getWordForm(cardItem.offer.guests, ['гостя', 'гостей', 'гостей']);
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardItem.offer.checkin + ', выезд до ' + cardItem.offer.checkout;
    card.querySelector('.popup__features').textContent = window.utils.arrayToString(cardItem.offer.features);
    card.querySelector('.popup__description').textContent = cardItem.offer.description;
    card.querySelector('.popup__photos').appendChild(createPhotosFragment(cardItem.offer.photos));
    card.querySelector('.popup__photos').removeChild(card.querySelector('.popup__photos').children[0]);
    card.querySelector('.popup__avatar').src = cardItem.author.avatar;
    return card;
  };

  window.card = {
    renderCard: renderCard
  };
})();
