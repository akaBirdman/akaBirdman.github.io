// Defining necessary elements for the image enlarger to work
const gallery = document.querySelector('#gallery');
const images = document.querySelectorAll('.image');
const enlargedUI = document.querySelector('#large-viewer');
const enlargedImage = document.querySelector('#large-img');

// Defining the enlarged image ui buttons
const next = document.querySelector('#right');
const prev = document.querySelector('#left');
const esc = document.querySelector('#escape');

// Pulling all image file locations from the gallery json file
let http = new XMLHttpRequest();

http.open('get', '../gallery-fetch.json', true);
http.send();

http.onload = function() {
    let images = JSON.parse(this.responseText);

    let output = "";

    for (let item of images) {
        output = `
        <div class="item">
            <img class="image" src="${item.path}">
        </div>
        `;

        gallery.innerHTML += output;
    }
}

// Listen for image to be clicked and enlarge it
let currentImage;

gallery.addEventListener('click', image => {
	if (image.target.matches('.image')) {
        currentImage = image.target;
        enlargedImage.src = image.target.src;
        enlargedUI.classList.toggle('hide');
	}
});

esc.addEventListener('click', function() {
    enlargedUI.classList.toggle('hide');
})

next.addEventListener('click', function() {
    currentImage = currentImage.parentElement.nextElementSibling.children[0];
    enlargedImage.src = currentImage.src;
})

prev.addEventListener('click', function() {
    currentImage = currentImage.parentElement.previousElementSibling.children[0];
    enlargedImage.src = currentImage.src;
})