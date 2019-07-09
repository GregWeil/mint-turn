import Two from 'two.js';
import createCamera from 'perspective-camera';

import makeGroup from './make-group';

const makeScene = (width, height, objects) => {
  const two = new Two({ width, height });
  const camera = createCamera({
    fov: 30,
    near: 1,
    far: 100,
    viewport: [0, 0, two.width, two.height],
  });
  const [rootGroup, updateRoot] = makeGroup([0, 0, 0], objects);
  two.add(rootGroup);
  const update = () => {
    camera.update();
    updateRoot((vertex) => camera.project(vertex), camera.position);
  };
  return [two, camera, update];
};

export default makeScene;