//Redirect to mode page
const startButtonFirst = document.querySelector('.btn-start');
startButtonFirst.addEventListener('click', () => window.location.replace("mode.html"));
//Modal
const btnAbout = document.querySelector('.btn-info');
btnAbout.addEventListener('click', openModal);

const modalAbout = document.querySelector('.modal');
const closeX = document.querySelector('.close-x');

closeX.addEventListener('click', closeModal);

function openModal(){
    modalAbout.classList.remove('modal-hidden');
}

function closeModal(){
    modalAbout.classList.add('modal-hidden');
}