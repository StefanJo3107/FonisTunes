const db = firebase.firestore();

let leaderboardRef;
let unsubscribe;

const currentMode = document.getElementsByClassName("current-mode")[0];
const leaderboard = document.getElementsByClassName("scores")[0];

auth.onAuthStateChanged((user) => {
    if (user) {
        showLeaderboard(currentMode.firstChild.nodeValue.trim());
    } else {
        unsubscribe && unsubscribe();
        leaderboard.innerHTML = "";
    }
});

function showLeaderboard(mode) {
    currentMode.firstChild.nodeValue = mode;
    leaderboardRef = db.collection("leaderboard");
    unsubscribe = leaderboardRef
        .where("mode", "==", mode.toLowerCase())
        .orderBy("score", "desc")
        .limit(10)
        .onSnapshot((querySnapshot) => {
            const items = querySnapshot.docs.map((doc) => {
                console.log(doc.data().score);
                return `<tr><td>${doc.data().username}</td><td>${
                    doc.data().score
                }</td></tr>`;
            });
            leaderboard.innerHTML = items.join("");
        });
}
