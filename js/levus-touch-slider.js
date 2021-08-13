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

// на десктопі робимо налл, на мобільному нодлист
let slides = slider.querySelectorAll('.slide');
// let slides = [...slider.querySelectorAll('.slide')];

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

// встановлюємо параметри слайдера 
const length = slides.length;
const width = length * 100;
const percent = 100 / length;

// shift
let transition = 0;

// слайдер тільки у тому випадку, якщо слайди не налл (тільки на мобільному)
if(slides !== null){
                            
    slider.style.cssText = `display: grid; grid-template-columns: repeat(${length},1fr); width: ${width}%; cursor: grab; margin-left: -100%`;

    slides.forEach(slide => {
        
        // заборона перетягувати картинки
        slide.querySelector('img').addEventListener('dragstart', event => event.preventDefault());

        slide.addEventListener('pointerdown', scrollStart);
        slide.addEventListener('pointermove', scrollMove);
        slide.addEventListener('pointerup', scrollEnd);

        // TODO: check mobile
        // slide.addEventListener('pointerleave', scrollEnd);
        
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



            first = slider.firstElementChild;
            // slider.append(first);
            // slider.style.transitionX = `100%`;
        } 
        
        // якщо тягнемо вправо
        if(finish - start > 0) { 

            shift = Math.abs(start - finish) + 20;



            last = slider.lastElementChild;
            slider.prepend(last); 
            slider.style.transitionX = `-100%`;
        }

        // slider.style.transform = `translateX(${shift}px)`;
        slider.style.marginLeft = `${shift}px`;
    }
}

function scrollEnd() {

    // якщо тягнемо вліво
    if(finish - start < 0){

        // transition -= percent;
        transition -= 100;

        // first = slider.firstElementChild;
        slider.append(first);
        slider.style.transitionX = `100%`;
        setTimeout(()=>{
            slider.style.transitionX = `0`;
        },500);
        
        // slider.style.transitionX = `0`;
    }
    
    // якщо тягнемо вправо
    if(finish - start > 0) {

        // transition += percent;
        transition += 100;

        // last = slider.lastElementChild;
        slider.prepend(last); 
        slider.style.transitionX = `-100%`;
        setTimeout(()=>{
            slider.style.transitionX = `0`;
        },500);
        
        // slider.style.transitionX = `0`;
    }
    
    // slider.style.transform = `translateX(${transition}%)`;
    slider.style.marginLeft = `${transition}%`;

    // обнуляємо перевірку на перетягування
    drag = false;
    
    this.classList.remove('grabbing');
}