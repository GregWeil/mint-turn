import { Path, Anchor, Commands } from 'two.js';
import computeCentroid from './compute-centroid';
import makeAnchor from './make-anchor';

const makePath = (vertices, closed, curved) => {
  const anchors = vertices.map(makeAnchor);
  const path = new Path(anchors.map(([anchor]) => anchor), closed, curved, false);
  const updatePoints = (project) => anchors.forEach(([anchor, updateAnchor]) => updateAnchor(project));
  const getCentroid = () => computeCentroid(vertices);
  return [path, updatePoints, getCentroid];
};

export default makePath;