/* global Item:true */
Item = function (doc) {
  doc = doc || {};
  this._id = doc._id;
  this._name = doc.name;
  this._price = doc.price;
  this._description = doc.description;
  this._quantity = doc.quantity;
  this._location = doc.location;
};

Item.prototype = {
  get id() {
    return this._id;
  },
  get name() {
    return this._name;
  },
  get price() {
    return this._price;
  },
  get description() {
    return this._description;
  },
  get quantity() {
    return this._quantity;
  },
  get location() {
    return this._location;
  },
  save: function (callback) {
    callback = callback || function () {};
    var self = this;
    var doc = {
      name: this.name,
      price: this.price,
      description: this.description,
      quantity: this.quantity,
      location: this.location,
      owner: Meteor.userId()
    };

    Items.insert(doc, function (error, result) {
      self._id = result;
      callback.call(self, error, result);
    });
  }
};
