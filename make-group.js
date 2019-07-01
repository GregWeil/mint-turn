import { Group } from 'two.js';

const computeDistance = ([x1, y1, z1], [x2, y2, z2]) => {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2 + (z2 - z1) ** 2);
};

const makeGroup = (vertex, children) => {
  const root = new Group();
  const groupA = new Group();
  const groupB = new Group();
  root.add(groupA, groupB);
  let flip = false;
  
  const update = (project, cameraPosition) => {
    flip = !flip;
    const group = flip ? groupA : groupB;
    
    const childrenWithDepth = children.map(([child, , getCentroid]) => [child, computeDistance(cameraPosition, getCentroid())]);
    const depthSortedChildren = childrenWithDepth.sort(([, depthA], [, depthB]) => depthB - depthA);
    
    group.add(depthSortedChildren.map(([child]) => child));
    children.forEach(([, update]) => update(project, cameraPosition));
  };
  
  const getCentroid = () => vertex;
  
  return [root, update, getCentroid];
};

export default makeGroup;