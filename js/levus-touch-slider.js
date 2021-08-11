// 6-08-2021 new upgrade


// затримка
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

// TODO: додаємо клас "граббінґ" при натисканні


const slider = document.querySelector('.levus-touch-slider .slides');
// const slides = [...slider.querySelectorAll('.slide')];
const slides = slider.querySelectorAll('.slide');

// чекаємо на то, чи відбувається перетягування
let drag = false;

// стартова позиція при перетягуванні
let start = 0;

// фінішна (кінець перетягування)
let finish = 0;

slides.forEach((slide,index) => {
     
    // заборона перетягувати картинки
    slide.querySelector('img').addEventListener('dragstart', event => event.preventDefault());

    slide.addEventListener('pointerdown', scrollStart);
    slide.addEventListener('pointermove', scrollMove);
    slide.addEventListener('pointerup', scrollEnd);
    slide.addEventListener('pointerleave', scrollEnd);

});

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

        if(finish < start){

            // якщо тягнемо вліво
            this.parentNode.style.transform = `translateX(${(finish - start) - 20}px)`;
        } else { 

            // якщо тягнемо вправо
            this.parentNode.style.transform = `translateX(${Math.abs(start - finish) + 20}px)`;
        }
    }

    // this.classList.add();
}

function scrollEnd(){

    drag = false;

    this.classList.remove('grabbing', drag);
}