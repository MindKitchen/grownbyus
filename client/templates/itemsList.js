/* globals Handlebars */
"use strict";

Handlebars.registerHelper("fmtCurrency", function (n) {
  return numeral(n).format("$0,0.00");
});

Template.itemsList.helpers({
  items: function () {
    return Items.find({});
  }
});

Template.itemsList.resize = function () {
  $(".gbu-items-list").height($(window).height() - $(".gbu-menu").height() - 1);
};

Template.itemsList.rendered = function () {
  $(window).resize(Template.itemsList.resize);
  Template.itemsList.resize();
};
