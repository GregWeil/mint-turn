import { Ellipse, Group, Path } from 'two.js';
import computeCentroid from './compute-centroid';
//todo: graham scan this into a path
const makeHull = (vertices) => {
  const root = new Group();
  const points = vertices.map((vertex) => {
    const ellipse = new Ellipse(0, 0, 5, 5);
    const update = (camera) => {
      const [x, y] = camera.project(vertex);
      ellipse.translation.x = x;
      ellipse.translation.y = y;
    };
    return [ellipse, update];
  });
  points.forEach(([ellipse]) => root.add(ellipse));
  const update = (camera) => points.forEach(([, updateEllipse]) => updateEllipse(camera));
  const getDepth = (camera) => camera.project(computeCentroid(vertices))[2];
  return [root, update, getDepth];
};

export default makeHull;