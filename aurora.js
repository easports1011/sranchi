// Create a util function for random number
const randomInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Gonna need some stars up in here
const STAR_COUNT = 40;
const LIGHT_COUNT = 35;

// Generate three hues that we are going to use for a gradient
const HUES = new Array(3).fill().map(() => randomInRange(70, 300));
const ALPHAS = new Array(3).fill().map(() => Math.random());

// Start by creating a scene
const scene = document.querySelector('.scene');
scene.style.setProperty('--hue-1', HUES[0]);
scene.style.setProperty('--hue-2', HUES[1]);
scene.style.setProperty('--hue-3', HUES[2]);
scene.style.setProperty('--alpha-1', ALPHAS[0]);
scene.style.setProperty('--alpha-2', ALPHAS[1]);
scene.style.setProperty('--alpha-3', ALPHAS[2]);

let s = 0;
while (s < STAR_COUNT) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.setProperty('--size', Math.random() * 2);
    star.style.setProperty('--x', Math.random() * 100);
    star.style.setProperty('--y', Math.random() * 100);
    star.style.setProperty('--duration', randomInRange(5, 10));
    star.style.setProperty('--delay', randomInRange(4, 10));
    scene.appendChild(star);
    s++;
}

const lights = document.createElement('div');
lights.className = 'lights';
scene.appendChild(lights);

let l = 0;
while (l < LIGHT_COUNT) {
    const light = document.createElement('div');
    light.className = 'light';
    light.style.setProperty('--duration', randomInRange(5, 15));
    light.style.setProperty('--delay', randomInRange(4, 10));
    light.style.setProperty('--x', randomInRange(0, 5));
    light.style.setProperty('--y', randomInRange(0, 10));
    light.style.setProperty('--scale', Math.random() / 10);
    lights.appendChild(light);
    l++;
}

const hill = document.createElement('div');
hill.className = 'hill';
scene.appendChild(hill);

const moon = document.createElement('div');
moon.className = 'moon';
scene.appendChild(moon);
