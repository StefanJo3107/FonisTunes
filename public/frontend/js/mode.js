const logoutButtonMode = document.querySelector('.btn-mode.logout');
logoutButtonMode.addEventListener('click', () => window.location.replace("index.html"));

const mode = document.querySelectorAll('.post-slider .post');
mode.forEach(mode => mode.addEventListener('click', () => window.location.replace("game.html")))

$('.post-wrapper').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
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
