'use strict';

juke.controller('PlayerCtrl', function ($scope, $rootScope, PlayerFactory) {

  // initialize audio player (note this kind of DOM stuff is odd for Angular)
  var audio = document.createElement('audio');
  audio.addEventListener('ended', $scope.next);
  audio.addEventListener('timeupdate', function () {
    $scope.progress = 100 * audio.currentTime / audio.duration;
    $scope.$digest(); // no Angular-aware code is doing this for us here
  });

  // state
  $scope.currentSong;
  $scope.playing = false;

  // main toggle
  $scope.toggle = function (song) {
    if ($scope.playing) $rootScope.$broadcast('pause');
    else $rootScope.$broadcast('play', song);
  };

  // incoming events (from Album or toggle)
  $scope.$on('pause', pause);
  $scope.$on('play', play);

  // functionality
  function pause () {
    audio.pause();
    $scope.playing = false;
  }
  function play (event, song){
    PlayerFactory.start(song);
  }

  // outgoing events (to Album… or potentially other characters)
  $scope.next = function () { PlayerFactory.next(); $rootScope.$broadcast('next'); };
  $scope.prev = function () { PlayerFactory.previous(); $rootScope.$broadcast('prev'); };

});
