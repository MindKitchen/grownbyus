GBU = {} if not GBU?
window.GBU = GBU if window?

GBU.setLoc = (loc) ->
  Session.set "cur_lat", loc[0]
  Session.set "cur_lon", loc[1]
  @map.panTo new google.maps.LatLng loc[0], loc[1]
  @resetBounds()

GBU.resetBounds = ->
  bounds = @map.getBounds()
  if bounds?
    Session.set "cur_sw", [bounds.getSouthWest().lat(), bounds.getSouthWest().lng()]
    Session.set "cur_ne", [bounds.getNorthEast().lat(), bounds.getNorthEast().lng()]
  return

GBU.logLoc = ->
  console.log Session.get "cur_lat"
  console.log Session.get "cur_lon"
  return

GBU.loc = -> return "[#{Session.get "cur_lat"}, #{Session.get "cur_lon"}]"

GBU.markers = []

GBU.clearOverlays = ->
  if @markers?
    for m in @markers
      @markers[_i].setMap(null)
  return

GBU.showOverlays = ->
  if @markers?
    for m in @markers
      @markers[_i].setMap(@map)
  return

GBU.deleteOverlays = ->
  @clearOverlays()
  @markers.length = 0
  return

GBU.resetMap = ->
  if GBU.map?
    GBU.deleteOverlays()
    for item in Items.find().fetch()
      marker = new google.maps.Marker {
        map: GBU.map
        draggable: false
        #animation: google.maps.Animation.DROP
        position: new google.maps.LatLng item.loc[0], item.loc[1]
      }
      GBU.markers.push(marker)
  return

GBU.cmpfloat = (x, y, o) ->
  if x < y then t = (y - x) else t = x - y
  t < o

GBU.FO = 0.0000001
