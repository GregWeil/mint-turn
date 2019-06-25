// client-side js
// run by the browser each time your view template is loaded

import Two from 'two.js';
import createCamera from 'perspective-camera';

import Input from './controls';
import makeGroup from './make-group';
import makeHull from './make-hull';
import makePath from './make-path';

const two = new Two({
  width: 400,
  height: 400,
}).appendTo(document.body);

two.renderer.domElement.setAttribute('viewBox', `0 0 ${two.width} ${two.height}`);
two.renderer.domElement.removeAttribute('width');
two.renderer.domElement.removeAttribute('height');
two.renderer.domElement.setAttribute('id', 'main');

const camera = createCamera({
  fov: 30,
  near: 1,
  far: 20,
  viewport: [0, 0, two.width, two.height],
});

const input = Input(two.renderer.domElement);

const face = makeGroup([0,0,3], [
  makePath([[-1,1,3],[-1,2,3]], 'transparent', 'black', 5, false, false),
  makePath([[1,1,3],[1,2,3]], 'transparent', 'black', 5, false, false),
  makePath([[[-2,-0.5,3],[0,0,0],[1,-1.5,0]], [[2,-0.5,3],[-1,-1.5,0],[0,0,0]]], 'transparent', 'black', 5, false, true),
]);

const makeCircle = (segments, radius, height) => {
  return [...Array(segments).keys()].map((i) => {
    const angle = (i / segments) * Math.PI * 2;
    return [Math.cos(angle) * radius, height, Math.sin(angle) * radius];
  });
};

const hat = makeGroup([0,3,0], [
  makeHull([...makeCircle(32, 3, 3), ...makeCircle(32, 2.8, 3.5), ...makeCircle(32, 2.5, 4), ...makeCircle(32, 2, 4.5), ...makeCircle(16, 1.25, 4.85), [0, 5, 0]], 'green', 'black', 3, true),
]);

const [rootGroup, updateRoot] = makeGroup([0,0,0], [
  makePath([[-3,3,-3], [-3,3,3], [3,3,3], [3,3,-3]], 'red', 'black', 5, true, false),
  makePath([[-3,-3,-3], [-3,-3,3], [3,-3,3], [3,-3,-3]], 'green', 'black', 5, true, false),
  makePath([[-3,-3,-3], [-3,3,-3], [3,3,-3], [3,-3,-3]], 'blue', 'black', 5, true, false),
  makePath([[-3,-3,3], [-3,3,3], [3,3,3], [3,-3,3]], 'yellow', 'black', 5, true, false),
  makePath([[-3,-3,-3], [-3,-3,3], [-3,3,3], [-3,3,-3]], 'pink', 'black', 5, true, false),
  makePath([[3,-3,-3], [3,-3,3], [3,3,3], [3,3,-3]], 'orange', 'black', 5, true, false),
  hat, face
]);

two.add(rootGroup);

two.bind('update', () => {
  const [cameraX, cameraY] = input();
  const cameraRadius = 10;
  const cameraRadiusH = Math.cos(cameraY) * cameraRadius;
  camera.position = [
    Math.sin(cameraX) * cameraRadiusH,
    Math.sin(cameraY) * cameraRadius,
    Math.cos(cameraX) * cameraRadiusH,
  ];
  camera.up = Math.abs(cameraY) === Math.PI/2 ? [-Math.sin(cameraX), 0, -Math.cos(cameraX)] : [0, 1, 0];
  camera.lookAt([0, 0, 0]);
  
  camera.update();
  updateRoot(camera);
}).play();

console.log('hello world :o');
