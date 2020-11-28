var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "390",
        width: "640",
        videoId: "xtQirM784oM",
        events: {
            onReady: onPlayerReady,
            onStateChange: onStateChanged,
        },
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.setPlaybackQuality("144p");
    let video = document.getElementsByTagName("iframe")[0];
    video.style.width = 0;
    video.style.height = 0;
}

//extracts youtube id from url
function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
}
