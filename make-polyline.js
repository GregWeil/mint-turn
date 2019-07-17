import computeCentroid from './compute-centroid';
import makeElement from './make-element';

export const makePolyline = (vertices) => {
  const polyline = makeElement('polyline');
  const updatePoints = (project) => {
    polyline.setAttribute('points', vertices.reduce((points, vertex) => {
      const [x, y, z, w] = project(vertex);
      if (w > 0) return `${points} ${x},${y}`;
      return points;
    }, ''));
  };
  const getCentroid = () => computeCentroid(vertices);
  return [polyline, updatePoints, getCentroid];
};

export default makePolyline;