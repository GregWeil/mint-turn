// client-side js
// run by the browser each time your view template is loaded

import Two from 'two.js';

const two = new Two({
  width: 400,
  height: 400,
}).appendTo(document.getElementById('main'));

const start = [0, 0];
const end = [1, 0];

const line = two.makeLine(0, 0, 0, 0);
line.stroke = 'black';
line.lineWidth = 2;
line.

two.update();

console.log('hello world :o');
