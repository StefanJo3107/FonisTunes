//Redirect to mode page
// const startButtonFirst = document.querySelector('.btn-start');
// startButtonFirst.addEventListener('click', () => window.location.replace("mode.html"));
//Modal
const btnAbout = document.querySelector(".btn-info");
btnAbout.addEventListener("click", openModal);

const modalAbout = document.querySelector(".modal");
const closeX = document.querySelector(".close-x");

closeX.addEventListener("click", closeModal);

function openModal() {
    modalAbout.classList.remove("modal-hidden");
}

function closeModal() {
    modalAbout.classList.add("modal-hidden");
}

const btnQuality = document.querySelector(".btn-sett");
btnQuality.addEventListener("click", openModalQuality);

const modalQuality = document.querySelector(".modalQuality");
const closeQuality = document.querySelector(".closeQuality");

closeQuality.addEventListener("click", closeModalQuality);
function openModalQuality() {
    modalQuality.classList.remove("modal-hidden");
}

function closeModalQuality() {
    modalQuality.classList.add("modal-hidden");
}
