APP_URL = "http://asparagus.grownby.us"
FACEBOOK_ID = "309651762453603"
GOOGLE_ID = "278810248249.apps.googleusercontent.com"

Meteor.accounts.facebook.config FACEBOOK_ID, APP_URL
Meteor.accounts.google.config GOOGLE_ID, APP_URL
