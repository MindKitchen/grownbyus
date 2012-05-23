GBU = {} if not GBU?

GBU.getFacebookUser = (acces_token) ->
  result = Meteor.http.get("https://graph.facebook.com/me", {params: access_token: access_token})
  if result.error
    console.log "Error retrieving Facebook User"
    return null
  else
    return result.data || JSON.parse(result.content)

GBU.createOrUpdateUser = (fb_user) ->
  if fb_user
    user = User.findOne {fb_uid: fb_user.id}
    if user
      if user.name != fb_user.name
        Users.update {_id: user._id}, {name: fb_user.name}
        console.log "Updated user #{user._id}"
        return user._id
      return true
    else
      id = Users.insert {fb_uid: fb_user.id, name: fb_user.name}
      console.log "Added new user: #{id}"
      id
  else
    false
