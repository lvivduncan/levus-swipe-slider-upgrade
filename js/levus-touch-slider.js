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

let slides = slider.querySelectorAll('.slide');

// desktop
// slides = null;

// check drag
let drag = false;

// start drag pointer
let start = 0;

// finish drag pointer
let finish = 0;

// check shift
let shift = 0;

// check shift
let flag = false;

// clone elements
slides.forEach(slide => {
    const clone = slide.cloneNode(true);
    clone.classList.add('clone');
    slider.append(clone);
});

// create array shift translateX
const translate = [];

// slider if window.innerWidth < 776 (mobile)
if(slides !== null){

    // set height from max value
    slider.style.height = `${maxHeight()}px`;

    // newest nodeList
    slides = slider.querySelectorAll('.slide');

    // fill array items
    for(let i = 0; i < slides.length; i++){
        translate.push(i * 100 - 200);
    }

    render();

    // events
    slides.forEach(slide => {
        
        // drag picture false
        slide.querySelector('img').addEventListener('dragstart', event => event.preventDefault());

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

    // where they clicked
    start = event.pageX || event.touches[0].clientX;
}

function scrollMove(event){

    if(drag){

        // where they dragged
        finish = event.pageX || event.touches[0].clientX;

        // if to left
        if(finish - start < 0){

            shift = finish - start;

            if(flag === false){

                flag = true;
            }
        } 
        
        // if to right
        if(finish - start > 0) { 

            shift = Math.abs(start - finish);

            if(flag === false){

                flag = true;
            }
        }

        this.style.transform = `translateX(${shift}px)`;

    }
}

function scrollEnd(){

    // to right
    if(finish - start < 0){
        
        const first = translate.pop();
        translate.unshift(first);
    } 

    // to left
    if(finish - start > 0) {
        
        const last = translate.shift();
        translate.push(last);
    }

    render();

    // set null
    drag = false;

    // set null
    flag = false;

    this.classList.remove('grabbing');
}

// max height slides
function maxHeight(){
    return Math.max(...[...slides].map(slide => slide.clientHeight));
}

function render(){
    for(let i = 0; i < slides.length; i++){

        if(translate[i] === 0 || translate[i] === 100 || translate[i] === -100){
            slides[i].style.opacity = 1;
        } else{
            slides[i].style.opacity = 0;
        }
        
        slides[i].style.transform = `translateX(${translate[i]}%)`;
    }
}