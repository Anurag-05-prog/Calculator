"use script";

const darkModeSwitch = document.querySelector('.dark-mode');
const lightModeSwitch = document.querySelector('.light-mode');

darkModeSwitch.addEventListener('click', function() {
    lightModeSwitch.style.display = 'block';
    darkModeSwitch.style.display = 'none';
    document.documentElement.setAttribute('data-theme', 'light');
});

lightModeSwitch.addEventListener('click', function() {
    lightModeSwitch.style.display = 'none';
    darkModeSwitch.style.display = 'block';
    document.documentElement.setAttribute('data-theme', 'dark');
});