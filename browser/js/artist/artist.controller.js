juke.controller("ArtistCtrl",function($scope,$rootScope, $http, ArtistFactory){

	$scope.showAllArtists = false;

	$http.get('/api/artists/')
	.then(artists => {
		$scope.artists = artists.data;
	});

	$scope.$on('viewAllArtists',function(){
		$scope.showAllArtists = true;
	});

	$scope.viewAllArtist = function(artist){
		ArtistFactory.getAlbums(artist)
		.then(function(albums){
			$scope.albums = albums;
		});

	}

});