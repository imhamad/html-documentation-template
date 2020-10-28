const initGsap = (cb = null) => {
    if (window.gsap && cb) {
        return cb(window.gsap);
    }

    if (window.innerWidth <= 1050 || cb) {
        const link = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.5.1/gsap.min.js';
        const script = document.createElement('script');
        script.src = link;
        script.onload = () => {
            if (cb) {
                cb(window.gsap);
            }
        }
    
        document.body.append(script);
    }
}

const getGsap = () => new Promise((res, rej) => {
    initGsap((_gsap) => {
        res(_gsap);
    });
});

const initCode = () => {
    const code = $('pre > code');

    if (!!code.length) {
        const script = document.createElement('script');
        const link = document.createElement('link');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.15.10/highlight.min.js';
        link.href = 'https://highlightjs.org/static/demo/styles/night-owl.css';
        link.rel = 'stylesheet';

        script.onload = () => {
            code.each(function(i, e) { hljs.highlightBlock(e); });
        };
        
        document.body.append(link);
        document.body.append(script);
    }
}

const leftMenuOpenHandler = async () => {
    const gsap = await getGsap();
    gsap.to('main', {duration: 0.5, x: 320});
    gsap.to('aside', {duration: 0.5, x: 320});
    gsap.to('header', {duration: 0.5, x: 320});
    window.isLeftMenuOpen = true;
}

const leftMenuCloseHandler = async () => {
    const gsap = await getGsap();
    gsap.to('main', {duration: 0.5, x: 0});
    gsap.to('aside', {duration: 0.5, x: 0});
    gsap.to('header', {duration: 0.5, x: 0});
    window.isLeftMenuOpen = false;
}

const scrollspyOpenHandler = async () => {
    const gsap = await getGsap();
    gsap.to('.scrollspy', {duration: 0.5, x: -260});
    gsap.to('.menu-btn-scrollspy', {duration: 0.5, x: -260});
    window.isScrollspyOpen = true;
}

const scrollspyCloseHandler = async () => {
    const gsap = await getGsap();
    gsap.to('.scrollspy', {duration: 0.5, x: 0});
    gsap.to('.menu-btn-scrollspy', {duration: 0.5, x: 0});
    window.isScrollspyOpen = false;
}

(function() {
    const script = document.createElement('script');
    const link = document.createElement('link');
    const loader = document.createElement('div');

    script.src = '/assets/js/bundle.min.js';
    link.href = '/assets/css/style.css';
    link.rel = 'stylesheet';

    script.onload = () => {
        initGsap();
        initCode();

        const appendMainMenuItemsForMobile = () => {
            const links = $('header .links a')
                .toArray()
                .map(e => `<li><a href="${$(e).attr('href')}">${$(e).text()}</a></li>`);
    
            $('.main-menu-items').html(links);
        }
    
        appendMainMenuItemsForMobile();
    
        $('.btn-left-menu').click(() => {
            if (window.isLeftMenuOpen) {
                leftMenuCloseHandler();
            } else {
                leftMenuOpenHandler();
            }
        });
    
        $('.menu-btn-scrollspy').click(() => {
            if (window.isScrollspyOpen) {
                scrollspyCloseHandler();
            } else {
                scrollspyOpenHandler();
            }
        });

        $('.search input.uk-search-input').on('input', async function() {
            const value = $(this).val().toLowerCase();
            if (!value) return $('.search-result').hide();
            $('.search-result a').hide();
            const items = $('.search-result a').toArray().filter(e => $(e).find('strong').text().toLowerCase().includes(value) || $(e).find('span').text().toLowerCase().includes(value) );
            if (items.length) {
                $(items).show();
                $('.search-result').show();
            } else {
                $('.search-result').hide()
            }
        });

        $('.page-loader').hide();
        $('header').show();
    };
    
    loader.className = 'page-loader';
    document.body.append(loader);
    document.body.append(link);
    document.body.append(script);
})()