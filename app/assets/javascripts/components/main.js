var app = angular.module('MainApp', ['ngRoute', 'infinite-scroll']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'components/main.html',
    controller: 'MainCtrl'
  })
  .when('/item/:id', {
    templateUrl: 'components/item.html',
    controller: 'ItemCtrl'
  })
  .otherwise({ redirectTo: '/' });
});

app.controller('MainCtrl', function($scope, $http) {
  $scope.saved = localStorage.getItem('items');
  $scope.items = (localStorage.getItem('items') !== null) ? JSON.parse($scope.saved) : addItems($http);

  materialInit();
  clearInterval(interval);

  $scope.ignoreAccents = function(item) {
    if (angular.isObject(item)) return false;
    var text = removeAccents(angular.lowercase('' + item));
    var search = removeAccents(angular.lowercase('' + $scope.search));
    return text.indexOf(search) > -1;
  };
});

app.controller('ItemCtrl', function($scope, $route, $http) {
  $scope.params = $route.current.params;

  initMap();
  getUserPosition();
  getPosition($scope.params.id, $http);
  interval = setInterval('getPosition('+$scope.params.id+', '+$http+')', 15000);
});

function addItems($http) {
  $http({
    method: 'get',
    url: '/items.json'
  }).then(function(response) {
    localStorage.setItem('items', JSON.stringify(response.data));
    window.location.reload();
  }, function(error) {
    console.log(error, 'can not get data.');
  });
}

function removeAccents(value) {
  return value
  .replace(/á/g, 'a')
  .replace(/à/g, 'a')
  .replace(/â/g, 'a')
  .replace(/ã/g, 'a')
  .replace(/é/g, 'e')
  .replace(/è/g, 'e')
  .replace(/ê/g, 'e')
  .replace(/í/g, 'i')
  .replace(/ï/g, 'i')
  .replace(/ì/g, 'i')
  .replace(/ó/g, 'o')
  .replace(/ô/g, 'o')
  .replace(/ú/g, 'u')
  .replace(/ü/g, 'u')
  .replace(/ç/g, 'c')
  .replace(/ñ/g, 'n')
  .replace(/õ/g, 'o')
  .replace(/ß/g, 's');
}
