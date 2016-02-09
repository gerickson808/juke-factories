juke.controller('AlbumsCtrl', function($scope, $http, $rootScope, $log, StatsFactory, PlayerFactory) {

  // load our initial data
  $http.get('/api/albums/')
  .then(res => res.data)
  .then(albums => {
    
    albums.forEach(function (album, i) {
      album.imageUrl = '/api/albums/' + album._id + '.image';
    });

    $scope.albums = albums;
    
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound
});
