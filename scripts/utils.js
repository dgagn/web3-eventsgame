export const clamp = (min, max) => (number) =>
  Math.max(min, Math.min(number, max));

export const pipe =
  (...fns) =>
    (x) =>
      fns.reduce((v, f) => f(v), x);

export const randomNumberInterval = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const appendToBody = ($elem) => $elem.appendTo('body');

export const randomArrayElement = (array) =>
  array[Math.floor(Math.random() * array.length)];
