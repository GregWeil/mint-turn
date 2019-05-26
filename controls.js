const OrbitControls = (dom) => {
  let x = 0;
  let y = 0;
  
  dom.addEventListener('mousemove', (event) => {
    if (event.buttons & 1) {
      
    }
  });
  
  return () => [x, y];
};

export default OrbitControls;