// 11-08-2021


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
let last = null;

// перший елемент
let first = null;

// слайдер тільки у тому випадку, якщо слайди не налл (тільки на мобільному)
if(slides !== null){

    // встановлюємо параметри слайдера 
    const length = slides.length;
    const width = length * 100;

    slider.style.cssText = `display: grid; 
                            grid-template-columns: repeat(${length},1fr); 
                            width: ${width}%; 
                            cursor: grab; 
                            position: relative;
                            left: -100%`;

    slides.forEach(slide => {
        
        // заборона перетягувати картинки
        slide.querySelector('img').addEventListener('dragstart', event => event.preventDefault());

        slide.addEventListener('pointerdown', scrollStart);
        slide.addEventListener('pointermove', scrollMove);
        slide.addEventListener('pointerup', scrollEnd);

        // test
        // slide.addEventListener('pointerleave', scrollStop);
        slide.addEventListener('pointerleave', scrollEnd);
        
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

        if(finish - start < 0){

            // якщо тягнемо вліво
            this.parentNode.style.transform = `translateX(${(finish - start) - 20}px)`;

            last = slider.lastElementChild;

            // clear
            first = null;
        } 
        
        if(finish - start > 0) { 

            // якщо тягнемо вправо
            this.parentNode.style.transform = `translateX(${Math.abs(start - finish) + 20}px)`;

            first = slider.firstElementChild;

            // clear
            last = null;

        }

    }
}

function scrollEnd(){

    // якщо тягнемо вправо (негатив) -- скролимо
    if(finish - start < 0){ 

        // last = slider.lastElementChild;
        slider.prepend(last);

        // slider.style.transform = `translateX(calc(100/${length}%))`;

        setTimeout(() => {

            slider.style.transform = 'translateX(0)';
        }, 240);

    }

    // якщо тягнемо вліво (позитив) -- скролимо
    if(finish - start > 0){

        // first = slider.firstElementChild;
        slider.append(first);

        // slider.style.transform = `translateX(-100/${length}%)`;

        setTimeout(() => {

            slider.style.transform = 'translateX(0)';
        }, 240);

    }

    drag = false;
    
    this.classList.remove('grabbing');
}

function scrollStop(){
    
    drag = false;
}