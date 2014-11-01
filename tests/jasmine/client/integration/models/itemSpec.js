"use strict";

var testItem = {
  name: "Carrot",
  price: 1.25,
  description: "A test carrot.",
  quantity: 123,
  location: [0, 0]
};

describe("Item", function () {
  it("should be addable by growers", function (done) {
    Meteor.loginWithPassword("grower@grownby.us", "grow!", function(err) {
      expect(err).toBeUndefined();

      var item = new Item(testItem);

      var id = item.save(function(error, result) {
        expect(error).toBeUndefined();

        Items.remove(id);

        Meteor.logout(function() {
          done();
        });
      });
    });
  });
  it("should not be addable by non-growers", function (done) {
    Meteor.loginWithPassword("person@grownby.us", "buy!", function(err) {
      expect(err).toBeUndefined();

      var item = new Item(testItem);

      var id = item.save(function(error, result) {
        expect(error.error).toBe(403);

        Meteor.logout(function() {
          done();
        });
      });
    });
  });
});
