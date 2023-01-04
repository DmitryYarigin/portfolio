
const body = document.querySelector("body");

import i180bj from '/js/translate.js';

"use strict"

const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return(
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows() );
    }
};

if(isMobile.any()) {
    document.body.classList.add('_touch');
   
    let menuArrows = document.querySelectorAll('.menu__arrow');
    if(menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++){
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener("click", function(e){
                menuArrow.parentElement.classList.toggle('_active');
            });
        }
    }
} else {
    document.body.classList.add('_pc');
}
// Меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.nav-list');
const nav = document.querySelector('.nav');
if(iconMenu){
    
    iconMenu.addEventListener("click",(e) => {
        document.body.classList.toggle('_lock');
        iconMenu.classList.toggle('_active');
        menuBody.classList.toggle('_active');
        nav.classList.toggle('_active');
        });
}
//  Прокрутка при клике

const menuLinks = document.querySelectorAll('.nav-link[data-goto]');
if(menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });

    function onMenuLinkClick(e){
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)){
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('.header').offsetHeight;

            if(iconMenu.classList.contains('_active')){
                document.body.classList.remove('_lock');
                iconMenu.classList.remove('_active');
                menuBody.classList.remove('_active');
                nav.classList.remove('_active');
            }
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
            e.preventDefault(); 
        }
    }
}
// СМЕНА КАРТИНКИ

// находим кнопку
const portfolioBtn = document.querySelector('.button-black');
// находим все изображения
const portfolioImages = document.querySelectorAll('.portfolio-image');

//const portfolioBtns = document.querySelectorAll('.buttons-switch');

/*function changeImage(event){
    if(event.target.classList.contains('button-black')){
        portfolioBtns.addEventListener('click', () => {
            portfolioImages.forEach((img, index) => img.src = `./assets/img/${div.dataset.season}/${index + 1}.jpg`);
        });
    }
}
*/

const portfolioBtns = document.querySelector('.buttons-switch');

function changeImage(event) {
    if(event.target.classList.contains('button-black')){
        portfolioImages.forEach((img, index) => img.src = `./assets/img/${event.target.dataset.season}/${index+1}.jpg`);
    }
}

portfolioBtns.addEventListener('click', changeImage);

// кэширование

function preloadImages() {
    const seasons = ['winter', 'spring', 'summer', 'autumn'];

    seasons.forEach ((element) => {
        for (let index = 1; index <= 6; index++) {
            const img = new Image();
            
            img.src = `./assets/img/${element}/${index}.jpg`
        }
    });
}

preloadImages();

// подсветка активной кнопки

const portfolioButtons = document.querySelectorAll('.button-black');

for(var i = 0; i < portfolioButtons.length; i++){
    portfolioButtons[i].addEventListener("click", function(){
        var current = document.getElementsByClassName("active");

        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }

        this.className += " active";
    });
} 

// ===== функция перевода страницы
let langDefault = "en";

let linkLang = document.querySelectorAll('toggle-language');

const languageBtns = document.querySelectorAll("[data-lang]");

function getTranslate(lang) {
    const words = document.querySelectorAll('[data-i18n]');
    words.forEach(word => {
        word.innerText = i180bj[lang][word.dataset.i18n];
        });
    email.placeholder = i180bj[lang]['email'];
    phone.placeholder = i180bj[lang]['phone'];
    message.placeholder = i180bj[lang]['message'];
};

document.addEventListener("click", (event) => {
    const target = event.target;
    if (target.dataset.lang) {
        getTranslate(target.dataset.lang);
    } 
})

// ============= переключение на светлую и темную тему и изменение иконки

let themeDefault = "dark";

const themeButton = document.querySelector('.color-theme');
console.log(themeButton);

function changeTheme() {
    themeButton.addEventListener("click", () => {
        if (themeDefault === "dark") {
            body.classList.add("light-theme");
            themeDefault = "light";
        } else {
            body.classList.remove("light-theme");
            themeDefault = "dark";
        }
        setTheme(themeDefault);
    });
}
changeTheme();
// тоже уберем мою версию

// let myArr = ['.section-skills', '.section-portfolio', '.section-video', '.section-price', '.footer', '.icon', '.skill-item','.card-title', '.card-about', '.footer-link', '.body', '.hero', '.section-title', '.button-black', '.hero-button']


// const sectionSkills = document.querySelectorAll(myArr)

// function changeTheme() {
//     console.log(themeButton);
//     themeButton.addEventListener("click", () => {

//     const moonSvg = 

    // `<svg class="icon">
    //     <use xlink:href="sprite.svg#moon" data-theme="dark-theme"></use>
    // </svg>
    // <path d="M21.4528 40C15.7066 40 10.315 37.8174 6.27098 33.8545C2.22701 29.8915 5.02421e-07 24.6074 5.02421e-07 18.9761C-0.00085731 15.0913 1.09674 11.2823 3.17098 7.97181C5.24521 4.66132 8.21494 1.97886 11.7505 0.222165C12.1143 0.0404498 12.5246 -0.032245 12.9302 0.0131555C13.3359 0.058556 13.7189 0.220041 14.0315 0.477451C14.344 0.734861 14.5723 1.07679 14.6878 1.46057C14.8033 1.84434 14.8009 2.25294 14.6809 2.63538C13.672 5.82896 13.5728 9.23201 14.3941 12.4768C15.2154 15.7216 16.9259 18.6847 19.3408 21.046C21.0739 22.757 23.136 24.1141 25.4078 25.0388C27.6796 25.9635 30.116 26.4374 32.576 26.433C34.4579 26.4345 36.3292 26.1578 38.1269 25.6125C38.5172 25.4948 38.9342 25.4924 39.3258 25.6056C39.7175 25.7188 40.0665 25.9425 40.3291 26.2488C40.5918 26.5552 40.7566 26.9306 40.8029 27.3282C40.8492 27.7257 40.775 28.1279 40.5895 28.4843C38.7969 31.9492 36.0597 34.8596 32.6817 36.8923C29.3036 38.9251 25.4169 40.0008 21.4528 40ZM11.6763 3.31431C8.93463 4.94908 6.66986 7.24958 5.10105 9.99327C3.53225 12.737 2.71252 15.831 2.72115 18.9761C2.72115 29.0982 11.1241 37.3333 21.4528 37.3333C24.6621 37.3418 27.8193 36.5384 30.619 35.001C33.4187 33.4636 35.7662 31.2441 37.4343 28.5573C35.8413 28.9186 34.2113 29.1007 32.5762 29.1C29.7587 29.1053 26.9682 28.5628 24.3661 27.5041C21.764 26.4453 19.4021 24.8913 17.417 22.9319C14.8382 20.4094 12.9578 17.2845 11.9533 13.8522C10.9489 10.4199 10.8536 6.79329 11.6763 3.31481V3.31431Z" fill="white"></path>`;

    // const sunSvg = 
    //     `<svg width="36" height="36" class="icon-theme" data-theme="white-theme">
    //     <use xlink:href="sprite.svg#sun"></use>
    //     </svg>
    //     <path d="M22.5 16.8821C23.6125 16.8821 24.7001 17.212 25.6251 17.8301C26.5501 18.4481 27.2711 19.3267 27.6968 20.3545C28.1226 21.3823 28.234 22.5133 28.0169 23.6045C27.7999 24.6956 27.2641 25.6979 26.4775 26.4846C25.6908 27.2712 24.6885 27.807 23.5974 28.024C22.5062 28.241 21.3752 28.1296 20.3474 27.7039C19.3196 27.2782 18.4411 26.5572 17.823 25.6322C17.2049 24.7071 16.875 23.6196 16.875 22.5071C16.8769 21.0158 17.4701 19.5861 18.5246 18.5317C19.5791 17.4772 21.0087 16.8839 22.5 16.8821ZM22.5 14.0696C20.8312 14.0696 19.1999 14.5644 17.8124 15.4916C16.4248 16.4187 15.3434 17.7364 14.7048 19.2782C14.0662 20.8199 13.8991 22.5164 14.2246 24.1532C14.5502 25.7899 15.3538 27.2933 16.5338 28.4733C17.7138 29.6533 19.2172 30.4569 20.8539 30.7825C22.4906 31.108 24.1871 30.9409 25.7289 30.3023C27.2706 29.6637 28.5884 28.5822 29.5155 27.1947C30.4427 25.8072 30.9375 24.1759 30.9375 22.5071C30.9375 20.2693 30.0486 18.1232 28.4662 16.5409C26.8839 14.9585 24.7378 14.0696 22.5 14.0696Z"></path>
    //     <path d="M7.58521 9.58066L9.57364 7.59082L14.504 12.5211L12.5155 14.5096L7.58521 9.58066Z" ></path>
    //     <path d="M2.8125 21.1008H9.84375V23.9133H2.8125V21.1008Z" ></path>
    //     <path d="M7.58521 35.4332L12.5155 30.5029L14.504 32.4928L9.57364 37.4217L7.58521 35.4332Z"></path>
    //     <path d="M21.0938 35.1633H23.9062V42.1946H21.0938V35.1633Z" ></path>
    //     <path d="M30.4973 32.4928L32.4858 30.5029L37.4161 35.4332L35.4276 37.4217L30.4973 32.4928Z"></path>
    //     <path d="M35.1562 21.1008H42.1875V23.9133H35.1562V21.1008Z" ></path>
    //     <path d="M30.4973 12.5211L35.4276 7.59082L37.4161 9.58066L32.4858 14.5096L30.4973 12.5211Z"></path>
    //     <path d="M21.0938 2.81958H23.9062V9.85083H21.0938V2.81958Z" ></path>
    //     `

//     if(themeButton.innerHTML === moonSvg){
//         themeButton.innerHTML = sunSvg;
//         setLocalStorage('theme', 'light');
//     } else{
//         themeButton.innerHTML = moonSvg;
//         localStorage.removeItem('theme');
//     }

//     sectionSkills.forEach((elem) =>{
//         elem.classList.toggle("light-theme");   
//     })
//     setTheme(themeDefault);
//   }

// =========== local storage ===========

function getLocalStorage() {
    const theme = localStorage.getItem("theme");

    if(theme) {
        themeDefault = theme;

        if (theme === "light") {
            body.classList.add("light-theme");
        } else {
            body.classList.remove("ligth-theme");
        }
    }

    const lang = localStorage.getItem("lang");

    if(lang) {
        linkLang.forEach((lang) => lang.classList.remove("_active"));

        linkLang.forEach((link) => {
            if(link.textContent === lang) {
                link.classList.add("_active");
            }
        });
        
        getTranslate(lang);
    }
}

const setTheme = (theme) => {
    localStorage.setItem("theme", theme);
};

const setLang = (lang) => {
    localStorage.setItem("lang", lang);
};

window.addEventListener("beforeunload", () => {
    setTheme(themeDefault);
    setLang(langDefault);
});

window.addEventListener("load", getLocalStorage)
