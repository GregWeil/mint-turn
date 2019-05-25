// client-side js
// run by the browser each time your view template is loaded

import Two from 'two.js';
import createCamera from 'perspective-camera';

const two = new Two({
  width: 400,
  height: 400,
}).appendTo(document.getElementById('main'));

const camera = createCamera({
  fov: 60,
  near: 1,
  far: 100,
  viewport: [0, 0, two.width, two.height],
});

const start = [0, 0];
const end = [1, 0];

const line = two.makeLine(0, 0, 10, 0);
line.stroke = 'black';
line.linewidth = 2;
console.log(line);

two.bind('update', () => {
  const angle = parseFloat(document.getElementById('rotation').value);
  camera.position = [0, 0, 50];
  camera.lookAt([0, 0, 0]);
}).play();

console.log('hello world :o');
