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

// чEкаємо на зсув
let shift = 0;

// лічильник для слайдів
let counter = 0;

// чЕкаємо зсув
let flag = false;

// слайдер тільки у тому випадку, якщо слайди не налл (тільки на мобільному)
if(slides !== null){

    // set height from max value
    slider.style.height = `${maxHeight()}px`;

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${index * 100}%)`;
    });

    slides.forEach(slide => {
        
        // заборона перетягувати картинки
        slide.querySelector('img').addEventListener('dragstart', event => event.preventDefault());

        slide.addEventListener('pointerdown', scrollStart);
        slide.addEventListener('pointermove', scrollMove);
        slide.addEventListener('pointerup', scrollEnd);

        if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) slide.addEventListener('pointerleave', scrollEnd);

        // // touch
        // slide.addEventListener('touchstart', scrollStart, false);
        // slide.addEventListener('touchmove', scrollMove, false);
        // slide.addEventListener('touchend', scrollEnd, false);

        // // click
        // slide.addEventListener('mousedown', scrollStart, false);
        // slide.addEventListener('mousemove', scrollMove, false);
        // slide.addEventListener('mouseup', scrollEnd, false);

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

            // shift = finish - start - 20;
            shift = finish - start;

            if(flag === false){

                counter++;
                flag = true;
            }
        } 
        
        // якщо тягнемо вправо
        if(finish - start > 0) { 

            // shift = Math.abs(start - finish) + 20;
            shift = Math.abs(start - finish);

            if(flag === false){

                counter--;
                flag = true;
            }
        }

        slides.forEach(slide => slide.style.transform = `translateX(${shift}px)`);

    }
}

function scrollEnd(){
    
    // якщо тягнемо вліво
    if(finish - start < 0) {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * 100 - 100}%)`;

            // slides[index + counter].style.transform = `translateX(${})`;
        });
    }

    // якщо тягнемо вправо
    if(finish - start > 0) {
        slides.forEach((slide, index) => {
            slide.style.transform = `translateX(${index * 100 + 100}%)`;

            // slides[index - counter].style.transform = ``;
        });
    }

    // обнуляємо перевірку на перетягування
    drag = false;

    // обнуляємо перевірку на перетягування (для лічильника)
    flag = false;

    this.classList.remove('grabbing');
}

function maxHeight(){
    return Math.max(...[...slides].map(slide => slide.clientHeight));
}