import computeCentroid from './compute-centroid';
import makeElement from './make-element';

const makePath = (commands) => {
  const path = makeElement('path');
  const updatePoints = (project) => {
    path.setAttribute('d', commands.map(([command, ...vertices]) => {
      return `${command} ${vertices.map((vertex) => {
        const [x, y] = project(vertex);
        return `${x},${y}`;
      }).join(' ')}`;
    }).join(' '));
  };
  const getCentroid = () => computeCentroid(commands.map(vertex => vertex[0].length ? vertex[0] : vertex));
  return [path, updatePoints, getCentroid];
};

export default makePath;