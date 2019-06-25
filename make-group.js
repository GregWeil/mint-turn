import { Group } from 'two.js';

const makeGroup = (vertex, children) => {
  const root = new Group();
  const groupA = new Group();
  const groupB = new Group();
  root.add(groupA, groupB);
  let flip = false;
  
  const update = (camera) => {
    flip = !flip;
    const group = flip ? groupA : groupB;
    
    const childrenWithDepth = children.map(([child, update, getCentroid]) => [child, camera.project(getCentroid())[2]]);
    const depthSortedChildren = childrenWithDepth.sort(([childA, depthA], [childB, depthB]) => depthB - depthA);
    
    group.add(depthSortedChildren.map(([child]) => child));
    children.forEach(([, update]) => update(camera));
  };
  
  const getCentroid = () => vertex;
  
  return [root, update, getCentroid];
};

export default makeGroup;