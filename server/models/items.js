/* globals itemsSeed */
"use strict";

Meteor.startup(function () {
  if (Items.find().count() === 0) {
    itemsSeed.forEach(function (i) {
      Items.insert(i);
    });
  }

  var getRandomLocation = function () {
    var southWest = { lat: 45.42688928030795, lng: -122.81787872314453 };
    var northEast = { lat: 45.611635857525116, lng: -122.50888824462889};
    var lngSpan = northEast.lng - southWest.lng;
    var latSpan = northEast.lat - southWest.lat;

    return [southWest.lat + latSpan * Math.random(), southWest.lng + lngSpan * Math.random()];
  };

  Meteor.setInterval(function () {
    var location = getRandomLocation();
    console.log("Heartbeet: add @ ", location);
    Items.insert({ name: "Heartbeet", price: 0.42, description: "Wonderful, awesome, delicious GBU heartbeets!", "quantity": _.random(1,100), loc: location });
  }, 5000);

  Meteor.setTimeout(function () {
  Meteor.setInterval(function () {
    var location = getRandomLocation();
    console.log("Heartbeet: rem @ ", location);
    var old = Items.findOne({ name: "Heartbeet" }, { skip: _.random(0, Items.find({ name: "Heartbeet"}).count()) });
    Items.remove(old);
  }, 5000);}, 2500);
});

Meteor.publish("itemsLocal", function (box) {
  if (box && box[0] !== null && box[1] !== null) {
    return Items.find({ loc: { $within: { $box: box } } });
  } else {
    return [];
  }
});
