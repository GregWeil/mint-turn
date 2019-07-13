import computeCentroid from './compute-centroid';
import makeElement from './make-element';

export const makeLine = (from, to) => {
  const line = makeElement('line');
  const updatePoints = (project) => {
    const [x1, y1] = project(from);
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    const [x2, y2] = project(to);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
  };
  const getCentroid = () => computeCentroid([from, to]);
  return [line, updatePoints, getCentroid];
};

export default makeLine;