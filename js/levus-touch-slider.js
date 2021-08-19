// 17-18 08-2021

const sliders = document.querySelectorAll('.levus-touch-slider .slides');

for(let i = 0; i<sliders.length; i++){

    let slides = sliders[i].querySelectorAll('.slide');

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
        sliders[i].append(clone);
    }

    // create array shift translateX
    const translate = [];

    // newest nodeList
    slides = sliders[i].querySelectorAll('.slide');

    // fill array items
    for(let k = 0; k < slides.length; k++){
        translate.push(k * 100 - 200);
    }

    // check resize
    let resize = false;

    // resize ... 
    window.addEventListener('resize', () => {

        if(window.innerWidth > 776){
            if(resize === false){

                sliders[i].style.height = 'auto';

                for(let j = 0; j < slides.length; j++){
                    slides[j].style.opacity = '';
                    slides[j].style.transform = '';
                }

                for(let j = 0; j < slides.length; j++){
                
                    // touch
                    slides[j].removeEventListener('touchstart', scrollStart, false);
                    slides[j].removeEventListener('touchmove', scrollMove, false);
                    slides[j].removeEventListener('touchend', scrollEnd, false);

                    // click
                    slides[j].removeEventListener('mousedown', scrollStart, false);
                    slides[j].removeEventListener('mousemove', scrollMove, false);
                    slides[j].removeEventListener('mouseup', scrollEnd, false);
                }

                slides = false;

                resize = true;
            }
        } else {
            if(resize === false){

                // set height from max value
                sliders[i].style.height = `${maxHeight()}px`;

                slides = sliders[i].querySelectorAll('.slide');

                render();

                // events
                for(let j = 0; j < slides.length; j++){
                    slides[j].querySelector('img').addEventListener('dragstart', event => event.preventDefault());

                    // touch
                    slides[j].addEventListener('touchstart', scrollStart, false);
                    slides[j].addEventListener('touchmove', scrollMove, false);
                    slides[j].addEventListener('touchend', scrollEnd, false);

                    // click
                    slides[j].addEventListener('mousedown', scrollStart, false);
                    slides[j].addEventListener('mousemove', scrollMove, false);
                    slides[j].addEventListener('mouseup', scrollEnd, false);
                }

                resize = true;
            }
        }

        resize = false;
    });


    if(window.innerWidth > 776){
        slides = false;
    } else {
        slides = sliders[i].querySelectorAll('.slide');
    }

    // slider if window.innerWidth < 776 (mobile)
    if(slides !== false){

        // set height from max value
        sliders[i].style.height = `${maxHeight()}px`;

        render();

        // events
        for(let j = 0; j < slides.length; j++){
            slides[j].querySelector('img').addEventListener('dragstart', event => event.preventDefault());

            // touch
            slides[j].addEventListener('touchstart', scrollStart, false);
            slides[j].addEventListener('touchmove', scrollMove, false);
            slides[j].addEventListener('touchend', scrollEnd, false);

            // click
            slides[j].addEventListener('mousedown', scrollStart, false);
            slides[j].addEventListener('mousemove', scrollMove, false);
            slides[j].addEventListener('mouseup', scrollEnd, false);
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

}