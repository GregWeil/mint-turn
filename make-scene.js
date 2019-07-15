import createCamera from 'perspective-camera';

import makeElement from './make-element';
import makeGroup from './make-group';

export const makeScene = (width, height, objects) => {
  const camera = createCamera({
    viewport: [0, 0, width, height],
  });
  const svg = makeElement('svg');
  svg.setAttribute('viewBox', camera.viewport.join(' '));
  const [rootGroup, updateRoot] = makeGroup([0, 0, 0], objects);
  svg.appendChild(rootGroup);
  const update = () => {
    camera.update();
    updateRoot((vertex) => camera.project(vertex), camera.position);
  };
  return [svg, camera, update];
};

export default makeScene;