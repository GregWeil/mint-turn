import computeCentroid from './compute-centroid';
import makeElement from './make-element';

const makePolygon = (vertices) => {
  const polygon = makeElement('polygon');
  const updatePoints = (project) => {
    polygon.setAttribute('points', vertices.map((vertex) => {
      const [x, y] = project(vertex);
      return `${x},${y}`;
    }).join(' '));
  };
  const getCentroid = () => computeCentroid(vertices);
  return [polygon, updatePoints, getCentroid];
};

export default makePolygon;