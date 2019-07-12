Sort of 3D SVGs!
=================

Lay out an svg in 3D space, it's like a polygonal model but rounder and more wiggly

What do I have to work with?
----------------------------
**makePolygon**: Takes an array of points and generates a polygon through them all
**makePath**: Takes an array of path data commands and projects them to the screen
**makeHull**: Takes an array of points and makes a convex path that encloses them all
**makeTransform**: Takes an object and a 4x4 matrix, and applies the matrix to it
**makeGroup**: Takes an array of objects and makes a group of them ordered by depth

All of these functions return objects, which can be rendered on their own or be given to makeTransform and makeGroup to create more complex objects

**makeScene**: Takes a width/height and an array of objects, and returns a Two.js root node, a perspective camera, and a function to call to update the svg

What's the example?
-------------------
It's a happy block face, which uses a mix of paths, hulls, and svg filters

Made by [Glitch](https://glitch.com/)
-------------------

\ ゜o゜)ノ
