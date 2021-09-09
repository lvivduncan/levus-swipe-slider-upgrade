// 17-19 08-2021

const sliders = document.querySelectorAll('.levus-touch-slider .slides');

for(let i = 0; i<sliders.length; i++){

    // pseudo
    const swipe = sliders[i];

    let slides = swipe.querySelectorAll('.slide');

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
    for(let k = 0; k < slides.length; k++){
        const clone = slides[k].cloneNode(true);
        clone.classList.add('clone');
        swipe.append(clone);
    }

    // create array shift translateX
    const translate = [];

    // newest nodeList
    slides = swipe.querySelectorAll('.slide');

    // fill array items
    for(let k = 0; k < slides.length; k++){
        translate.push(k * 100 - 200);
    }

    // check resize
    let resize = false;

    // if resize
    window.addEventListener('resize', () => {

        if(window.innerWidth > 776){
            if(resize === false){

                swipe.style.height = 'auto';

                for(let i = 0; i < slides.length; i++){
                    slides[i].style.opacity = '';
                    slides[i].style.transform = '';
                }

                for(let i = 0; i < slides.length; i++){
/* 
                    // touch
                    slides[i].removeEventListener('touchstart', scrollStart, false);
                    slides[i].removeEventListener('touchmove', scrollMove, false);
                    slides[i].removeEventListener('touchend', scrollEnd, false);

                    // click
                    slides[i].removeEventListener('mousedown', scrollStart, false);
                    slides[i].removeEventListener('mousemove', scrollMove, false);
                    slides[i].removeEventListener('mouseup', scrollEnd, false);
 */

                    slides[i].addEventListener('pointerdown', scrollStart);
                    slides[i].addEventListener('pointermove', scrollMove);
                    slides[i].addEventListener('pointerup', scrollEnd);
                    slides[i].addEventListener('pointercancel', scrollEnd);
                }

                slides = false;

                resize = true;
            }
        } else {
            if(resize === false){

                // set height from max value
                swipe.style.height = `${maxHeight()}px`;

                slides = swipe.querySelectorAll('.slide');

                render();

                events();

                resize = true;
            }
        }

        resize = false;
    });


    if(window.innerWidth > 776){

        // set null for disable slider
        slides = false;
    } else {

        // get nodeList
        slides = swipe.querySelectorAll('.slide');
    }

    // slider if window.innerWidth < 776 (mobile)
    if(slides !== false){

        // set height from max value
        swipe.style.height = `${maxHeight()}px`;

        render();

        events();
    }

    function scrollStart(event){

        drag = true;

        this.classList.add('grabbing');

        // where they clicked
        // start = event.pageX || event.touches[0].clientX;
        start = event.pageX;
    }

    function scrollMove(event){

        if(drag){

            // where they dragged
            // finish = event.pageX || event.touches[0].clientX;
            finish = event.pageX;

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
            // tmp array
            const height = [];

            for(let i = 0; i < slides.length; i++){
                height.push(slides[i].clientHeight);
            }

            return Math.max.apply(null, height);
        }
    }

    function render(){
        for(let i = 0; i < slides.length; i++){

            if(translate[i] === 0){
                slides[i].style.opacity = 1;
            } else{
                slides[i].style.opacity = 0;
            }
            
            slides[i].style.transform = `translateX(${translate[i]}%)`;
        }
    }

    function events(){
        for(let i = 0; i < slides.length; i++){
            slides[i].querySelector('img').addEventListener('dragstart', event => event.preventDefault());
/* 
            // touch
            slides[i].addEventListener('touchstart', scrollStart, false);
            slides[i].addEventListener('touchmove', scrollMove, false);
            slides[i].addEventListener('touchend', scrollEnd, false);

            // click
            slides[i].addEventListener('mousedown', scrollStart, false);
            slides[i].addEventListener('mousemove', scrollMove, false);
            slides[i].addEventListener('mouseup', scrollEnd, false);
 */


            slides[i].addEventListener('pointerdown', scrollStart);
            slides[i].addEventListener('pointermove', scrollMove);
            slides[i].addEventListener('pointerup', scrollEnd);
            slides[i].addEventListener('pointercancel', scrollEnd);
        }
    }

}