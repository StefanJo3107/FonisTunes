const logout = document.getElementsByClassName("logout")[0];

logout.onclick = () => {
    auth.signOut();
};
