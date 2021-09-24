const score = $('#score');

let scoreValue = 0;
score.on('score', (_, elem) => {
  scoreValue += elem;
  score.text(scoreValue);
});

export const triggerScore = (scoreValue) => score.trigger('score', scoreValue);
