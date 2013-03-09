@Stalls = new Meteor.Collection "stalls"
@Items = new Meteor.Collection "items"

exports.Stalls = Stalls unless Meteor?
exports.Items = Items unless Meteor?
