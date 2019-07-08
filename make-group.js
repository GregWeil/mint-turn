import { Group } from 'two.js';

const computeDistance = ([x1, y1, z1], [x2, y2, z2]) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
};

const makeGroup = (vertex, children) => {
  const root = new Group();
  
  const update = (project, cameraPosition) => {
    const childrenWithDepth = children.map(([child, , getCentroid]) => [child, computeDistance(cameraPosition, getCentroid())]);
    const depthSortedChildren = childrenWithDepth.sort(([, depthA], [, depthB]) => depthB - depthA);
    
    root.children.length = 0;
    depthSortedChildren.forEach(([child]) => root.children.push(child));
    children.forEach(([, update]) => update(project, cameraPosition));
  };
  
  const getCentroid = () => vertex;
  
  return [root, update, getCentroid];
};

export default makeGroup;