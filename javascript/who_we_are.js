import "https://raw.githack.com/flackr/scroll-timeline/22ae0525a8044a54e6d0aa593695b2a042e8de2a/dist/scroll-timeline.js";


/* Storing user's device details in a variable*/
let details = navigator.userAgent;

/* Creating a regular expression 
containing some mobile devices keywords 
to search it in details string*/
let regexp = /android|iphone|kindle|mac|ipad/i;

/* Using test() method to search regexp in details
it returns boolean value*/
let isMobileDevice = regexp.test(details);
let $showDevice = document.getElementById('device');

console.log(isMobileDevice);

// if (isMobileDevice) {
//     $showDevice.innerHTML = "You are using Mobile";
// } else {
//     $showDevice.innerHTML = "You are using Desktop";
// };

// Defining all elements to edit
const $scroller = document.querySelectorAll(".scroller");
const $frame = document.querySelectorAll(".scroller-frame");
const $camera = document.querySelectorAll(".scroller-camera");
const $grid = document.querySelectorAll(".scroller-grid");
const $cards = document.querySelectorAll(".card");

// Animating Side-Scrolling Grids for Each Subteam
const sectionHeightInVh = 500; // 👈 The scrolling distance over which the horizontal section should slide across

$scroller.forEach((scroller, index) => {
	if (window.innerWidth > 1024) {
		// Change height so that we have room to scroll in
		scroller.style.height = `${sectionHeightInVh}vh`;
		scroller.style.overflow = `visible`;
		// $scroller.style.outline = '10px solid red';

		// Set Frame Sticky
		$frame[index].style.position = "sticky";
		$frame[index].style.top = 0;

		// Animate the camera strip horizontally, while the scroller is contained
		$camera[index].animate(
			{
				transform: ["translateX(0)", `translateX(calc(-100% + 100vw))`]
			},
			{
				timeline: new ViewTimeline({
					subject: scroller,
					axis: "block"
				}),
				fill: "forwards",
				delay: { phase: "contain", percent: CSS.percent(5) },
				endDelay: { phase: "contain", percent: CSS.percent(95) }
			}
		);
	}
})

//grid elements "follow" mouse
let dropShadow = `rgba(0, 0, 0, 0.75)`

let facePointer = function(e, item, parent) {
	// Get the x position of the users mouse, relative to the button itself
	let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
	// Get the y position relative to the button
	let y = Math.abs(item.getBoundingClientRect().y - e.clientY);

	let halfWidth  = item.getBoundingClientRect().width / 2;
	let halfHeight = item.getBoundingClientRect().height / 2;

	let depth = 100
	let calcAngleX = (x - halfWidth) / depth;
	let calcAngleY = - (y - halfHeight) / depth;

	item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${calcAngleY}deg) scale(1.05)`;
	parent.style.perspective = `${halfWidth * 10}px`
	item.style.perspective = `${halfWidth * 10}px`

	let shadowDepth = 3
	item.style.filter = `drop-shadow(${-calcAngleX * shadowDepth}px ${calcAngleY * shadowDepth}px 10px ${dropShadow})`;
}

$cards.forEach(function(item) {
	if (!isMobileDevice) {
		item.addEventListener('mouseenter', function(e) {
			facePointer(e, this.querySelector('div'), this);
		});

		item.addEventListener('mousemove', function(e) {
			facePointer(e, this.querySelector('div'), this);
		});

		item.addEventListener('mouseleave', function(e) {
			item.querySelector('div').style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
			item.querySelector('div').style.filter = `drop-shadow(0 0px 20px ${dropShadow})`;
		});
	}
})

//Animating Individual Grid Elements to "Spawn" in and out
let observer;
let options;

$cards.forEach((element, index) => {
	if (window.innerWidth > 1024) {
		options = {
			root: element.closest(".scroller-frame"),
			rootMargin: "-50px",
			threshold: [0.25, 0.5, 0.75, 1, 0],
		}
	} else {
		options = {
			root: null,
			rootMargin: "0px",
			threshold: [0.25, 0.5, 0.75, 1, 0],
		}
	};	
	
	observer = new IntersectionObserver(handleIntersect, options);
	observer.observe(element);
	
	function handleIntersect(entries, observer) {
		entries.forEach((entry) => {
			if (window.innerWidth > 1024) {
				entry.target.style.opacity = Math.pow(entry.intersectionRatio, 0.5)
				// entry.target.style.scale = Math.pow((entry.intersectionRatio, entry.intersectionRatio), 0.1)
			}
		});
	}
});