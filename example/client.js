// client-side js
// run by the browser each time your view template is loaded

import {
  create as createMat4,
  identity as identityMat4,
  rotate as rotateMat4,
  translate as translateMat4,
} from 'gl-mat4';

import Input from './controls';
import makeElement from '../make-element';
import {
  makeGroup,
  makeHull,
  makeLine,
  makePath,
  makePolygon,
  makeScene,
  makeTransform,
} from '../';

const makeStyled = (func, styles, ...args) => {
  const [node, ...data] = func(...args);
  for (let name in styles) {
    node.setAttribute(name, styles[name]);
  }
  return [node, ...data];
};

const makeCircle = (segments, radius, height) => {
  return [...Array(segments).keys()].map((i) => {
    const angle = (i / segments) * Math.PI * 2;
    return [Math.cos(angle) * radius, height, Math.sin(angle) * radius];
  });
};

const face = makeStyled(makeGroup, { 'stroke-width': 5 }, [0, 0, 3], [
  makeLine([-1,1,3], [-1,2,3]),
  makeLine([1,1,3], [1,2,3]),
  makePath(['M', [-2,-0.5,3], 'C', [-1,-2,3], [1,-2,3], [2,-0.5,3]]),
]);

const bottom = makeStyled(makePolygon, { fill: 'green' }, [[-3,-3,-3], [-3,-3,3], [3,-3,3], [3,-3,-3]]);
const head = makeGroup([0, 0, 0], [
  makeStyled(makePolygon, { fill: 'red' }, [[-3,3,-3], [-3,3,3], [3,3,3], [3,3,-3]]),
  makeStyled(makePolygon, { fill: 'blue' }, [[-3,-3,-3], [-3,3,-3], [3,3,-3], [3,-3,-3]]),
  makeStyled(makePolygon, { fill: 'yellow' }, [[-3,-3,3], [-3,3,3], [3,3,3], [3,-3,3]]),
  makeStyled(makePolygon, { fill: 'pink' }, [[-3,-3,-3], [-3,-3,3], [-3,3,3], [-3,3,-3]]),
  makeStyled(makePolygon, { fill: 'orange' }, [[3,-3,-3], [3,-3,3], [3,3,3], [3,3,-3]]),
  bottom, face,
]);

const hat = makeStyled(makeGroup, { fill: 'green' }, [0, 3, 0], [
  makeHull([...makeCircle(16, 3, 0), ...makeCircle(16, 2.8, 0.5), ...makeCircle(16, 2.5, 1), ...makeCircle(16, 2, 1.5), ...makeCircle(16, 1.25, 1.85), [0, 2, 0]]),
  makeHull([...makeCircle(8, 0.25, 2), ...makeCircle(8, 0.25, 2.125)]),
  makeGroup([0, -1, 0], [
    makePath(['M', [-3,0,0], 'C', [-2,0,3], [-1.5,0,4.5], [0,0,4.5], 'C', [1.5,0,4.5], [2,0,3], [3,0,0]]),
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
