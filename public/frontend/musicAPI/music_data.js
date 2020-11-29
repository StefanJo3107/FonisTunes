const artistidURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=";
const allMusicVideosURL = "https://theaudiodb.com/api/v1/json/1/mvid.php?i=";
const trackURL = "https://theaudiodb.com/api/v1/json/1/track.php?h=";

function getRandomArtist() {
    return axios
        .request("./musicAPI/bands.json")
        .then(function (response) {
            return response
                .data.RandL.items[Math.floor(Math.random() * response.data.RandL.items.length)].name;
        })
        .catch(function (error) {
            return "";
        });
}

function getArtistID(artistName) {
    return axios
        .request(artistidURL + artistName)
        .then(function (response) {
            return response.data.artists[0].idArtist;
        })
        .catch(function (error) {
            return "";
        });
}

function getRandomMusicVideo(artistID) {
    return axios
        .request(allMusicVideosURL + artistID)
        .then(function (response) {
            return response
                .data.mvids[Math.floor(Math.random() * response.data.mvids.length)];
        })
        .catch(function (error) {
            return "";
        });
}

function getTrack(trackID) {
    return axios
        .request(trackURL + trackID)
        .then(function (response) {
            return response.data.track[0];
        })
        .catch(function (error) {
            return "";
        });
}

function fetchRandomData() {
    let artistName = "";
    return getRandomArtist()
        .then((name) => {
            artistName = name;
            return getArtistID(name.split(" ").join("_").toLowerCase());
        })
        .then((artistID) => {
            return getRandomMusicVideo(artistID);
        })
        .then((mvid) => {
            if (mvid.strTrack !== undefined) {
                return {
                    artist: artistName,
                    track: mvid.strTrack,
                    mvideo: mvid.strMusicVid,
                };
            }
        });
}

function fetchArtistData(artist) {
    return getArtistID(artist.split(" ").join("_").toLowerCase())
        .then((artistID) => {
            return getRandomMusicVideo(artistID);
        })
        .then((mvid) => {
            if (mvid.strTrack !== undefined) {
                return {
                    artist: artist,
                    track: mvid.strTrack,
                    mvideo: mvid.strMusicVid,
                };
            } else {
                return undefined;
            }
        });
}

function fetchMultipleTracks(numOfTracks) {
    let tracks = [];
    for (let i = 0; i < 2 * numOfTracks; i++) {
        fetchRandomData().then((data) => console.log(data));
    }
}
