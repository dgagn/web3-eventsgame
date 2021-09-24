import {triggerScore} from './score.js';
import {
  clamp,
  randomNumberInterval,
  pipe,
  appendToBody,
  randomArrayElement,
} from './utils.js';

const events = ['click', 'contextmenu', 'dblclick', 'mouseenter'];

const createImage$ = (event) =>
  $(`
    <img src="./img/${event}.png?" alt="${event}" class="alive" />
`);

const eventAlive = ($elem) =>
  $elem.toggleClass('alive') && $elem.remove() && triggerScore(10);

const eventDead = ($elem) =>
  $elem.hasClass('alive') && $elem.remove() && triggerScore(-20);

const animateBottom = ($elem) =>
  $elem.animate({bottom: 0}, 3000, () => eventDead($elem));

const randomPosition = ($elem) =>
  $elem.css({left: `${randomNumberInterval(10, 90)}vw`});

const addEvent = (event) => ($elem) => $elem.on(event, () => eventAlive($elem));

const createEventBlock = (event) =>
  pipe(
      createImage$,
      appendToBody,
      animateBottom,
      randomPosition,
      addEvent(event),
  )(event);

const createRandomEventBlock = () =>
  pipe(randomArrayElement, createEventBlock)(events);

const clampedTimeout = clamp(500, 10_000);
let timeout = clampedTimeout(5_000);
const recursiveEventBlock = () => {
  const randomNumberBlocks = randomNumberInterval(1, 3);
  [...Array(randomNumberBlocks)].forEach(createRandomEventBlock);
  timeout = clampedTimeout(timeout - 100);
  setTimeout(recursiveEventBlock, timeout);
};

$(document).ready(() => {
  setTimeout(recursiveEventBlock, timeout);
});
