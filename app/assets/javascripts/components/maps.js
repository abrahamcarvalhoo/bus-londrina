var map;
var interval;
var markers = [];
var icon_bus = '/assets/images/icons/bus.png';
var icon_user = '/assets/images/icons/user.png';
var icon_terminal = '/assets/images/icons/terminal.png';

function initMap() {
  var infoWindow = new google.maps.InfoWindow();
  var londrinaPosition = new google.maps.LatLng(-23.304452, -51.169582);
  var centroPosition = new google.maps.LatLng(-23.308385, -51.160897);
  var vivixavierPosition = new google.maps.LatLng(-23.260688, -51.172643);
  var gavettiPosition = new google.maps.LatLng(-23.281622, -51.152574);
  var acapulcoPosition = new google.maps.LatLng(-23.360432, -51.155230);
  var catuaiPosition = new google.maps.LatLng(-23.343636, -51.185976);
  var ouroverdePosition = new google.maps.LatLng(-23.281607, -51.171774);
  var mapOptions = {
    zoom: 13,
    scaleControl: false,
    mapTypeControl: false,
    center: londrinaPosition,
    streetViewControl: false,
  }

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  termCentral = new google.maps.Marker({
    map: map,
    icon: icon_terminal,
    title: 'Term. Central',
    position: centroPosition,
  });

  termCentral.addListener('click', function() {
    infoWindow.setContent('Term. Central');
    infoWindow.open(map, this);
  });

  termViviXavier = new google.maps.Marker({
    map: map,
    icon: icon_terminal,
    title: 'Term. Vivi Xavier',
    position: vivixavierPosition,
  });

  termViviXavier.addListener('click', function() {
    infoWindow.setContent('Term. Vivi Xavier');
    infoWindow.open(map, this);
  });

  termGavetti = new google.maps.Marker({
    map: map,
    icon: icon_terminal,
    title: 'Term. Gavetti',
    position: gavettiPosition,
  });

  termGavetti.addListener('click', function() {
    infoWindow.setContent('Term. Gavetti');
    infoWindow.open(map, this);
  });

  termAcapulco = new google.maps.Marker({
    map: map,
    icon: icon_terminal,
    title: 'Term. Acapulco',
    position: acapulcoPosition,
  });

  termAcapulco.addListener('click', function() {
    infoWindow.setContent('Term. Acapulco');
    infoWindow.open(map, this);
  });

  termCatuai = new google.maps.Marker({
    map: map,
    icon: icon_terminal,
    title: 'Term. Catuai',
    position: catuaiPosition,
  });

  termCatuai.addListener('click', function() {
    infoWindow.setContent('Term. Catuai');
    infoWindow.open(map, this);
  });

  termOuroVerde = new google.maps.Marker({
    map: map,
    icon: icon_terminal,
    title: 'Term. Ouro Verde',
    position: ouroverdePosition,
  });

  termOuroVerde.addListener('click', function() {
    infoWindow.setContent('Term. Ouro Verde');
    infoWindow.open(map, this);
  });
}

function getPosition(id, $http) {
  console.log('getPosition');
}

function renderPosition(response) {
  console.log('renderPosition');
}

function getUserPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var infoWindow = new google.maps.InfoWindow();
      var userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      markerUser = new google.maps.Marker({
        position: userPosition,
        map: map,
        icon: icon_user,
        title: 'Estou Aqui',
      });
      map.setZoom(15);
      map.setCenter(userPosition);

      markerUser.addListener('click', function() {
        infoWindow.setContent('Estou Aqui');
        infoWindow.open(map, this);
      });
    });
  }
}

function clearOverlays(markers) {
  if (markers) {
    for (i in markers) {
      markers[i].setMap(null);
    }
  }
}
