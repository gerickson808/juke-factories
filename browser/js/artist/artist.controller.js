juke.controller("ArtistCtrl",function($scope,$rootScope, $http, ArtistFactory){

	$scope.showAllArtists = false;

	$http.get('/api/artists/')
	.then(artists => {
		$scope.artists = artists.data;
	});

	$scope.$on('viewAllArtists',function(){
		$scope.showAllArtists = true;
		$scope.showOneArtist = false;
	});

	$scope.$on('viewAlbums',function(){
		$scope.showAllArtists = false;
		$scope.showOneArtist = true;
	});

	$scope.viewArtist = function(artist){

		$scope.artist=artist;

		ArtistFactory.getAlbums(artist)
		.then(function(albums){
			$scope.albums = albums;
		});

		ArtistFactory.getSongs(artist)
		.then(function(songs){
			$scope.songs = songs;
			console.log($scope.songs);
		});

		$scope.showAllArtists = false;
		$scope.showOneArtist = true;


	}

	$scope.viewAlbum = function(album){
		$scope.showOneArtist = false;
		$scope.showAllArtists = false;
		$rootScope.$broadcast('viewAlbum', album);
	}

});