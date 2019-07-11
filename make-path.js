import computeCentroid from './compute-centroid';
import makeElement from './make-element';

const makePath = (commands) => {
  const path = makeElement('path');
  const updatePoints = (project) => {
    path.setAttribute('d', commands.map((item) => {
      if (typeof item === 'string') {
        return item;
      }
      const [x, y] = project(item);
      return `${x},${y}`;
    }).join(' '));
  };
  const getCentroid = () => computeCentroid(commands.filter((item) => typeof item !== 'string'));
  return [path, updatePoints, getCentroid];
};

export default makePath;