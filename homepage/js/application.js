"use strict";

var bind = function(ctx, f) {
  if(f.bind) {
    return f.bind(ctx);
  } else {
    return function() { f.apply(ctx, arguments); };
  }
};

var Map = function(app) {
  this._app = app;
};

Map.prototype = {
  _tileUrl: "http://otile1.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg",
  _attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>',
  _initialCoords: [51.571, -0.024],
  _initialZoom: 13,
  _maxZoom: 25,

  render: function(id) {
    this._map = L.map(id).setView(this._initialCoords, this._initialZoom);
    L.tileLayer(this._tileUrl, {
      attribution: this._attribution,
      maxZoom: this._maxZoom
    }).addTo(this._map);
  }
};


var Application = function() {};

Application.prototype = {
  render: function() {
    this._map = new Map(this);
    this._map.render("map");
  },
}

document.addEventListener("DOMContentLoaded", function() {
  var app = new Application();
  app.render();
})
