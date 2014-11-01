"use strict";

Meteor.publish("itemsLocal", function (box) {
  if (box && box[0] !== null && box[1] !== null) {
    return Items.find({ location: { $within: { $box: box } } });
  } else {
    return [];
  }
});
