"use strict";

var users = [
  { name: "A. Person", email: "person@grownby.us", roles: [], password: "buy!" },
  { name: "A. Grower", email: "grower@grownby.us", roles: ["grower"], password: "grow!" },
  { name: "GBU Admin", email: "admin@grownby.us", roles: ["admin"], password: "admin!" }
];

Meteor.startup(function() {
  if (Meteor.users.find().count() === 0) {
    users.forEach(function (user) {
      var id = Accounts.createUser({
        email: user.email,
        password: user.password,
        profile: { name: user.name }
      });

      if (user.roles.length > 0) {
        Roles.addUsersToRoles(id, user.roles);
      }
    });
  }
});
