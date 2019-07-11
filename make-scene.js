import Two from 'two.js';
import createCamera from 'perspective-camera';

import makeElement from './make-element';
import makeGroup from './make-group';

const makeScene = (width, height, objects) => {
  const two = new Two({ width, height });
  const camera = createCamera({
    fov: 30,
    near: 1,
    far: 100,
    viewport: [0, 0, two.width, two.height],
  });
  const svg = makeElement('svg');
  svg.setAttribute('viewBox', camera.viewport.join(' '));
  const [[rootGroup, g], updateRoot] = makeGroup([0, 0, 0], objects);
  two.add(rootGroup);
  svg.appendChild(g);
  const update = () => {
    camera.update();
    updateRoot((vertex) => camera.project(vertex), camera.position);
  };
  return [[two, svg], camera, update];
};

export default makeScene;