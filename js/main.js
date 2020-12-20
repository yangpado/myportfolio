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

//scroll event
const skille = document.querySelector('#skills');
const skillHeight = skille.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
    if(window.scrollY > skillHeight){
        skille.classList.add('fadeInLeft');
    } else{
        skille.classList.remove('fadeInLeft');
    }

})


// Handel scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar_menu_ul');
navbarMenu.addEventListener('click',(event) => {
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        return
    }
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
    selectNavItem(target);
});

// navbar 토글버튼 
const navbarToggleBtn = document.querySelector('.navbar_toggle_btn');
navbarToggleBtn.addEventListener('click', () => {
    navbarMenu.classList.toggle('open');
    
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

    // 새로 클릭된 객체에 active class 주기
    const active = document.querySelector('.category_btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
    target.classList.add('selected');

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


// intersectionobserver 
// 1. 모든 섹션 요소들과 메뉴아이템을 가지고 온다.
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 확성화 시킨다.

const sectionIds = [
    '#home', 
    '#about',
    '#skills',
    '#work',
    '#testimonials',
    '#contact',
];
const sections = sectionIds.map(id => document.querySelector(id));
//console.log(sections);
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
//console.log(navItems);
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    selectedNavItem.classList.add('active');    
}

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}


const observerOptions = {
    root:null,
    rootMargin:'0px',
    threshold:0.3,
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0) {
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            //console.log(index,entry.target.id );
            if(entry.boundingClientRect.y <0 ) {
                selectedNavIndex = index + 1;
            } else{
                selectedNavIndex = index - 1;
            }
        }
    });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

window.addEventListener('wheel', ()=>{
    if(window.scrollY === 0) {
        selectedNavIndex = 0;
    } else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
        selectedNavIndex = navItems.length -1;
    }
    selectNavItem(navItems[selectedNavIndex]);
});