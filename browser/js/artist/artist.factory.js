juke.factory('ArtistFactory', function ($q, $http) {
    var artObj = {};
    artObj.getAlbums = function (artist) {
        return $http.get("/api/artists/"+artist._id+"/albums")
                .then(function(albums){
                    return albums.data;
                })
    };
    return artObj;
});