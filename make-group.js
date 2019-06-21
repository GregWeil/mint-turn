import { Group } from 'two.js';

const makeGroup = (vertex, children) => {
  const group = new Group();
  const groupA = new Group();
  const groupB = new Group();
  group.add(groupA, groupB);
  let flip = false;
  
  const update = (camera) => {
    flip = !flip;
    const group = flip ? groupA : groupB;
    
    const childrenWithDepth = children.map(([child, update, getDepth]) => [child, getDepth(camera)]);
    const depthSortedChildren = childrenWithDepth.sort(([childA, depthA], [childB, depthB]) => depthB - depthA);
    
    group.add(depthSortedChildren.map(([child]) => child));
    children.forEach(([, update]) => update(camera));
  };
  
  const getDepth = (camera) => camera.project(vertex)[2];
  
  return [group, update, getDepth];
};

export default makeGroup;