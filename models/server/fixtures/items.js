/* globals _ */
"use strict";

// Useful debugging one-liners:
// Items.insert({ name: "Heartbeet", price: 0.42, description: "Wonderful, awesome, delicious GBU heartbeets!", "quantity": _.random(1,100), location: getRandomLocation(map) })
// Items.find({ name: "Heartbeet" }).fetch().forEach(function(i) { Items.remove({ _id: i._id }); })

var items = [
  { "name" : "Cucumbers", "price" : 1.29, "description" : "Fresh cucumbers, purchase by the pound!", "quantity" : 20, "location" : [ 44.65916, -123.14125 ] },
  { "name" : "Blackberries", "price" : 10, "description" : "Gallon of blackberries", "quantity" : 5, "location" : [ 44.65916, -123.14125 ] },
  { "name" : "Carrots", "price" : 0.1, "description" : "Delicious orange goodness! (Price per carrot)", "quantity" : 10, "location" : [ 44.486693, -122.866751 ] },
  { "name" : "Kiwifruit", "price" : 0.99, "description" : "Kiwifruit. From that land which is down under.", "quantity" : 12, "location" : [ -29.465835, 149.833889 ] },
  { "name" : "Eggs", "price" : 0.25, "description" : "Fresh laid by Plucky the Hen!", "quantity" : 4, "location" : [ 44.660294, -123.142455 ] },
  { "name" : "Daffodils", "price" : 2, "description" : "Picked this morning, price per dozen", "quantity" : 7, "location" : [ 44.66056, -123.14054 ] },
  { "name" : "Hay", "price" : 50, "description" : "...is for horses. Price per ton.", "quantity" : 62, "location" : [ 44.65904, -123.14495 ] },
  { "name" : "Blackberry Jam", "price" : 10, "description" : "Made from Jack the Grower's Berries!", "quantity" : 8, "location" : [ 44.66146, -123.13921 ] },
  { "name" : "Asparagus", "price" : 13.37, "description" : "The αlpha variety.", "quantity" : 42, "location" : [ 44.66153, -123.13786 ] },
  { "name" : "Broccoli", "price" : 0.1, "description" : "The βeta variety.", "quantity" : 42, "location" : [ 44.66205, -123.13713 ] },
  { "name" : "Hay", "price" : 50, "description" : "...and cows like... Moo. Price per ton.", "quantity" : 33, "location" : [ 44.66043, -123.13469 ] },
  { "name" : "Spinach", "price" : 1.49, "description" : "Be like Popeye!", "quantity" : 17, "location" : [ 44.657665, -123.142605 ] },
  { "name" : "Bibb Lettuce", "price" : 1.99, "description" : "Aquaponic Goodness!", "quantity" : 13, "location" : [ 44.657392, -123.140838 ] },
  { "name" : "Butter Lettuce", "price" : 2.19, "description" : "Aquaponic Goodness!", "quantity" : 9, "location" : [ 44.657392, -123.140838 ] },
  { "name" : "Watercress", "price" : 1.29, "description" : "Aquaponic Goodness!", "quantity" : 9, "location" : [ 44.657392, -123.140838 ] },
  { "name" : "Talapia", "price" : 4.99, "description" : "Aquaponic Goodness!", "quantity" : 4, "location" : [ 44.657392, -123.140838 ] },
  { "name" : "Mesclun", "price" : 1.69, "description" : "Aquaponic Goodness!", "quantity" : 17, "location" : [ 44.657392, -123.140838 ] },
  { "name" : "Radishes", "price" : 2, "description" : "Per bundle.", "quantity" : 27, "location" : [ 44.655768, -123.135648 ] },
  { "name" : "Eggplant", "price" : 2.49, "description" : "Purple goodness!", "quantity" : 20, "location" : [ 44.66001, -123.14552 ] }
];

var getRandomLocationPDX = function () {
  var southWest = { lat: 45.42688928030795, lng: -122.81787872314453 };
  var northEast = { lat: 45.611635857525116, lng: -122.50888824462889};
  var lngSpan = northEast.lng - southWest.lng;
  var latSpan = northEast.lat - southWest.lat;

  return [southWest.lat + latSpan * Math.random(), southWest.lng + lngSpan * Math.random()];
};

Meteor.startup(function() {
  if (Items.find().count() === 0) {
    items.forEach(function (i) {
      Items.insert(i);
    });

    // Initial Heartbeets...
    for (var i = 0; i < 100; i++) {
      var location = getRandomLocationPDX();
      Items.insert({ name: "Heartbeet", price: 0.42, description: "Wonderful, awesome, delicious GBU heartbeets!", "quantity": _.random(1,100), location: location });
    }
  }

  // Rotate Heartbeets to simulate market actvity
  Meteor.setInterval(function () {
    var location = getRandomLocationPDX();
    //console.log("Heartbeet: add @ ", location);
    Items.insert({ name: "Heartbeet", price: 0.42, description: "Wonderful, awesome, delicious GBU heartbeets!", "quantity": _.random(1,100), location: location });
  }, 5000);

  Meteor.setTimeout(function () {
  Meteor.setInterval(function () {
    var old = Items.findOne({ name: "Heartbeet" }, { skip: _.random(0, Items.find({ name: "Heartbeet"}).count()) });
    Items.remove(old);
  }, 5000);}, 2500);
});
