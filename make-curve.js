import computeCentroid from './compute-centroid';
import computeCurvedPath from './compute-curved-path';
import makeElement from './make-element';

export const makeCurve = (vertices, closed = false, smoothing = 1/3) => {
  const path = makeElement('path');
  const update = (project) => {
    const projectedVertices = vertices.map((vertex) => project(vertex)).filter(([,,, w]) => w > 0);
    path.setAttribute('d', computeCurvedPath(projectedVertices, smoothing, closed));
  };
  const getCentroid = () => computeCentroid(vertices);
  return [path, update, getCentroid];
};

export default makeCurve;