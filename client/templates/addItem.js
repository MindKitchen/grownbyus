var setFormLocation = function () {
  navigator.geolocation.getCurrentPosition(function (p) {
    $(".gbu-add-item").find("[name=latitude]").val(p.coords.latitude);
    $(".gbu-add-item").find("[name=longitude]").val(p.coords.longitude);
  });
};

Template.addItem.rendered = function () {
  setFormLocation();
};

Template.addItem.events({
  "click #locate": setFormLocation,
  "click .close": Router.go.bind(Router, "home"),
  "submit form": function (e) {
    e.preventDefault();

    var newItem = {
      name: $(e.target).find("[name=name]").val(),
      price: +$(e.target).find("[name=price]").val(),
      description: $(e.target).find("[name=description]").val(),
      quantity: +$(e.target).find("[name=quantity]").val(),
      location: [
        +$(e.target).find("[name=latitude]").val(),
        +$(e.target).find("[name=longitude]").val()
      ]
    };

    newItem._id = Items.insert(newItem);
    Router.go("home");
  }
});
