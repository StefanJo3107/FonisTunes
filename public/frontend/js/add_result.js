const db = firebase.firestore();

let leaderboardRef;

auth.onAuthStateChanged((user) => {
    if (user && sessionStorage.mode) {
        leaderboardRef = db.collection("leaderboard");
        leaderboardRef.add({
            uid: user.uid,
            username: user.displayName,
            mode: sessionStorage.mode,
            score: sessionStorage.score,
        });

        sessionStorage.removeItem("feedback");
        sessionStorage.removeItem("mode");
        sessionStorage.removeItem("score");
    }
});
