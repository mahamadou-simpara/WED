const menuBtn = document.getElementById('mobile-menu-btn');
const menuElement = document.getElementById('mobile-menu');

function toggleMenu(){
    menuElement.classList.toggle('open')
}

menuBtn.addEventListener('click', toggleMenu);
