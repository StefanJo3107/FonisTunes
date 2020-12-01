//Loading
// window.onload = () => {
//     setTimeout(() => {
//         document.querySelector("body").classList.add("display");
//     }, 5000);
// };

//Redirect to mode page
const logoutButtonMode = document.querySelector(".btn-mode.quit");
logoutButtonMode.addEventListener("click", () =>
    window.location.replace("mode.html")
);
