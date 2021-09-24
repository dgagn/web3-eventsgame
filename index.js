import { triggerScore } from './score.js';

const events = ['click', 'contextmenu', 'dblclick', 'mouseenter'];

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const createImage$ = (event) => $(`
    <img src='./img/${event}.png?' alt='${event}' class='alive' />
`);

const animateBottom = ($elem) =>
    $elem.animate(
        { bottom: 0 }, 3000, () => eventDead($elem)
    );

const randomPosition = ($elem) =>
    $elem.css({ left: `${Math.random() * 100}vw` });

const randomArrayElement = (array) =>
    array[Math.floor(Math.random() * array.length)];

const randomNumberInterval = (min, max) =>
    Math.floor(Math.random() * (max - min + 1) + min)

const eventAlive = ($elem) => $elem.toggleClass('alive') &&
    $elem.remove() &&
    triggerScore(10);

const eventDead = ($elem) => $elem.hasClass('alive') &&
    $elem.remove() &&
    triggerScore(-20)

const addEvent = (event) => ($elem) => $elem.on(
    event, () => eventAlive($elem)
);

const appendToBody = ($elem) => $elem.appendTo('body');

const createEventBlock = (event) =>
    pipe(
        createImage$,
        appendToBody,
        animateBottom,
        randomPosition,
        addEvent(event)
    )(event);

const createRandomEventBlock = () =>
    pipe(randomArrayElement, createEventBlock)(events);

const recursiveEventBlock = () => {
    const randomNumberBlocks = randomNumberInterval(1, 3);
    [...Array(randomNumberBlocks)].forEach(createRandomEventBlock)
}

$(document).ready(() => {
    setInterval(recursiveEventBlock, 2000)
});
