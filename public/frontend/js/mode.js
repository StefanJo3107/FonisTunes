const logoutButtonMode = document.querySelector('.btn-mode.logout');
logoutButtonMode.addEventListener('click', () => window.location.replace("index.html"));

const mode = document.querySelectorAll('.post-slider .post');
mode.forEach(mode2 => {
    mode2.addEventListener('click', () => {
        if(mode2.id == 'sliderChoose'){
            mode2.addEventListener('click', openModal);
        }
        else{
            mode2.addEventListener('click', () => window.location.replace("game.html"))
        }
    });
});



$('.post-wrapper').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: $('.next'),
    prevArrow: $('.prev'),
  });

//tilt
$(document).ready(function(){
    $('.post img').tilt({
        maxTilt: 10,
        glare: true,
        maxGlare: .4
    })
});
const tabItems = document.querySelectorAll('.tab-item');
const tabContents = document.querySelectorAll('.tab-content-item');
//just toggling classes so it can be single page
function display(){
    tabItems.forEach(tab => {
        tab.classList.remove('tab-border');
    });
    tabContents.forEach(tab => {
        tab.classList.remove('show');
    });
    this.classList.toggle('tab-border');
    if(this === document.querySelector('#tab-1')){
        document.querySelector('#tab-1-content').classList.add('show'); 
        document.querySelector('.slider-title.choose').classList.remove('hide');    
    } else 
    if(this === document.querySelector('#tab-2')){
        document.querySelector('#tab-2-content').classList.add('show');
        document.querySelector('.slider-title.choose').classList.add('hide');
    }
}

tabItems.forEach(tab => tab.addEventListener('click', display));

//Modal for mode
const  modalChoose = document.querySelector('.modal-choose');
const closeX = document.querySelector('.close-x');

closeX.addEventListener('click', closeModal);

function openModal(){
    modalChoose.classList.remove('modal-hidden');
}

function closeModal(){
    modalChoose.classList.add('modal-hidden');
}
const pickPlay = document.querySelector('submit-btn');
pickPlay.addEventListener('click', () => window.location.replace("game.html"));