map = null;
markers = {};

Template.map.resize = function () {
  $("#map").height($(window).height());
};

Template.map.rendered = function () {
  $(window).resize(Template.map.resize);
  Template.map.resize();

  L.Icon.Default.imagePath = "packages/boustanihani_meteor-leaflet/images";

  map = L.map("map");
  L.tileLayer.provider("Stamen.TonerLite").addTo(map);

  // Initially set view to PDX and attempt to geolocate
  map.setView([45.5200, -122.6600], 13);
  map.locate({ setView: true, maxZoom: 14 });

  map.on("move", function () {
    var bounds = map.getBounds();
    Session.set("bounds", [[bounds.getSouthWest().lat, bounds.getSouthWest().lng], [bounds.getNorthEast().lat, bounds.getNorthEast().lng]]);
  });
};

Template.itemsList.helpers({
  items: function () {
    var query = Items.find({});

    query.observeChanges({
      added: function (id, item) {
        var marker = L.marker(item.loc).addTo(map);
        marker.bindPopup("<b>" + item.name + "</b> - " + item.quantity + " @ " + numeral(item.price).format("$0,0.00"));
        markers[id] = marker;
      },
      removed: function (id) {
        if (markers[id]) {
          map.removeLayer(markers[id]);
          delete markers[id];
        }
      }
    });

    return query;
  }
});
