"use strict";

var testItem = {
  name: "Carrot",
  price: 1.25,
  description: "A test carrot.",
  quantity: 123,
  location: [0, 0],
  owner: null
};

describe("Item", function () {
  it("should be created with name, price, description, quantity and location", function () {
    // simulate insert return of id = "1"
    spyOn(Items, "insert").and.callFake(function(doc, callback) {
      callback(null, "1");
    });

    var item = new Item(testItem);

    expect(item.name).toBe("Carrot");

    item.save();

    // id should be defined
    expect(item.id).toEqual("1");
    expect(Items.insert).toHaveBeenCalledWith(testItem, jasmine.any(Function));
  });
});
