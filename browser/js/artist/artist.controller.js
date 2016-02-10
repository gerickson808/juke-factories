juke.controller("ArtistCtrl",function($scope,$rootScope, $http){

	$scope.showAllArtists = false;

	$http.get('/api/artists/')
	.then(artists => {
		$scope.artists = artists.data;
	});

	$scope.$on('viewAllArtists',function(){
		$scope.showAllArtists = true;
	});

});