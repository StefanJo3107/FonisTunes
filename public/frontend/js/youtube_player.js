var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        height: "200",
        width: "200",
        videoId: "xtQirM784oM",
        events: {
            onReady: onPlayerReady,
            onStateChange: onStateChanged,
            onError: onPlayerError,
        },
    });
}

//extracts youtube id from url
function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
}
