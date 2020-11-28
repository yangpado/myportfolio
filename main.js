'use strict'

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {

    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    } else{
        navbar.classList.remove('navbar--dark');
    }
});

// Handel scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar_menu');
navbarMenu.addEventListener('click',(event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return
    }

    scrollIntoView(link);
});

// Handle click on Contact me button on home 
const homeContactBtn = document.querySelector('.home_contact');
homeContactBtn.addEventListener('click',() => {
    scrollIntoView('#contact');
});

// make home slowly fade to transparent as the window scrolls down 
const home = document.querySelector('.home_container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    //console.log(1 - window.scrollY / homeHeight);
    home.style.opacity = 1 - window.scrollY / homeHeight;
});

// show arrow up btn when scroll down 
const arrowUp = document.querySelector('.arrow_up');
document.addEventListener('scroll',() => {
    if(window.scrollY > homeHeight/2) {
        arrowUp.classList.add('visible');
    } else{
        arrowUp.classList.remove('visible');
    }
});

// Handle click on the "arrow up" button
arrowUp.addEventListener('click',() => {
    scrollIntoView('#home');
});

//Project
const workBtnContainer = document.querySelector('.work_categories');
const projectContainer = document.querySelector('.work_projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click',(e)=>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null) {
        return;
    }
    //console.log(filter);
    projectContainer.classList.add('anim-out');
    
    setTimeout(() => {
        
        projects.forEach((project) => {
            //console.log(project);
            if(filter === '*' || filter === project.dataset.filter) {
                project.classList.remove('invisible');
            } else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    },300);
});

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
}
