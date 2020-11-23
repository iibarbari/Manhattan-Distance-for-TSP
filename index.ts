const { Manhattan, NearestNeighbour } = require('./scripts');

const paths = new NearestNeighbour([
  [0, 132, 217, 164, 58],
  [132, 0, 290, 201, 79],
  [217, 290, 0, 113, 303],
  [164, 201, 113, 0, 196],
  [58, 79, 303, 196, 0]
]).tour();

console.log(paths);
