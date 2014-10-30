Template.sidebar.resize = function () {
  $("#sidebar").height($(window).height());
};

Template.sidebar.rendered = function () {
  $(window).resize(Template.sidebar.resize);
  Template.sidebar.resize();
};
