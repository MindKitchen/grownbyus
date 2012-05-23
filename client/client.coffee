Session.set "cur_lat", 0
Session.set "cur_lon", 0

Meteor.subscribe "users"
Meteor.subscribe "stalls"
Meteor.autosubscribe ->
  Meteor.subscribe "items", Session.get("cur_lat"), Session.get("cur_lon"), resetMap
  return 

GBU.markers = []

resetMap = ->
  if GBU.map?
    GBU.deleteOverlays()
    GBU.map.panTo new google.maps.LatLng Session.get("cur_lat"), Session.get("cur_lon")
    for item in Items.find().fetch()
      marker = new google.maps.Marker {
        map: GBU.map
        draggable: false
        animation: google.maps.Animation.DROP
        position: new google.maps.LatLng item.loc[0], item.loc[1]
      }
      GBU.markers.push(marker)
  return

Handlebars.registerHelper 'fmtCurrency', (n) ->
  '$' + jQuery.formatNumber n.toString(), {format: "#,##0.00", locale: "us"}

Template.menu.events =
  'click button.additem': ->
    $("#dialog-addItem").dialog "open"
    return false

Template.items.items = ->
  items = Items.find({})

Template.sample_locations.events =
  'click button.northalbany': ->
    GBU.setLoc [44.659160, -123.141250]
  'click button.moree': ->
    GBU.setLoc [-29.465835, 149.833889]

$ ->
# XXX Timeout WHAT?!? Need to trigger off first template render, only a temp workaround
  setTimeout ( ->
    # Move CoffeeTable...should do this elsewhere, too
    $("body").children().last().css("top","")
    $("body").children().last().css("bottom","5px")

    mapOptions =
      center: new google.maps.LatLng Session.get("cur_lat"), Session.get("cur_lon")
      zoom: 9 
      mapTypeId: google.maps.MapTypeId.HYBRID

    GBU.map = new google.maps.Map document.getElementById("map_canvas"), mapOptions

    google.maps.event.addListener GBU.map, 'mouseup', ->
      c = GBU.map.getCenter()
      GBU.setLoc [c.$a, c.ab]
      return

    navigator.geolocation.getCurrentPosition ((p) ->
      GBU.setLoc [p.coords.latitude, p.coords.longitude]
    ), ->
      GBU.setLoc [44.659160, -123.141250]
    return
  ), 2000
