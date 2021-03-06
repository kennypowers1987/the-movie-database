var app = angular.module('myApp', ['ui.bootstrap']);
app.controller('myCtrl', function ($scope, $http, $uibModal) {
  $scope.sortType = 'vote_count'; // set the default sort type
  $scope.sortReverse = true;  // set the default sort order

  $http({
    method: "GET",
    url: "http://candidate-test.icapture.com:8081/movies"
  }).then(function mySuccess(response) {
    console.log(response.data.length);
    $scope.data = response.data;
  }, function myError(error) {
    $scope.error = error;
  });

  $scope.openModal = function (movie) {
    $uibModal.open({
      //animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title-top',
      ariaDescribedBy: 'modal-body-top',
      templateUrl: './details.html',
      size: 'lg',
      controller: 'modalCtrl',
      resolve: {
        movie: function () {
          console.log('movie: ', movie);
          return movie;
        }
      }
    }).result.then(function () { }, function (res) { })
  };

});

app.controller('modalCtrl', function ($scope, $http, $uibModal, movie) {
  $scope.movie = movie;
  $http({
    method: "GET",
    url: "https://image.tmdb.org/t/p/w500/" + movie.poster_path
  }).then(function mySuccess(response) {
    $scope.image = response.data;
  }, function myError(error) {
    console.log(error);
  });
});