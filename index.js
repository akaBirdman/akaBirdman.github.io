import "https://raw.githack.com/flackr/scroll-timeline/22ae0525a8044a54e6d0aa593695b2a042e8de2a/dist/scroll-timeline.js";

const $gradient = document.querySelector('#gradient');
const $heroSection = document.querySelector('#hero-suspense');

const heroHeightInVH = 300;
$heroSection.style.height = `${heroHeightInVH}vh`;

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
        endDelay: { phase: "contain", percent: CSS.percent(100) }
    }
);

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
const isoImage = document.getElementById('iso-image');
const topImage = document.getElementById('top-image');
const swatchLabel = document.querySelector('#color-toggle > span');

let paintColor;

function specsOrange() {
    specsPage.style.setProperty('--main', '#fe5c00');
    specsPage.style.setProperty('--secondary', '#fe5c00');
    specsPage.style.setProperty('--complementary', '#fe5c00');

    paintColor = "Orange"
    doubleImage.src = `images/home/${paintColor}Double.png`;
    isoImage.src = `images/home/${paintColor}Iso.png`;
    topImage.src = `images/home/${paintColor}Top.png`;

    swatchLabel.innerText = "Orange";
}

function specsBuzz() {
    specsPage.style.setProperty('--main', '#753da0');

    paintColor = "Buzz"
    doubleImage.src = `images/home/${paintColor}Double.png`;
    isoImage.src = `images/home/${paintColor}Iso.png`;
    topImage.src = `images/home/${paintColor}Top.png`;

    swatchLabel.innerText = "To Infinity";
}

function specsPhoenix() {
    specsPage.style.setProperty('--main', 'gray');

    paintColor = "Phoenix"
    doubleImage.src = `images/home/${paintColor}Double.png`;
    isoImage.src = `images/home/${paintColor}Iso.png`;
    topImage.src = `images/home/${paintColor}Top.png`;
    swatchLabel.innerText = "Phoenix";
}

function specsFour() {
    specsPage.style.setProperty('--main', 'red');

    paintColor = "Orange"
    doubleImage.src = `images/home/${paintColor}Double.png`;
    isoImage.src = `images/home/${paintColor}Iso.png`;
    topImage.src = `images/home/${paintColor}Top.png`;

    swatchLabel.innerText = "Orange";
};

// Controlling Tabs for Plane Information
let currentTab;
const infoPage = document.getElementById('info');

document.addEventListener('click', e => {
    if (e.target.matches('#info ul > div')) {
        currentTab = e.target.closest('ul');

        infoPage.querySelectorAll('ul').forEach(icon => {
            icon.classList.remove('open');
            icon.classList.add('closed');
        });
        currentTab.classList.remove('closed');
        currentTab.classList.add('open');
    }
});

// Moving Plane Images Over
const paintJobs = document.getElementById('pj-display');

if (window.innerWidth > 1024) {
    paintJobs.animate(
        
        {
            transform: ["translateX(0)", `translateX(calc(-50%))`]
        },
        {
            timeline: new ViewTimeline({
                subject: specsPage,
                axis: "block"
            }),
            fill: "forwards",
            delay: { phase: "contain", percent: CSS.percent(5) },
            endDelay: { phase: "contain", percent: CSS.percent(50) }
        }
    );
}

// Revealing Band Behind Color Toggles
const toggleBar = document.getElementById('color-toggle');

toggleBar.animate(
    
    {
        background: ["rgba(48, 48, 48, 0)", `rgba(48, 48, 48, 0.25)`]
    },
    {
        timeline: new ViewTimeline({
            subject: specsPage,
            axis: "block"
        }),
        fill: "forwards",
        delay: { phase: "contain", percent: CSS.percent(1) },
        endDelay: { phase: "contain", percent: CSS.percent(10) }
    }
);

const intro = document.getElementById('intro');

intro.style.transform = `translateY(${window.innerHeight/2 - intro.offsetHeight/2}px)`;
console.log(window.innerHeight - intro.offsetHeight);