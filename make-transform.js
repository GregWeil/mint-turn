import { transformMat4 } from 'gl-vec3';

const makeTransform = ([child, updateChild, getChildCentroid], mat4) => {
  const update = (camera) => {
    updateChild(camera);
  };
  const getCentroid = () => {
    
  };
};

export default makeTransform;