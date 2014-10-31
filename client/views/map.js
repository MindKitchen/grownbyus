/* global map:true, markers:true */
map = null;
markerLayer = null;
markers = {};

Template.map.resize = function () {
  $("#map").height($(window).height());
};

Template.map.rendered = function () {
  $(window).resize(Template.map.resize);
  Template.map.resize();

  // Setup and initialize Leaflet map
  L.Icon.Default.imagePath = "packages/boustanihani_meteor-leaflet/images";
  map = L.map("map");
  L.tileLayer.provider("Stamen.TonerLite").addTo(map);

  // Add geolocation control
  L.control.locate({
    locateOptions: { maxZoom: 14 },
    onLocationError: function () {}
  }).addTo(map);

  // Initially set view to PDX and attempt to geolocate
  map.setView([45.5200, -122.6600], 13);
  map.locate({ setView: true, maxZoom: 14 });

  // Reset the bounds Session varible whenever the map moves
  map.on("move", function () {
    var bounds = map.getBounds();
    Session.set("bounds", [[bounds.getSouthWest().lat, bounds.getSouthWest().lng], [bounds.getNorthEast().lat, bounds.getNorthEast().lng]]);
  });

  markerLayer = new L.MarkerClusterGroup();
  map.addLayer(markerLayer);

  var query = Items.find({});

  query.observeChanges({
    added: function (id, item) {
      var gbuMarker = L.AwesomeMarkers.icon({
        prefix: "fa",
        icon: "cutlery",
        markerColor: "darkgreen"
      });

      var marker = L.marker(item.location, { icon: gbuMarker });
      marker.bindPopup("<b>" + item.name + "</b> - " + item.quantity + " @ " + numeral(item.price).format("$0,0.00"));
      markerLayer.addLayer(marker);
      markers[id] = marker;
    },
    removed: function (id) {
      if (markers[id]) {
        markerLayer.removeLayer(markers[id]);
        delete markers[id];
      }
    }
  });
};
