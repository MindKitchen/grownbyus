Session.set "cur_lat", 0
Session.set "cur_lon", 0
Session.set "cur_sw", [0,0]
Session.set "cur_ne", [1,1]

Meteor.subscribe "users"
Meteor.subscribe "stalls"
Meteor.autosubscribe ->
  Meteor.subscribe "items", Session.get("cur_sw"), Session.get("cur_ne"), GBU.resetMap
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

$(window).resize ->
  $("#items").height($(document).height()-170)

$ ->
# XXX Timeout WHAT?!? Need to trigger off template render, only a temp workaround
  setTimeout ( ->
    # Move CoffeeTable...should do this elsewhere, too
    $("body").children().last().css("top","")
    $("body").children().last().css("bottom","0px")
    $("body").children().last().css("right","0px")
    $("#items").height($(document).height()-170)

    mapOptions =
      center: new google.maps.LatLng Session.get("cur_lat"), Session.get("cur_lon")
      zoom: 10 
      mapTypeId: google.maps.MapTypeId.ROADMAP

    GBU.map = new google.maps.Map document.getElementById("map_canvas"), mapOptions

    google.maps.event.addListener GBU.map, 'mouseup', ->
      c = GBU.map.getCenter()
      GBU.setLoc [c.$a, c.ab]
      return

    google.maps.event.addListener GBU.map, 'bounds_changed', ->
      GBU.resetBounds()

    navigator.geolocation.getCurrentPosition ((p) ->
      GBU.setLoc [p.coords.latitude, p.coords.longitude]
    ), ->
      GBU.setLoc [44.659160, -123.141250]
    return
  ), 2000
