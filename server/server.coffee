Meteor.startup ->
  if Stalls.find().count() is 0
    Stalls.insert
      owners: []
#      owners: [Users.find({}).fetch()[0]._id
#               Users.find({}).fetch()[1]._id]
  if Items.find().count() is 0
#    Items.insert({name: "", price: , description: "", quantity: , loc: [44.486693, -122.866751], stalls: [Stalls.findOne()._id]})  
    Items.insert
      name: "Cucumbers"
      price: 1.29
      description: "Fresh cucumbers, purchase by the pound!"
      quantity: 20
      loc: [44.659160, -123.141250]
      stalls: [Stalls.findOne()._id]
    Items.insert
      name: "Blackberries"
      price: 10.00
      description: "Gallon of blackberries"
      quantity: 5
      loc: [44.659160, -123.141250]
      stalls: [Stalls.findOne()._id]

#Meteor.publish "users", -> Users.find {}
Meteor.publish "stalls", -> Stalls.find {}
Meteor.publish "items", (sw, ne) ->
  if (sw? and ne?) and sw != ne then Items.find {loc: {$within: {$box: [sw, ne]} } } else Items.find {}
#Meteor.publish "items", (lat, lon) ->
#  if lat? or lon? then Items.find {loc: {$near: [lat, lon], $maxDistance: 1} } else Items.find {}
###  if lat? or lon?
    console.log "\nLat: #{lat} Lon: #{lon}"
    items = Items.find {loc: {$near: [lat, lon], $maxDistance: 0.5} }
    for item in items.fetch()
      console.log item
    items
  else
    Items.find {}

