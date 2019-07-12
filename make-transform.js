import { create as createMat4, invert as invertMat4 } from 'gl-mat4';
import { create as createVec3, transformMat4 } from 'gl-vec3';

export const makeTransform = ([child, updateChild, getChildCentroid], transform) => {
  const transformedVec3 = createVec3();
  const invertedMat4 = createMat4();
  
  const update = (project, cameraPosition) => {
    const transformProject = (vec3) => {
      transformMat4(transformedVec3, vec3, transform);
      return project(transformedVec3);
    };
    invertMat4(invertedMat4, transform);
    transformMat4(transformedVec3, cameraPosition, invertedMat4);
    updateChild(transformProject, transformedVec3);
  };
  
  const getCentroid = () => {
    const centroid = getChildCentroid();
    transformMat4(transformedVec3, centroid, transform);
    return transformedVec3;
  };
  
  return [child, update, getCentroid];
};

export default makeTransform;