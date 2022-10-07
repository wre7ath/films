(function () {

    window.addEventListener("scroll", posterScroll);

    function posterScroll() {
        var scrolledHeight = document.documentElement.scrollTop;
        if (scrolledHeight < window.innerHeight) {
            var scrolled = (scrolledHeight * 100) / (window.innerHeight * 0.6);
            posterAnimation(scrolled);
        }
        else {
            document.querySelector('.svg-poster .bloodtrail').style.transform = "translate(-181.75px,-107px)";
            document.querySelector('.movie-poster-animation').style.background = "rgb( 238,34,36)";
            document.querySelectorAll('.svg-poster .cls-2')[0].style.fill = "rgb(238,34,36)";
            document.querySelectorAll('.svg-poster .cls-2')[1].style.fill = "rgb(238,34,36)";
            document.querySelector('.svg-poster svg').style.height = "50vh";
            document.querySelector('.svg-poster svg').style.filter = "blur( 2 px)";

        }
    }

    function posterAnimation(scrolled) {
        var minusScrolled = Math.abs(scrolled - 100);
        var bloodScroll = (minusScrolled * 1.39) + 106;

        if (scrolled < 100) {

            document.querySelector('.svg-poster .bloodtrail').style.transform = `translate(-181.75px,-${bloodScroll}px)`;
            document.querySelector('.movie-poster-animation').style.background = `rgb( ${scrolled * 2.38},${scrolled * 0.34},${scrolled * 0.36})`;

            document.querySelectorAll('.svg-poster .cls-2')[0].style.fill = `rgb( ${scrolled * 2.38},${scrolled * 0.34},${scrolled * 0.36})`;
            document.querySelectorAll('.svg-poster .cls-2')[1].style.fill = `rgb( ${scrolled * 2.38},${scrolled * 0.34},${scrolled * 0.36})`;

            var posterSize = (minusScrolled * 0.35) + 50;
            document.querySelector('.svg-poster svg').style.height = `${posterSize}vh`
            document.querySelector('.svg-poster svg').style.filter = `blur( ${scrolled / 200 } px)`;
        }

    }



    const player = new Plyr('#handMovie', {
        enabled: true,
        debug: false,
        quality: { default: 1080, options: [1080, 720] },
        settings: ['quality'],
        disableContextMenu: false,
        invertTime: false,
        storage: { enabled: false, key: 'none' },


    });


})();