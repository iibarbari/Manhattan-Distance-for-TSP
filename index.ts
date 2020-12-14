const fs = require('fs');
const path = require('path');
const range = require('lodash/range');
const { NearestNeighbour, Matrix } = require('./scripts');

const corridorCount = 6;
const unitCount = 28;
const unitArr: [number, number][] = [[0, 0]];

range(1, corridorCount + 1).forEach((corr: number) => {
  range(1, unitCount + 1).forEach((unit: number) => {
    unitArr.push([corr, unit]);
  });
});


const matrix = new Matrix(unitArr).calculateMatrix;


fs.writeFile(path.join(__dirname, 'matrix.json'), JSON.stringify(matrix), () => {});


// let rawData = fs.readFileSync(path.join(__dirname, 'matrix.json'));
// let matrix = JSON.parse(rawData);

// const paths = new NearestNeighbour(matrix).tour()


// const paths = new NearestNeighbour([
//   [0, 132, 217, 164, 58],
//   [132, 0, 290, 201, 79],
//   [217, 290, 0, 113, 303],
//   [164, 201, 113, 0, 196],
//   [58, 79, 303, 196, 0]
// ]).tour();

// console.log(paths);


