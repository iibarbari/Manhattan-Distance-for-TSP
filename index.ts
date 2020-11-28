const _ = require('lodash');
const { Matrix, NearestNeighbour } = require('./scripts');

//
// const matrix = new Matrix([{
//   unit: 1,
//   corr: 1
// }, {
//   unit: 1,
//   corr: 2
// }, {
//   unit: 1,
//   corr: 3
// }, {
//   unit: 1,
//   corr: 4
// }, {
//   unit: 1,
//   corr: 5
// }, {
//   unit: 1,
//   corr: 6
// }]).calculateMatrix;

// Nearest Neighbour Test
const paths = new NearestNeighbour([
  [0, 132, 217, 164, 58],
  [132, 0, 290, 201, 79],
  [217, 290, 0, 113, 303],
  [164, 201, 113, 0, 196],
  [58, 79, 303, 196, 0]
]).tour();

// const paths = new NearestNeighbour(matrix);

console.log(paths);
