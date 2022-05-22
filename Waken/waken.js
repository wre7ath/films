window.addEventListener('DOMContentLoaded', () => {
    lazySizes.init();

    const player = new Plyr('#wakenTrailer', {
        enabled: true,
        debug: false,
        quality: { default: 1080 },
        settings: [''],
        disableContextMenu: false,
        invertTime: false,
        storage: { enabled: false, key: 'none' },
    });


    let animationWrapper,
        animationWrapperHeight,
        animationWrapperofset,
        animationContainer,
        imgSequence,
        animationControl,
        perImage;


    function animationInit() {
        animationWrapper = document.querySelector(".waken-animation");
        animationWrapperHeight = animationWrapper.clientHeight;
        animationWrapperofset = animationWrapper.getBoundingClientRect().top + window.pageYOffset || document.documentElement.scrollTop;
        animationContainer = document.querySelector(".image-animation-container");
        imgSequence = document.querySelectorAll(".img-sequence");

        animationControl = 55;
        perImage = animationControl / imgSequence.length;
    }

    animationInit();
    window.onresize = animationInit;



    window.addEventListener('scroll', event => {

        let scrolled = Math.max(
            window.scrollY,
            window.pageYOffset,
            document.documentElement.scrollTop,
            document.body.scrollTop
        );

        scrolling(scrolled);

    }, { passive: true });


    function scrolling(scrolled) {


        if (scrolled > animationWrapperofset && scrolled < animationWrapperHeight) {

            let elementScrolled = ((scrolled - animationWrapperofset) / animationWrapperHeight) * 100;

            let scrollIndex = elementScrolled / perImage;
            scrollIndex = scrollIndex.toFixed();

            if (scrollIndex < imgSequence.length) {
                for (let index = 0; index < imgSequence.length; index++) {
                    const element = imgSequence[index];
                    if (index < (imgSequence.length)) {
                        element.classList.remove("show");
                    }
                }

                let scale = 1 + elementScrolled * 0.01;
                let position;

                if (window.innerWidth > 700) {
                    position = 50 - (elementScrolled * 0.45);
                } else {
                    position = 50 - (elementScrolled * 0.505);
                }

                animationContainer.style.setProperty('--scale', scale);
                animationContainer.style.setProperty('--position', position + "%");

                imgSequence[scrollIndex].classList.add("show");

            } else if (scrollIndex == imgSequence.length || elementScrolled > animationControl) {
                let blur = (elementScrolled - animationControl);
                imgSequence[28].style.filter = "blur(" + blur + "px)";
                for (let index = 0; index < imgSequence.length; index++) {
                    const element = imgSequence[index];
                    if (index < (imgSequence.length)) {
                        element.classList.remove("show");
                    }
                }
                imgSequence[28].classList.add("show");

            }
        }


        if (scrolled > (animationWrapperofset * 0.5) && scrolled < animationWrapperHeight) {
            animationContainer.classList.add("reveal");
        } else if (scrolled < animationWrapperofset || scrolled > (animationWrapperHeight * 1.15)) {
            animationContainer.classList.remove("reveal");
        }
    }

    setTimeout(() => {
        document.documentElement.classList.add("loaded");
    }, 4000);

});