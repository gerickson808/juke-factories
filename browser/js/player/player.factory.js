'use strict';

juke.factory('PlayerFactory', function($rootScope){
  // non-UI logic in here
  var audio = document.createElement('audio');
  var songs = [];
  var playing = false;
  var currentSong;
  var progressing;
  
  function start(song, collection){
  	songs = collection;
  	if (playing) this.pause();
  	playing = true;
  	if (song === currentSong) return resume();
  	currentSong = song;
  	audio.src = song.audioUrl;
  	audio.load();
    audio.play();
    progressBar();
  }

  function progressBar(){
  	progressing = setInterval(function(){
   		$rootScope.progress = getProgress();
   		console.log($rootScope.progress);
    	$rootScope.$digest();
  	},100);
  }

	function pause(){
		clearInterval(progressing);
		audio.pause();
		playing = false;
	}

	function resume(){
		progressBar();
		playing = true;
		return audio.play();
	}

	function isPlaying(){
		return playing;
	}
	
	function getCurrentSong(){
		return currentSong || null;
	}

	function mod(index, length){
    	return ((index%length)+length)%length;
    }

	function next(){
		var nextIndex = mod(songs.indexOf(currentSong)+1,songs.length);

		this.start(songs[nextIndex],songs);

	}

	function previous(){
		var prevIndex = mod(songs.indexOf(currentSong)-1,songs.length);
		this.start(songs[prevIndex],songs);
	}

	function getProgress(){
		// console.log(currentSong, audio.)
		return currentSong ? 100 * audio.currentTime / audio.duration : 0;
	}

	function getSongs(){
		return songs;
	}

	return {
		start: start,
		pause: pause,
		resume: resume,
		isPlaying: isPlaying,
		getCurrentSong: getCurrentSong,
		next: next,
		previous: previous,
		getProgress: getProgress,
		getSongs: getSongs
	};


});
