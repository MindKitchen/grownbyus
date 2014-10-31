Router.configure({
  layoutTemplate: "layout"
});

Router.route("/", { name: "home" });
Router.route("/item/add", { name: "addItem" });
