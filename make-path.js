import { Path, Anchor, Commands } from 'two.js';
import computeCentroid from './compute-centroid';
import makeAnchor from './make-anchor';

const linkPoint = (point, point3d) => (camera) => {
  const [x, y] = camera.project(point3d);
  point.x = x;
  point.y = y;
};

const makePath = (vertices, fill, stroke, strokeWidth, closed, curved) => {
  const anchors = vertices.map(makeAnchor);
  const path = new Path(anchors.map(([anchor]) => anchor), closed, curved, false);
  path.fill = fill;
  path.stroke = stroke;
  path.linewidth = strokeWidth;
  path.cap = 'round';
  path.join = 'round';
  const updatePoints = (camera) => anchors.forEach(([anchor, updateAnchor]) => updateAnchor(camera));
  const getDepth = (camera) => camera.project(computeCentroid(vertices))[2];
  return [path, updatePoints, getDepth];
};

export default makePath;