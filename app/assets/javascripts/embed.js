//= require leaflet
//= require leaflet.osm

window.onload = function () {
  var query = (window.location.search || '?').substr(1),
      args  = {};

  query.replace(/([^&=]+)=?([^&]*)(?:&+|$)/g, function(match, key, value) {
    value = value.split(",");
    if (value.length == 1)
      value = value[0];
    args[key] = value;
  });

  var map = L.map("map");
  map.attributionControl.setPrefix('');

  if (!args.layer || args.layer == "mapnik" || args.layer == "osmarender") {
    new L.OSM.Mapnik().addTo(map);
  } else if (args.layer == "cyclemap" || args.layer == "cycle map") {
    new L.OSM.CycleMap().addTo(map);
  } else if (args.layer == "transportmap") {
    new L.OSM.TransportMap().addTo(map);
  } else if (args.layer == "mapquest") {
    new L.OSM.MapQuestOpen().addTo(map);
  }

  if (args.marker) {
    L.marker(args.marker).addTo(map);
  }

  if (args.bbox) {
    map.fitBounds([L.latLng(args.bbox[1], args.bbox[0]),
                   L.latLng(args.bbox[3], args.bbox[2])])
  } else {
    map.fitWorld();
  }  
};