var app = angular.module('myApp', []);
app.controller('myCtrl', function ($scope, $http) {
  $scope.sortType = 'vote_count'; // set the default sort type
  $scope.sortReverse = true;  // set the default sort order

  $http({
    method: "GET",
    url: "http://localhost:3000/movies"
  }).then(function mySuccess(response) {
    $scope.data = response.data;
  }, function myError(error) {
    $scope.error = error;
  });
});