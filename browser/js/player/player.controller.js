'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)

  // audio.addEventListener('ended', $scope.next);
  // audio.addEventListener('timeupdate', function () {

  //   $scope.$digest(); // no Angular-aware code is doing this for us here
  // });

  // state
  // $scope.currentSong;

  $scope.isPlaying = PlayerFactory.isPlaying;

  // main toggle
  $scope.toggle = function (song) {
    if (PlayerFactory.isPlaying() && song === $scope.currentSong) {
      PlayerFactory.pause();
    } else PlayerFactory.start(song,PlayerFactory.getSongs());
    $scope.currentSong = PlayerFactory.getCurrentSong();
  };

  $scope.next = function () { PlayerFactory.next();};
  $scope.prev = function () { PlayerFactory.previous();};
  // incoming events (from Album or toggle)
  // $scope.$on('pause', pause);
  // $scope.$on('play', play);

  // functionality
  // function pause () {
  //   PlayerFactory.pause();
  // }
  // function play (event, song){
  //   PlayerFactory.start(song);
  // }

  // outgoing events (to Album… or potentially other characters)

});
