const auth = firebase.auth();

const playButton = document.getElementsByClassName("btn-start")[0];
const playSpan = document.getElementsByClassName("span-play")[0];

const provider = new firebase.auth.GoogleAuthProvider();

if (auth.currentUser) playSpan.textContent = "PLAY";
else playSpan.textContent = "SIGN IN";

playButton.onclick = () => {
    if (auth.currentUser) {
        window.location.replace("mode.html");
    } else {
        auth.signInWithPopup(provider);
    }
};

auth.onAuthStateChanged((user) => {
    if (user) {
        window.location.replace("mode.html");
    }
});
