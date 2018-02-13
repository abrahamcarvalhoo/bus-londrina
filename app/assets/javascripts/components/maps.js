var map;
var interval;
var markers = [];
var routesPath = [];
var routesCoord = [];
var routesGo = new Array();
var routesBack = new Array();
var icon_bus = 'assets/images/icons/bus.png';
var icon_user = 'assets/images/icons/user.png';
var icon_terminal = 'assets/images/icons/terminal.png';

function initMap() {
  var infoWindow = new google.maps.InfoWindow();
  var centralPosition = new google.maps.LatLng(-23.308385, -51.160897);
  var vivixavierPosition = new google.maps.LatLng(-23.260688, -51.172643);
  var gavettiPosition = new google.maps.LatLng(-23.281622, -51.152574);
  var acapulcoPosition = new google.maps.LatLng(-23.360432, -51.155230);
  var catuaiPosition = new google.maps.LatLng(-23.343636, -51.185976);
  var ouroverdePosition = new google.maps.LatLng(-23.281607, -51.171774);
  var mapOptions = {
    zoom: 15,
    scaleControl: false,
    mapTypeControl: false,
    center: centralPosition,
    streetViewControl: false,
  }

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  termCentral = new google.maps.Marker({
    map: map,
    icon: icon_terminal,
    title: 'Term. Central',
    position: centralPosition,
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

function getPosition(id) {
  $.ajax({
    url: 'buscamapa.php',
    type: 'GET',
    dataType: 'json',
    data: { idLinha: id },
    contentType: 'application/json; charset=utf-8',
  }).done(function(response) {
    var response = response.cordenadas.split('&');

    if (response.length >= 5) {
      clearMarkers(markers);
      renderPosition(response);
    } else {
      console.log('error');
    }
  });
}

function getUserPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var userPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      markerUser = new google.maps.Marker({
        map: map,
        icon: icon_user,
        title: 'Estou Aqui',
        position: userPosition,
      });
      map.setZoom(15);
      map.setCenter(userPosition);
    });
  }
}

function renderPosition(response) {
  var marker;
  var index = 1;
  var infoWindow = new google.maps.InfoWindow();

  while (index < response.length - 1) {
    marker = new google.maps.Marker({
      map: map,
      icon: icon_bus,
      title: response[index + 1],
      position: new google.maps.LatLng(response[index + 2], response[index + 3])
    });

    index = index + 6;
    markers.push(marker);
  }
}

function getRoutes(id) {
  $.ajax({
    url: 'buscalinhas.php',
    type: 'GET',
    dataType: 'json',
    data: { linha: id },
    contentType: 'application/json; charset=utf-8',
  }).done(function(response) {
    $.each(response, function (index, record) {
      var obj = response[index];

      for (var key in obj) {
        i = 0;
        go = 0;
        back = 0;

        if (obj[key].Sentido == 0) {
          if (key != go && key < obj.length) {
            routesGo.push(new google.maps.LatLng(obj[key].Lat, obj[key].Lng));
          }
          go = i + 1;
        } else {
          routesBack.push(new google.maps.LatLng(obj[key].Lat, obj[key].Lng));
          back = i + 1;
        }
        i++;
      }

      var polylineGo = new google.maps.Polyline({
        path: routesGo,
        strokeWeight: 3,
        strokeOpacity: '1.0',
        strokeColor: '#0000FF'
      });
      routesPath.push(polylineGo);

      var polylineBack = new google.maps.Polyline({
        strokeWeight: 3,
        path: routesBack,
        strokeOpacity: '1.0',
        strokeColor: '#000000'
      });
      routesPath.push(polylineBack);

      polylineGo.setMap(map);
      polylineBack.setMap(map);
    });
  });
}

function clearMarkers(markers) {
  if (markers) {
    for (i in markers) {
      markers[i].setMap(null);
    }
    markers = [];
  }
}

function clearRoutes() {
  if (routesPath) {
    for (var i = 0; i < routesPath.length; i++) {
      routesPath[i].setMap(null);
    }
    routesPath = [];
    routesGo = new Array();
    routesBack = new Array();
  }
}
