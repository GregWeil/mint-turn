// client-side js
// run by the browser each time your view template is loaded

import {
  create as createMat4,
  identity as identityMat4,
  rotate as rotateMat4,
  translate as translateMat4,
} from 'gl-mat4';

import Input from './controls';
import { makeGroup, makeHull, makePath, makeScene, makeTransform } from '../';
import makeElement from '../make-element';

const makePathStyled = (commands, fill, stroke, strokeWidth) => {
  const [path, ...data] = makePath(commands);
  path.setAttribute('fill', fill);
  path.setAttribute('stroke', stroke);
  path.setAttribute('stroke-width', strokeWidth);
  return [path, ...data];
};

const makeHullStyled = (vertices, fill, stroke, strokeWidth) => {
  const [path, ...data] = makeHull(vertices);
  path.setAttribute('fill', fill);
  path.setAttribute('stroke', stroke);
  path.setAttribute('stroke-width', strokeWidth);
  return [path, ...data];
};

const makeCircle = (segments, radius, height) => {
  return [...Array(segments).keys()].map((i) => {
    const angle = (i / segments) * Math.PI * 2;
    return [Math.cos(angle) * radius, height, Math.sin(angle) * radius];
  });
};

const face = makeGroup([0, 0, 3], [
  makePathStyled(['M', [-1,1,3], 'L', [-1,2,3]], 'transparent', 'black', 5, false, false),
  makePathStyled(['M', [1,1,3], 'L', [1,2,3]], 'transparent', 'black', 5, false, false),
  makePathStyled(['M', [-2,-0.5,3], 'C', [-1,-2,3], [1,-2,3], [2,-0.5,3]], 'transparent', 'black', 5, false, true),
]);

const bottom = makePathStyled(['M', [-3,-3,-3], 'L', [-3,-3,3], [3,-3,3], [3,-3,-3], 'Z'], 'green', 'black', 3, true, false);
const head = makeGroup([0, 0, 0], [
  makePathStyled(['M', [-3,3,-3], 'L', [-3,3,3], [3,3,3], [3,3,-3], 'Z'], 'red', 'black', 3, true, false),
  bottom,
  makePathStyled(['M', [-3,-3,-3], 'L', [-3,3,-3], [3,3,-3], [3,-3,-3], 'Z'], 'blue', 'black', 3, true, false),
  makePathStyled(['M', [-3,-3,3], 'L', [-3,3,3], [3,3,3], [3,-3,3], 'Z'], 'yellow', 'black', 3, true, false),
  makePathStyled(['M', [-3,-3,-3], 'L', [-3,-3,3], [-3,3,3], [-3,3,-3], 'Z'], 'pink', 'black', 3, true, false),
  makePathStyled(['M', [3,-3,-3], 'L', [3,-3,3], [3,3,3], [3,3,-3], 'Z'], 'orange', 'black', 3, true, false),
  face,
]);

const hat = makeGroup([0, 3, 0], [
  makeHullStyled([...makeCircle(16, 3, 0), ...makeCircle(16, 2.8, 0.5), ...makeCircle(16, 2.5, 1), ...makeCircle(16, 2, 1.5), ...makeCircle(16, 1.25, 1.85), [0, 2, 0]], 'green', 'black', 3),
  makeHullStyled([...makeCircle(8, 0.25, 2), ...makeCircle(8, 0.25, 2.125)], 'green', 'black', 3),
  makeGroup([0, -1, 0], [
    makePathStyled(['M', [-3,0,0], 'C', [-2,0,3], [-1.5,0,4.5], [0,0,4.5], 'C', [1.5,0,4.5], [2,0,3], [3,0,0], 'Z'], 'green', 'black', 3, true, true),
  ]),
]);

const hatTransform = createMat4();
translateMat4(hatTransform, hatTransform, [0, 3, 0]);
const hatInput = document.getElementById('hat');

const [svg, camera, update] = makeScene(400, 400, [
  head, makeTransform(hat, hatTransform),
]);

svg.setAttribute('id', 'main');
document.body.appendChild(svg);

const input = Input(svg);

const cycle = () => {
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
  
  identityMat4(hatTransform);
  translateMat4(hatTransform, hatTransform, [0, 3, 0]);
  rotateMat4(hatTransform, hatTransform, parseFloat(hatInput.value)*Math.PI/180, [0, 1, 0]);
  
  update();
  window.requestAnimationFrame(cycle);
};
window.requestAnimationFrame(cycle);

const filter = makeElement('filter');
filter.setAttribute('id', 'shadow');
const erode = makeElement('feMorphology');
erode.setAttribute('in', 'SourceAlpha');
erode.setAttribute('operator', 'erode');
erode.setAttribute('radius', 2);
const blur = makeElement('feGaussianBlur');
blur.setAttribute('stdDeviation', 5);
const blend = makeElement('feBlend');
blend.setAttribute('in', 'SourceGraphic');
filter.appendChild(erode);
filter.appendChild(blur);
filter.appendChild(blend);
const defs = makeElement('defs');
defs.appendChild(filter);
svg.appendChild(defs);
bottom[0].setAttribute('filter', 'url(#shadow)');

console.log('hello world :o');
