import "https://raw.githack.com/flackr/scroll-timeline/22ae0525a8044a54e6d0aa593695b2a042e8de2a/dist/scroll-timeline.js";

const $gradient = document.querySelector('#gradient');
const $heroSection = document.querySelector('#hero-suspense');

const heroHeightInVH = 300;
$heroSection.style.height = `${heroHeightInVH}vh`;

console.log($gradient.offsetHeight)

$gradient.animate(
    {
        transform: [`translateY(0)`, `translateY(calc(-100% - ${$gradient.offsetHeight}px))`]
    },
    {
        timeline: new ViewTimeline ({
            subject: $heroSection,
            axis: "block"
        }),
        fill: "forwards",
        delay: { phase: "contain", percent: CSS.percent(0) },
        endDelay: { phase: "contain", percent: CSS.percent(150) }
    }
);

let currentExpander;
let currentUl;

document.addEventListener('click', expander => {
    if (expander.target.matches('footer ul > div')) {
        currentExpander = expander.target;
        console.log(currentExpander);

        currentUl = currentExpander.closest('ul');
        currentUl.querySelector('svg.plus').classList.toggle('minus');
        currentUl.querySelectorAll('li').forEach( li => {
            li.classList.toggle('show');
        })
    }
});

const colorSwatches = document.querySelectorAll('.color-button');
const specsPage = document.querySelector('#specs');
let currentColor;

document.addEventListener('click', swatch => {
    if (swatch.target.matches('.color-button')) {
        currentColor = swatch.target;

        colorSwatches.forEach(swatch => {
            swatch.classList.remove('current');
        });

        currentColor.classList.add('current');

        changeMain(currentColor);
    }
});

function changeMain(e) {
    if (e.matches('#pj-orange')) {
        specsOrange();
    }
    if (e.matches('#pj-buzz')) {
        specsBuzz();
    }
    if (e.matches('#pj-phoenix')) {
        specsPhoenix();
    }
    if (e.matches('#pj-four')) {
        specsFour();
    }
}

const doubleImage = document.getElementById('double-image');
const swatchLabel = document.querySelector('#color-toggle > span');

function specsOrange() {
    specsPage.style.setProperty('--main', '#fe5c00');
    specsPage.style.setProperty('--secondary', '#fe5c00');
    specsPage.style.setProperty('--complementary', '#fe5c00');

    doubleImage.src = "images/home/OrangeDouble.png";
    swatchLabel.innerText = "Orange";
}

function specsBuzz() {
    specsPage.style.setProperty('--main', '#753da0');
    doubleImage.src = "images/home/BuzzDouble.png";
    swatchLabel.innerText = "To Infinity";
}

function specsPhoenix() {
    specsPage.style.setProperty('--main', 'gray');
    doubleImage.src = "images/home/PhoenixDouble.png";
    swatchLabel.innerText = "Phoenix";
}

function specsFour() {
    specsPage.style.setProperty('--main', 'red');
    doubleImage.src = "images/home/OrangeDouble.png";
    swatchLabel.innerText = "Kill Jared's Mom";
};