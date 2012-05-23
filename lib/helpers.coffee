GBU = {} if not GBU?

GBU.setLoc = (loc) ->
  Session.set "cur_lat", loc[0]
  Session.set "cur_lon", loc[1]
  return

GBU.logLoc = ->
  console.log Session.get "cur_lat"
  console.log Session.get "cur_lon"
  return

GBU.loc = -> return "[#{Session.get "cur_lat"}, #{Session.get "cur_lon"}]"

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

GBU.cmpfloat = (x, y, o) ->
  if x < y then t = (y - x) else t = x - y
  t < o

GBU.FO = 0.0000001
