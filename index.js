const events = ['click', 'contextmenu', 'dblclick', 'mouseenter']

const pipe = (...fns) => (x) => fns.reduce((v, f) => f(v), x);

const score = $('#score')

const createImage$ = (event) => $(`
    <img src="./img/${event}.png" alt="${event}" />
`)
const animateBottom = (speed, fn) => ($elem) => $elem.animate({ bottom: 0 }, speed, fn)
const randomPosition = ($elem) => $elem.css({ left: `${Math.random() * 100}%` })
const randomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const triggerScore = (event) => ($elem) => $elem.on(event, () => {
    score.trigger('score', -10)
    return $elem.remove()
});

score.on('score', (data, elem) => {
    console.log(elem)
})

$(document).ready(() => {
    const event = randomArrayElement(events);
    const $eventImage = createImage$(event)
    $('body').append($eventImage);
    pipe(
        animateBottom(3000),
        randomPosition,
        triggerScore(event)
    )($eventImage)
})

