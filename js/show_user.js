const usernameSpan = document.getElementsByClassName("span-username")[0];

auth.onAuthStateChanged((user) => {
    if (user) {
        usernameSpan.textContent = auth.currentUser.displayName;
    }
});
