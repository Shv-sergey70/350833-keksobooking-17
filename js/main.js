'use strict';

var mapSection = document.querySelector('.map');

var ADVERTS_COUNT = 8;
var OFFERS = ['palace', 'flat', 'house', 'bungalo'];
var MAP_DIMENSIONS = {
  x: {
    min: 0,
    max: mapSection.clientWidth
  },
  y: {
    min: 130,
    max: 630
  }
};
var OTHER_USERS_PIN_DIMENSIONS = {
  width: 50,
  height: 70
};

var generateRandomIntegerInRange = function (min, max) {
  return Math.floor((Math.random() * (max + 1 - min)) + min);
};
var getRandomElementFromArray = function (arr) {
  return arr[generateRandomIntegerInRange(0, arr.length)];
};

var generateAdvert = function (index) {
  return {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      type: getRandomElementFromArray(OFFERS)
    },
    location: {
      x: generateRandomIntegerInRange(MAP_DIMENSIONS.x.min, MAP_DIMENSIONS.x.max),
      y: generateRandomIntegerInRange(MAP_DIMENSIONS.y.min, MAP_DIMENSIONS.y.max)
    }
  };
};

var generateUsersAdverts = function () {
  var advertsArray = [];

  for (var i = 0; i < ADVERTS_COUNT; i++) {
    advertsArray.push(generateAdvert(i));
  }

  return advertsArray;
};

var usersAdvertsData = generateUsersAdverts();
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var generatePinDomElement = function (pinData) {
  var pinElement = pinTemplate.cloneNode(true);
  var pinImage = pinElement.querySelector('img');
  pinElement.style.left = pinData.location.x - (OTHER_USERS_PIN_DIMENSIONS.width / 2) + 'px';
  pinElement.style.top = pinData.location.y + OTHER_USERS_PIN_DIMENSIONS.height + 'px';
  pinImage.src = pinData.author.avatar;
  pinImage.alt = pinData.offer.type;

  return pinElement;
};

var generateFilledPinsFragment = function (advertsData) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ADVERTS_COUNT; i++) {
    fragment.appendChild(generatePinDomElement(advertsData[i]));
  }

  return fragment;
};

var pinsFragment = generateFilledPinsFragment(usersAdvertsData);
var mapPinsBlock = document.querySelector('.map__pins');

mapSection.classList.remove('map--faded');
mapPinsBlock.appendChild(pinsFragment);


