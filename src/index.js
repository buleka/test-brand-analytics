import "./sass/style.scss";

const breakpointMobile = 767;
const ticketsTransform = Array.from(document.getElementsByClassName('ticket--transform'));
const container = document.getElementsByClassName('section')[0];
let heightContainer = container.clientHeight;

const isMobile = () => window.innerWidth < breakpointMobile;

let lastScrollTop = 0;

function tick() {
    let positionTop = container.getBoundingClientRect().y;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop !== lastScrollTop &&
        positionTop < scrollTop &&
        scrollTop < positionTop + heightContainer) {

        ticketsTransform.forEach((item, index) => {
            let magicNumber = isMobile() ? (index * 2 - 4) : (index * 3 - 7);
            let styles = window.getComputedStyle(item).getPropertyValue('transform');
            let values = styles.split('(')[1].split(')')[0].split(', ');
            const scaleValue = values[0];

            item.style.transform = `translate3d(0, ${(scrollTop - positionTop)/magicNumber}px, 0) scale(${scaleValue})`;
        });

        lastScrollTop = scrollTop;
    }

    requestAnimationFrame(tick);
}

tick();

window.addEventListener('scroll', function () {
    heightContainer = container.clientHeight;
});

window.addEventListener('resize', function () {
    heightContainer = container.clientHeight;
});
