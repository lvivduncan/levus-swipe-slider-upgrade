// 11-08-2021

// mobile devices https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
// var touchDevice = (navigator.maxTouchPoints || 'ontouchstart' in document.documentElement);

// if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))

// затримка (для ресайзу)
function debounce(callback, delay) {

    // замикаємо змінну
    let timer;

    return function(...args){
        clearTimeout(timer);
        timer = setTimeout( () => {
            callback.apply(this, args);
        }, delay);
    }

}

/* 
window.addEventListener('resize', debounce((e) => {
    console.log('test')
}, 120)); // default 30
 */


// TODO: кількість елементів, враховувати поточний

// TODO: клонованим додаємо клас, за яким будемо ховати на десктопі

// TODO: якщо менше 3, то не клонуємо

// TODO: додаємо клас "граббінґ" при натисканні


const slider = document.querySelector('.levus-touch-slider .slides');
// const slides = [...slider.querySelectorAll('.slide')];

// на десктопі робимо налл, на мобільному нодлист
let slides = slider.querySelectorAll('.slide');

// десктор -- скидаємо в налл
// slides = null;

// чекаємо на то, чи відбувається перетягування
let drag = false;

// стартова позиція при перетягуванні
let start = 0;

// фінішна (кінець перетягування)
let finish = 0;

// останній елемент
let last = '';

// перший елемент
let first = '';

// чекаємо на зсув
let shift = 0;

// чекаємо на створення ноди
let createNode = false;

// встановлюємо параметри слайдера 
const length = slides.length;
const width = length * 100;


// shift
let transition = 0;

// const percent = 100 / length;

// слайдер тільки у тому випадку, якщо слайди не налл (тільки на мобільному)
if(slides !== null){
                            
    // slider.style.cssText = `display: grid; grid-template-columns: repeat(${length},1fr); width: ${width}%; cursor: grab; margin-left: -100%`;

    slider.style.display = 'grid';
    slider.style.gridTemplateColumns = `repeat(${length},1fr)`;
    slider.style.width = `${width}%`;
    slider.style.cursor = 'grab';
    slider.style.marginLeft = '-100%';

    slides.forEach(slide => {
        
        // заборона перетягувати картинки
        slide.querySelector('img').addEventListener('dragstart', event => event.preventDefault());

        // slide.addEventListener('pointerdown', scrollStart);
        // slide.addEventListener('pointermove', scrollMove);
        // slide.addEventListener('pointerup', scrollEnd);

        // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) slide.addEventListener('pointerleave', scrollEnd);

        // touch
        slide.addEventListener('touchstart', scrollStart, false);
        slide.addEventListener('touchmove', scrollMove, false);
        slide.addEventListener('touchend', scrollEnd, false);

        // click
        slide.addEventListener('mousedown', scrollStart, false);
        slide.addEventListener('mousemove', scrollMove, false);
        slide.addEventListener('mouseup', scrollEnd, false);

    });
}

function scrollStart(event){

    drag = true;

    this.classList.add('grabbing');

    // місце, де клікнули
    start = event.pageX;
}

function scrollMove(event){

    if(drag){

        // місце, до якого тягнули
        finish = event.pageX;

        // якщо тягнемо вліво
        if(finish - start < 0){

            shift = finish - start - 20;

            if(createNode === false){

                // 1 раз 
                // last = slider.lastElementChild;
                // slider.prepend(last);

                last = slider.lastElementChild;
                slider.prepend(last);

                // shift all slides
                slides.forEach(item => item.style.transform = `translateX(-100%)`);

                createNode = true;
            }
        } 
        
        // якщо тягнемо вправо
        if(finish - start > 0) { 

            shift = Math.abs(start - finish) + 20;

            if(createNode === false){
                
                // 1 раз 
                // first = slider.firstElementChild;
                // slider.append(first);

                last = slider.lastElementChild;
                slider.prepend(last);

                // shift all slides
                slides.forEach(item => item.style.transform = `translateX(100%)`);

                createNode = true;
            }
        }

        slider.style.transform = `translateX(${shift}px)`;

    }
}

function scrollEnd(){

    // повертаємо статус кво
    
    // // якщо тягнемо вліво
    // if(finish - start < 0) {

    //     // last = slider.lastElementChild;
    //     // slider.prepend(last);
    //     // transition -= percent;

    // }

    // // якщо тягнемо вправо
    // if(finish - start > 0) {

    //     // first = slider.firstElementChild;
    //     // slider.append(first);
    //     // transition += percent;
    // }
    
    // slider.style.transform = `translateX(${transition}%)`;
    
    
    setTimeout(() => {
        slider.style.transform = `translateX(0)`;
        slides.forEach(item => item.style.transform = `translateX(0)`);

        // обнуляємо перевірку на створення ноди
        createNode = false;        
    },500);

    // обнуляємо перевірку на перетягування
    drag = false;


    
    this.classList.remove('grabbing');

    console.log(transition)
}