var app = angular.module('MainApp', ['ngRoute', 'infinite-scroll']);

app.controller('MainCtrl', function($scope, $http) {
  $scope.saved = localStorage.getItem('items');
  $scope.items = (localStorage.getItem('items') !== null) ? JSON.parse($scope.saved) : addItems($http);

  $scope.loadMore = function() {
    var last = $scope.items[$scope.items.length - 1];
    for(var i = 1; i <= 8; i++) {
      $scope.items.push(last + i);
    }
  };
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
