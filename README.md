Sort of 3D SVGs!
=================

Lay out an svg in 3D space, it's like a polygonal model but rounder and more wiggly

What do I have to work with?
----------------------------
- **makeLine**: Takes two points and create a line connecting them
- **makePath**: Takes path data as an array and projects the points on screen
- **makePolygon**: Renders a closed loop connecting an array of points
- **makePolyline**: Renders an open loop out of an array of points
- **makeHull**: Draws a convex shape around a set of points
- **makeTransform**: Apply a 4x4 matrix to an object, useful for animations
- **makeGroup**: Combines several objects into one and applies depth sorting
- **makeScene**: Takes a width/height and an array of objects, and returns a Two.js root node, a perspective camera, and a function to call to update the svg

What's the example?
-------------------
It's a happy block face, which uses a mix of paths, hulls, and svg filters

Made by [Glitch](https://glitch.com/)
-------------------

\ ゜o゜)ノ
