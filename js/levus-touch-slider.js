// 16-08-2021

const slider = document.querySelector('.levus-touch-slider .slides');

let slides = slider.querySelectorAll('.slide');

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
for(let i = 0; i < slides.length; i++){
    const clone = slides[i].cloneNode(true);
    clone.classList.add('clone');
    slider.append(clone);
}

// create array shift translateX
const translate = [];

// newest nodeList
slides = slider.querySelectorAll('.slide');

// fill array items
for(let i = 0; i < slides.length; i++){
    translate.push(i * 100 - 200);
}

// check resize
let resize = false;

// resize ... 
window.addEventListener('resize', () => {

    if(window.innerWidth > 776){
        if(resize === false){

            for(let i = 0; i < slides.length; i++){
                slides[i].style.opacity = '';
                slides[i].style.transform = '';
            }

            for(let i = 0; i < slides.length; i++){
            
                // touch
                slides[i].removeEventListener('touchstart', scrollStart, false);
                slides[i].removeEventListener('touchmove', scrollMove, false);
                slides[i].removeEventListener('touchend', scrollEnd, false);

                // click
                slides[i].removeEventListener('mousedown', scrollStart, false);
                slides[i].removeEventListener('mousemove', scrollMove, false);
                slides[i].removeEventListener('mouseup', scrollEnd, false);
            }

            slides = false;

            resize = true;
        }
    } else {
        if(resize === false){

            // change height for slider
            slider.style.height = `${maxHeight()}px`;

            slides = slider.querySelectorAll('.slide');

            // set height from max value
            slider.style.height = `${maxHeight()}px`;

            render();

            // events
            for(let i = 0; i < slides.length; i++){
                slides[i].querySelector('img').addEventListener('dragstart', event => event.preventDefault());

                // touch
                slides[i].addEventListener('touchstart', scrollStart, false);
                slides[i].addEventListener('touchmove', scrollMove, false);
                slides[i].addEventListener('touchend', scrollEnd, false);

                // click
                slides[i].addEventListener('mousedown', scrollStart, false);
                slides[i].addEventListener('mousemove', scrollMove, false);
                slides[i].addEventListener('mouseup', scrollEnd, false);
            }

            resize = true;
        }
    }

    resize = false;
});


if(window.innerWidth > 776){
    slides = false;
} else {
    slides = slider.querySelectorAll('.slide');
}

// slider if window.innerWidth < 776 (mobile)
if(slides !== false){

    // set height from max value
    slider.style.height = `${maxHeight()}px`;

    render();

    // events
    for(let i = 0; i < slides.length; i++){
        slides[i].querySelector('img').addEventListener('dragstart', event => event.preventDefault());

        // touch
        slides[i].addEventListener('touchstart', scrollStart, false);
        slides[i].addEventListener('touchmove', scrollMove, false);
        slides[i].addEventListener('touchend', scrollEnd, false);

        // click
        slides[i].addEventListener('mousedown', scrollStart, false);
        slides[i].addEventListener('mousemove', scrollMove, false);
        slides[i].addEventListener('mouseup', scrollEnd, false);
    }
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
    if(slides !== false){
        return Math.max(...[...slides].map(slide => slide.clientHeight));
    }
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

// TODO: more than one sliders! 