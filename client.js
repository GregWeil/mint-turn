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
  far: 10,
  viewport: [0, 0, two.width, two.height],
});

const start = [-5, 0, 0];
const end = [5, 0, 0];

const line = two.makeLine(0, 0, 0, 0);
line.stroke = 'black';
line.linewidth = 2;

two.bind('update', () => {
  const angle = parseFloat(document.getElementById('rotation').value);
  camera.position = [Math.cos(angle)*5, 0, Math.sin(angle)*5];
  camera.lookAt([0, 0, 0]);
  camera.update();
  
  const [x1, y1] = camera.project(start);
  line.vertices[0].x = x1;
  line.vertices[0].y = y1;
  
  const [x2, y2] = camera.project(end);
  line.vertices[1].x = x2;
  line.vertices[1].y = y2;
}).play();

console.log('hello world :o');
