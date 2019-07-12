import computeCentroid from './compute-centroid';
import makeElement from './make-element';

export const makePolyline = (vertices) => {
  const polyline = makeElement('polyline');
  const updatePoints = (project) => {
    polyline.setAttribute('points', vertices.map((vertex) => {
      const [x, y] = project(vertex);
      return `${x},${y}`;
    }).join(' '));
  };
  const getCentroid = () => computeCentroid(vertices);
  return [polyline, updatePoints, getCentroid];
};

export default makePolyline;