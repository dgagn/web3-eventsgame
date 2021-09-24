const $score = $('#score');

let scoreValue = 0;
$score.on('score', (_, number) => {
  scoreValue += number;
  $score.text(scoreValue);
});

export const triggerScore = (score) => $score.trigger('score', score);
