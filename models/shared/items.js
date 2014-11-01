Items = new Mongo.Collection("items");

Items.allow({
  insert: function (userId, doc) {
    // the user must be logged in, the document must be owned by the user and user must be a grower
    return (userId && doc.owner === Meteor.userId() && Roles.userIsInRole(userId, "grower"));
  },
  remove: function (userId, doc) {
    // the user must be logged in, and the document must be owned by the user
    return (userId && doc.owner === Meteor.userId());
  }
});
