import { Group } from 'two.js';
import makeElement from './make-element';

const computeDistance = ([x1, y1, z1], [x2, y2, z2]) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
};

const makeGroup = (vertex, children) => {
  const group = new Group();
  const g = makeElement('g');
  
  const update = (project, cameraPosition) => {
    const childrenWithDepth = children.map(([child, , getCentroid]) => [child, computeDistance(cameraPosition, getCentroid())]);
    const depthSortedChildren = childrenWithDepth.sort(([, depthA], [, depthB]) => depthB - depthA);
    
    group.children.splice(0, Infinity, ...depthSortedChildren.map(([[child]]) => child));
    depthSortedChildren.forEach(([[, child]]) => g.appendChild(child));
    children.forEach(([, update]) => update(project, cameraPosition));
  };
  
  const getCentroid = () => vertex;
  
  return [[group, g], update, getCentroid];
};

export default makeGroup;