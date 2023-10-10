import "./sass/style.scss";

const breakpointMobile = 767;
const ticketsTransform = Array.from(document.getElementsByClassName('ticket--transform'));
const container = document.getElementsByClassName('section')[0];
const heightContainer = container.clientHeight;

const isNotMobile = () => window.innerWidth >= breakpointMobile;

window.addEventListener('scroll', function () {
    if (!isNotMobile()) {
        return;
    }
    let positionContainer = container.getBoundingClientRect().y;
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (positionContainer < scrollTop && scrollTop < positionContainer + heightContainer) {
        ticketsTransform.forEach((item, index)=>{
            const co = index * 3 - 7;
            let styles = window.getComputedStyle(item).getPropertyValue('transform');
            let values = styles.split('(')[1].split(')')[0].split(', ');
            const scaleValue = values[0];
            item.style = "transform: translate3d(0 ," + (scrollTop - positionContainer) / co + "px, 0) scale(" + scaleValue + ")";
        })
    }
});