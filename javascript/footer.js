let currentExpander;
let currentUl;

document.addEventListener('click', expander => {
    if (expander.target.matches('footer ul > div')) {
        currentExpander = expander.target;

        currentUl = currentExpander.closest('ul');
        currentUl.querySelector('svg.plus').classList.toggle('minus');
        currentUl.querySelectorAll('li').forEach( li => {
            li.classList.toggle('show');
        })
    }
});

document.addEventListener('click', expander => {
    if (expander.target.matches('#navtab')) {
        document.querySelector('#navtab').classList.toggle('minus');
        document.querySelector('nav ul').classList.toggle('show');
    }
});