const source1 = document.getElementById("source-1");

getRandomArtist().then((name) => {
    getArtistID(name).then((artistID) => {
        getRandomMusicVideo(artistID).then((mvid) => {
            getTrack(mvid.idTrack).then((track) => {
                if (track.strTrack != undefined) {
                    // console.log(
                    //     `Artist:${track.strArtist},\nAlbum:${track.strAlbum},\nTrack:${track.strTrack},\nGenre:${track.strGenre},\nURL:${mvid.strMusicVid}`
                    // );
                    source1.src = `https://www.youtube-nocookie.com/embed/${getId(
                        mvid.strMusicVid
                    )}?autoplay=1`;
                    // return {
                    //     artist: track.strArtist,
                    //     album: track.strAlbum,
                    //     track: track.strTrack,
                    //     genre: track.strGenre,
                    //     url: track.strMusicVid,
                    // };
                }
            });
        });
    });
});

function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
}
