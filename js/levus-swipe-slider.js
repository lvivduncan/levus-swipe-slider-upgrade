// 6-08-2021 new upgrade
{

    // TODO: disable autoscroll() and click-tuch
    /* 
    // flag resize
    let resize = false;

    window.addEventListener('resize', () => {

        if(window.innerWidth < 776){

            if(resize == false){

                resize = true;

                console.log(resize)

                slider();

            }

        } else if(window.innerWidth >= 776) {

            resize = false;

            console.log(resize)

        }        

    }); */

/*     if(window.innerWidth < 776){

        if(resize == false){

            resize = true;

            slider();

            console.log(resize)
        }

    } else if(window.innerWidth >= 776) {

        resize = false;

        console.log(resize)
    } */


    // function slider(){






        // basic wrapper
        const levusSwipeSlider = document.querySelectorAll('.levus-swipe-slider');

        levusSwipeSlider.forEach(element => {

            // box with slides
            const slides = element.querySelector('.slides');

            // slides 
            let list = element.querySelectorAll('.slide');

            // quantity
            const length = list.length;

            // left button
            const left = document.createElement('div');
            left.setAttribute('class', 'slide-left');

            // right button
            const right = document.createElement('div');
            right.setAttribute('class', 'slide-right');

            // nav buttons
            const nav = document.createElement('div');
            nav.setAttribute('class', 'levus-nav');

            // check number button
            let flag = 1;

            let buttons = '';

            if(length > 1) {
                

                if(window.innerWidth < 776){


                    // add buttons
                    element.append(left, right, nav);

                    for (let index = 0; index < length; index++) {

                        // nav buttons
                        const span = document.createElement('span');
                        span.setAttribute('data-id', index);
                        
                        // clone slides
                        slides.append(list[index].cloneNode(true));

                        // add buttons
                        nav.append(span);
                        
                    }

                    // shift -100%
                    slides.style.left = '-100%';

                    // buttons = document.querySelectorAll('.levus-nav span');
                    buttons = element.querySelectorAll('.levus-nav span');

                    buttons.forEach(item => {
                
                        // lighting 2 slide 
                        buttons[1].classList.add('active');
                
                        item.addEventListener('click', function() {
                            const id = this.dataset.id;
                
                            buttons.forEach(item => item.classList.remove('active'));
                            this.classList.add('active');
                
                            if(flag > id){ // клікнуто зліва від активної кнопки
                
                                const length = flag - id;
                
                                for(let i = 0; i < length; i++){
                                    
                                    leftScroll();
                                }
                            } 
                            
                            if(flag < id){ // клікнуто справа від активної кнопки
                
                                const length = id - flag;
                
                                for(let i = 0; i < length; i++){
                                    
                                    rightScroll();
                                }
                            }
                
                            flag = id;
                        });
                    });

                    // auto-scroll if the length is more than 1 element
                    autoScroll();

                }


            }

            
            // if(window.innerWidth < 776){
                
                /**
                 * click
                 */

                // left click
                left && left.addEventListener('click', leftScroll);

                // right click
                right && right.addEventListener('click', rightScroll);        
            // }



            /**
             * swipe
             */

            let startX = null,
                moveX = 0,
                resultX = 0;

            list = element.querySelectorAll('.slide');

            if(list.length > 1){    

                // if(window.innerWidth < 776){

                    list.forEach(item => {
                    
                        // touch
                        item.addEventListener('touchstart', e => touchStart(e), false);
                        item.addEventListener('touchmove', e => touchMove(e), false);
                        item.addEventListener('touchend', touchEnd, false);

                        // click
                        item.addEventListener('mousedown', e => touchStart(e), false);
                        item.addEventListener('mousemove', e => touchMove(e), false);
                        item.addEventListener('mouseup', touchEnd, false);

                        // image preventDefault
                        item.querySelectorAll('img').forEach(image => {
                            image.addEventListener('dragstart', e => e.preventDefault());
                        });

                    });
            
                // }

            }

            function touchStart(e){

                // виконуємо тільки на малому екрані
                // window.addEventListener('resize', () => {

                    if(window.innerWidth < 776){

                        // mobile/deskop check
                        if(e.type.includes('mouse')){
                            startX = e.pageX;
                        } else {
                            startX = e.targetTouches[0].clientX;
                        }                        

                    }      

                // });



                
            }

            function touchMove(e){

                // виконуємо тільки на малому екрані
                // window.addEventListener('resize', () => {

                    if(window.innerWidth < 776){

                        if(!startX) return false;

                        // mobile/deskop check
                        if(e.type.includes('mouse')){
                            moveX = e.pageX;
                        } else {
                            moveX = e.targetTouches[0].clientX;
                        }

                        resultX = moveX - startX;                        

                    }      

                // });


            }

            function touchEnd(){

                // виконуємо тільки на малому екрані
                // window.addEventListener('resize', () => {

                    if(window.innerWidth < 776){

                        if(resultX > 0) leftScroll();
                        else rightScroll();                        

                    }      

                // });


            }

            // autoscroll 
            // TODO: hover stop
            function autoScroll(){



/*                 if(window.innerWidth < 776){

                    if(resize == false){
            
                        resize = true;
            
                        slider();
            
                        console.log(resize)
                    }
            
                } */
/* 
                // виконуємо тільки на малому екрані
                window.addEventListener('resize', () => {

                    if(window.innerWidth < 776){
            
                        
            
                    }      
            
                }); */


                // виконуємо тільки на малому екрані
                // window.addEventListener('resize', () => {

                    if(window.innerWidth < 776){
            
                        setInterval(() => {

                            // нарощуємо на 1
                            if(flag === length - 1){
                                flag = 0;
                            } else {
                                flag++;
                            }

                            const first = slides.firstElementChild;
                            slides.append(first);

                            slides.style.transition = 'none';
                            slides.classList.add('to-left');
                            
                            setTimeout(() => {
                                slides.classList.remove('to-left');
                                slides.style.transition = '.5s';
                            }, 0);

                            buttonLight();

                        }, 4000);
            
                    }      
            
                // });






            }

            function leftScroll(){


                // виконуємо тільки на малому екрані
                // window.addEventListener('resize', () => {

                    if(window.innerWidth < 776){

                        // якщо не менше кількості слайдів, то віднімаємо 1
                        if(flag === 0){
                            flag = length - 1;
                        } else {
                            flag--;
                        }

                        const last = slides.lastElementChild;
                        slides.prepend(last);

                        slides.style.transition = 'none';
                        slides.classList.add('to-right');

                        setTimeout(() => {
                            slides.classList.remove('to-right');
                            slides.style.transition = '.5s';
                        }, 0);

                        buttonLight();                        

                    }      

                // });




            }

            function rightScroll(){

                // виконуємо тільки на малому екрані
                // window.addEventListener('resize', () => {

                    if(window.innerWidth < 776){

                        // нарощуємо на 1
                        if(flag === length - 1){
                            flag = 0;
                        } else {
                            flag++;
                        }

                        const first = slides.firstElementChild;
                        slides.append(first);

                        slides.style.transition = 'none';
                        slides.classList.add('to-left');
                        
                        setTimeout(() => {
                            slides.classList.remove('to-left');
                            slides.style.transition = '.5s';
                        }, 0);

                        buttonLight();                        

                    }      

                // });




            }

            // buttons highlights
            function buttonLight(){

                if(window.innerWidth < 776){

                    buttons.forEach(item => item.classList.remove('active'));
                    buttons[flag].classList.add('active');

                }
            }

        });   

    // }


}