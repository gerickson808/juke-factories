'use strict';

juke.controller('AlbumCtrl', function($scope, $http, $rootScope, $log, StatsFactory, PlayerFactory) {

  // load our initial data
  // $http.get('/api/albums/')
  // .then(res => $http.get('/api/albums/' + res.data[1]._id)) // temp: use first
  // .then(res => res.data)
  // .then(album => {
  //   album.imageUrl = '/api/albums/' + album._id + '.image';
    // album.songs.forEach(function (song, i) {
    //   song.audioUrl = '/api/songs/' + song._id + '.audio';
    //   song.albumIndex = i;
    // });
    // $scope.album = album;
    // StatsFactory.totalTime(album)
    // .then(function (albumDuration) {
    //     $scope.fullDuration = albumDuration;
    // });
  // })
  // .catch($log.error); // $log service can be turned on and off; also, pre-bound

  $scope.singleAlbum = false;

  $scope.$on('viewAlbum', function(event, album){
    $scope.album = album;
    console.log(album);
    StatsFactory.totalTime(album)
    .then(function (albumDuration) {
        $scope.fullDuration = albumDuration;
    });
    $scope.singleAlbum = true;
  });

  $scope.$on('viewAlbums', function(){
    $scope.singleAlbum = false;
  });

  $scope.$on('viewAllArtists', function(){
    $scope.singleAlbum = false;
  });

  // main toggle
  $scope.toggle = function (song) {
    if ($scope.playing && song === $scope.currentSong) {
      PlayerFactory.pause();
    } else PlayerFactory.start(song, $scope.album.songs);
    $scope.playing = PlayerFactory.isPlaying();
    $scope.currentSong = PlayerFactory.getCurrentSong();
  };

  $scope.getCurrentSong = PlayerFactory.getCurrentSong;
  $scope.isPlaying = PlayerFactory.isPlaying;

  function next () { PlayerFactory.next();}
  function prev () { PlayerFactory.previous();}
  // incoming events (from Player, toggle, or skip)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);
  // $scope.$on('next', next);
  // $scope.$on('prev', prev);

  // functionality
  // function pause () {
  //   $scope.playing = false;
  // }
  // function play (event, song) {
  //   $scope.playing = true;
  //   $scope.currentSong = song;
  // };

  // a "true" modulo that wraps negative to the top of the range
  // function mod (num, m) { return ((num % m) + m) % m; };

  // jump `interval` spots in album (negative to go back, default +1)
  // function skip (interval) {
  //   if (!$scope.currentSong) return;
  //   var index = $scope.currentSong.albumIndex;
  //   index = mod( (index + (interval || 1)), $scope.album.songs.length );
  //   $scope.currentSong = $scope.album.songs[index];
  //   if ($scope.playing) $rootScope.$broadcast('play', $scope.currentSong);
  // };

});
