import { distance } from 'gl-vec3';
import makeElement from './make-element';

export const makeGroup = (vertex, children) => {
  const group = makeElement('g');
  
  const update = (project, cameraPosition) => {
    const childrenWithDepth = children.map(([child, , getCentroid]) => [child, distance(cameraPosition, getCentroid())]);
    const depthSortedChildren = childrenWithDepth.sort(([, depthA], [, depthB]) => depthB - depthA);
    
    depthSortedChildren.forEach(([child], i) => {
      if (group.children[i] !== child) {
        group.insertBefore(child, group.children[i]);
      }
    });
    children.forEach(([, update]) => update(project, cameraPosition));
  };
  
  const getCentroid = () => vertex;
  
  return [group, update, getCentroid];
};

export default makeGroup;