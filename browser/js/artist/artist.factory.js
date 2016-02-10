juke.factory('ArtistFactory', function ($q, $http) {
    var artObj = {};
    artObj.getAlbums = function (artist) {
        return $http.get("/api/artists/"+artist._id+"/albums")
                .then(function(albums){
                    return albums.data;
                })
    };

    artObj.getSongs = function (artist) {
        return $http.get("/api/artists/"+artist._id+"/songs")
                .then(function(songs){
                    return songs.data;
                })
    };

    return artObj;
});