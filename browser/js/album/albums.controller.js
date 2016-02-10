juke.controller('AlbumsCtrl', function($scope, $http, $rootScope, $log, StatsFactory, PlayerFactory) {

  $scope.showAlbums = false;
  // load our initial data
  $http.get('/api/albums/')
  .then(res => res.data)
  .then(albums => {
    albums.forEach(function (album, i) {
      album.imageUrl = '/api/albums/' + album._id + '.image';
      album.songs.forEach(function (song, i) {
        song.audioUrl = '/api/songs/' + song._id + '.audio';
        song.albumIndex = i;
      });
    });

    $scope.albums = albums;
    
  })
  .catch($log.error); // $log service can be turned on and off; also, pre-bound

  $scope.$on('viewAlbums', function(){
    $scope.showAlbums = true;
  });

  $scope.$on('viewAllArtists', function(){
    $scope.showAlbums = false;
  });

  $scope.viewAlbum = function(album){
    $scope.showAlbums = false;
    $rootScope.$broadcast('viewAlbum', album);
  };

});
