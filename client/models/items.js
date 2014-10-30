Meteor.autorun(function () {
  Meteor.subscribe("itemsLocal", Session.get("bounds"));
});

// http://stackoverflow.com/questions/20751523/removing-leaflet-layers-and-l-marker-method
window.getRandomLocation = function (map) {
  var bounds = map.getBounds();
  var southWest = bounds.getSouthWest();
  var northEast = bounds.getNorthEast();
  var lngSpan = northEast.lng - southWest.lng;
  var latSpan = northEast.lat - southWest.lat;

  var location = new L.LatLng(southWest.lat + latSpan * Math.random(),
                              southWest.lng + lngSpan * Math.random());

  return [location.lat, location.lng];
};
