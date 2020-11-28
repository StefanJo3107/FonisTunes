const artistURL =
    "https://cors-anywhere.herokuapp.com/https://www.randomlists.com/data/bands.json";
const artistidURL = "https://theaudiodb.com/api/v1/json/1/search.php?s=";
const allMusicVideosURL = "https://theaudiodb.com/api/v1/json/1/mvid.php?i=";
const trackURL = "https://theaudiodb.com/api/v1/json/1/track.php?h=";

function getRandomArtist() {
    return axios
        .request("./musicAPI/bands.json")
        .then(function (response) {
            return response.data.RandL.items[
                Math.floor(Math.random() * response.data.RandL.items.length)
            ].name
                .split(" ")
                .join("_")
                .toLowerCase();
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
    let mvideo = undefined;
    return getRandomArtist()
        .then((name) => {
            return getArtistID(name);
        })
        .then((artistID) => {
            return getRandomMusicVideo(artistID);
        })
        .then((mvid) => {
            mvideo = mvid;
            return getTrack(mvid.idTrack);
        })
        .then((track) => {
            if (track.strTrack !== undefined) {
                return {
                    artist: track.strArtist,
                    album: track.strAlbum,
                    track: track.strTrack,
                    genre: track.strGenre,
                    mvideo: mvideo.strMusicVid,
                };
            }
        });
}

function fetchMultipleTracks(numOfTracks) {
    let tracks = [];
    for (let i = 0; i < 2 * numOfTracks; i++) {
        fetchRandomData().then((data) => console.log(data));
    }
}
