const _ = require('lodash');
const { Manhattan, NearestNeighbour } = require('./scripts');

const manhattanMatrix = Array(6).fill([...Array(14)])

_.range(1, 6).forEach((corr: number) => {
  _.range(1, 29).forEach((unit: number) => {
    new Manhattan({ unit: 1, corr: 3 }, { unit, corr }).distance;
  });
});


// Nearest Neighbour Test
const paths = new NearestNeighbour([
  [0, 132, 217, 164, 58],
  [132, 0, 290, 201, 79],
  [217, 290, 0, 113, 303],
  [164, 201, 113, 0, 196],
  [58, 79, 303, 196, 0]
]).tour();

console.log(paths);
