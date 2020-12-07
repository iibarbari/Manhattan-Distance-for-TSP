const fs = require('fs');
const path = require('path');
const { NearestNeighbour } = require('./scripts');


let rawData = fs.readFileSync(path.join(__dirname, 'matrix.json'));
let matrix = JSON.parse(rawData);

const paths = new NearestNeighbour(matrix).tour()


// const paths = new NearestNeighbour([
//   [0, 132, 217, 164, 58],
//   [132, 0, 290, 201, 79],
//   [217, 290, 0, 113, 303],
//   [164, 201, 113, 0, 196],
//   [58, 79, 303, 196, 0]
// ]).tour();

console.log(paths);
