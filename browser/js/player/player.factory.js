'use strict';

juke.factory('PlayerFactory', function(){
  // non-UI logic in here
  var audio = document.createElement('audio');
  var songs = [];
  var playing = false;
  var currentSong;
  
  function start(song, collection){
  	songs = collection;
  	if (playing) pause();
  	playing = true;
  	if (song === currentSong) return resume();
  	currentSong = song;
  	audio.src = song.audioUrl;
  	audio.load();
    audio.play();
  }

	function pause(){
		audio.pause();
		playing = false;
	}

	function resume(){
		playing = true;
		return audio.play();
	}

	function isPlaying(){
		return playing;
	}
	
	function getCurrentSong(){
		return currentSong;
	}

	function mod(index, length){
    	return ((index%length)+length)%length;
    }

	function next(){
		var nextIndex = mod(songs.indexOf(currentSong)+1,songs.length);
		start(songs[nextIndex]);

	}

	function previous(){
		var prevIndex = mod(songs.indexOf(currentSong)-1,songs.length);
		start(songs[prevIndex]);
	}

	function getProgress(){
		return 80;
	}

	return {
		start: start,
		pause: pause,
		resume: resume,
		isPlaying: isPlaying,
		getCurrentSong: getCurrentSong,
		next: next,
		previous: previous,
		getProgress: getProgress
	};


});
